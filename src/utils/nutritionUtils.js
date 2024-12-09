/**
 * Calculates BMI based on weight and height.
 * @param {number} weight - Weight in kilograms.
 * @param {number} height - Height in centimeters.
 * @returns {number} Calculated BMI.
 * @throws {Error} If weight or height is missing.
 */
function calculateBMI(weight, height) {
  if (!weight || !height) {
    throw new Error('Weight and height are required to calculate BMI');
  }
  const heightInMeters = height / 100; // Convert cm to meters
  return parseFloat((weight / (heightInMeters ** 2)).toFixed(2)); // BMI rounded to 2 decimal places
}

/**
 * Calculates daily calorie, carbohydrate, fat, and protein requirements.
 * @param {number} weight - Weight in kilograms.
 * @param {number} height - Height in centimeters.
 * @param {number} age - Age in years.
 * @param {number} gender - Gender (0 for male, 1 for female).
 * @returns {object} Daily nutritional needs { calories, carbs, fat, protein }.
 * @throws {Error} If any required parameter is missing or if gender is invalid.
 */
function calculateDailyNeeds(weight, height, age, gender) {
  if (!weight || !height || age === undefined || gender === undefined) {
    throw new Error('Weight, height, age, and gender are required to calculate daily needs');
  }

  // Calculate Basal Metabolic Rate (BMR)
  // Calculate Basal Metabolic Rate (BMR)
  let bmr;
  if (gender === 0) {
    // Male
    bmr = 66.5 + (13.75 * weight) + (5 * height) - (6.75 * age);
  } else if (gender === 1) {
    // Female
    bmr = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
  } else {
    throw new Error('Invalid gender value. Use 0 for male and 1 for female');
  }

  // Calculate daily nutritional needs based on BMR
  const calories = Math.round(bmr); // Calories
  const protein = Math.round(weight * 1.5); // Protein in grams (1.5 g per kg of body weight)
  const fat = Math.round(calories * 0.25 / 9); // Fat in grams (25% of calories, 9 calories per gram of fat)
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4); // Carbs in grams (remaining calories)

  return {
    calories,
    carbs,
    fat,
    protein,
  };
}

module.exports = {
  calculateBMI,
  calculateDailyNeeds,
};
