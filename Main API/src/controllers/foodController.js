const { getUserRecommendations, saveSelectedFood } = require('../models/foodModel');
const { downloadImageAndUpload } = require('../utils/imageUtils');
const { db, admin } = require('../services/firebaseService');

const chooseFood = async (req, res) => {
    const { uid } = req.params;
    const { selectedIndex } = req.body;

    try {
    // Retrieve the user's food recommendations
    const foodRecommendations = await getUserRecommendations(uid);

    // Validate the selected index
    if (!Array.isArray(foodRecommendations) || selectedIndex < 0 || selectedIndex >= foodRecommendations.length) {
        return res.status(400).json({ error: 'Invalid selection index' });
    }

    // Get the selected food item
    const selectedFood = foodRecommendations[selectedIndex];

    // Check if the selected food has an image URL
    if (!selectedFood.image) {
        return res.status(400).json({ error: 'Selected food does not have an image' });
    }

    // Download the image and upload it to Google Cloud Storage
    const imageFileName = `${uid}-${selectedFood.foodname}.jpg`;  // Unique image file name
    const publicImageUrl = await downloadImageAndUpload(selectedFood.image, imageFileName);  // Get the public image URL

    // Save the selected food to Firestore along with the uploaded image URL
    await saveSelectedFood(uid, selectedFood, publicImageUrl);

    // Add nutritional values to fulfilledNeeds
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    const currentFulfilledNeeds = userData.fulfilledNeeds || { calories: 0, fat: 0, carbs: 0, protein: 0 };

    // Update fulfilledNeeds with the selected food's nutritional values
    const updatedFulfilledNeeds = {
        calories: parseFloat((currentFulfilledNeeds.calories + (selectedFood.fulfilledNeeds.calories || 0)).toFixed(2)),
        fat: parseFloat((currentFulfilledNeeds.fat + (selectedFood.fulfilledNeeds.fat || 0)).toFixed(2)),
        carbs: parseFloat((currentFulfilledNeeds.carbs + (selectedFood.fulfilledNeeds.carbs || 0)).toFixed(2)),
        protein: parseFloat((currentFulfilledNeeds.protein + (selectedFood.fulfilledNeeds.protein || 0)).toFixed(2)),
    };

    // Update fulfilledNeeds in Firestore
    await userDocRef.update({
        fulfilledNeeds: updatedFulfilledNeeds,
    });

    // Remove the 'image' property from selectedFood
    delete selectedFood.image;

    // Save the selected food to food history with a timestamp
    const timestamp = admin.firestore.Timestamp.now();

    // Get the current food history
    const currentFoodHistory = userData.foodHistory || [];

    // Create a new food history entry with the latest selected food at the top
    const newFoodHistory = [
        {
        selectedFood,
        imageUrl: publicImageUrl,  // Image URL from Cloud Storage
        timestamp,
        },
        ...currentFoodHistory,
    ];

    // Update foodHistory in Firestore
    await userDocRef.update({
        foodHistory: newFoodHistory,
    });

    // Respond to the user with the updated data
    return res.status(200).json({
        message: 'Food selection successful and fulfilled needs updated',
        selectedFood,
        updatedFulfilledNeeds,
        imageUrl: publicImageUrl,
    });
    } catch (error) {
    // Handle errors when the user is not found in Firestore
    if (error.message === 'User not found') {
        return res.status(404).json({ error: 'User not found' });
    }

    // Handle other errors as internal server error
    console.error('Error choosing food:', error.message || error);
    return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { chooseFood };
