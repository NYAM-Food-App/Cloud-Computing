const { db } = require('../services/firebaseService');

// Function to retrieve a user's food history
const getFoodHistory = async (req, res) => {
    const { uid } = req.params;

    try {
    // Get the user document from Firestore
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    // If user is not found, return an error
    if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Get the food history from the user's document
    const userData = userDoc.data();
    const foodHistory = userData.foodHistory || [];

    // Send the food history data back to the user
    return res.status(200).json({
        message: 'Food history retrieved successfully',
        foodHistory,
    });
    } catch (error) {
    // Handle errors and log them
    console.error('Error fetching food history:', error.message || error);
    return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to retrieve detailed information of a specific food history item by index
const getFoodHistoryDetail = async (req, res) => {
    const { uid, historyIndex } = req.params;

    try {
    // Get the user document from Firestore
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    // If user is not found, return an error
    if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Get the food history from the user's document
    const userData = userDoc.data();
    const foodHistory = userData.foodHistory || [];

    // Validate the selected history index
    if (historyIndex < 0 || historyIndex >= foodHistory.length) {
        return res.status(400).json({ error: 'Invalid history index' });
    }

    // Retrieve the specific food item detail based on the index
    const selectedHistory = foodHistory[historyIndex];

    // Send the selected food history detail back to the user
    return res.status(200).json({
        message: 'Food history detail retrieved successfully',
        selectedHistory,
    });
    } catch (error) {
    // Handle errors and log them
    console.error('Error fetching food history detail:', error.message || error);
    return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getFoodHistory, getFoodHistoryDetail };
