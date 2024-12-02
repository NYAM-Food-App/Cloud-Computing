// utils/nutritionUtils.js

/**
 * Menghitung BMI berdasarkan berat dan tinggi badan
 * @param {number} weight - Berat badan dalam kg
 * @param {number} height - Tinggi badan dalam cm
 * @returns {number} BMI yang telah dihitung
 */
function calculateBMI(weight, height) {
  if (!weight || !height) {
    throw new Error('Weight and height are required to calculate BMI');
  }
  const heightInMeters = height / 100; // Konversi cm ke meter
  return parseFloat((weight / (heightInMeters ** 2)).toFixed(2)); // BMI dengan 2 angka desimal
}

/**
 * Menghitung kebutuhan kalori, karbohidrat, lemak, dan protein harian
 * @param {number} weight - Berat badan dalam kg
 * @param {number} height - Tinggi badan dalam cm
 * @param {number} age - Usia dalam tahun
 * @param {number} gender - Jenis kelamin (0 untuk pria, 1 untuk wanita)
 * @returns {object} Kebutuhan nutrisi harian { calories, carbs, fat, protein }
 */
function calculateDailyNeeds(weight, height, age, gender) {
  if (!weight || !height || age === undefined || gender === undefined) {
    throw new Error('Weight, height, age, and gender are required to calculate daily needs');
  }

  // Menghitung Basal Metabolic Rate (BMR)
  let bmr;
  if (gender === 0) {
    // Pria
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 1) {
    // Wanita
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    throw new Error('Invalid gender value. Use 0 for male and 1 for female');
  }

  // Nutrisi harian berdasarkan BMR
  const calories = Math.round(bmr); // Kalori
  const protein = Math.round(weight * 1.2); // Protein dalam gram (1.2 gram per kg berat badan)
  const fat = Math.round(calories * 0.25 / 9); // Lemak dalam gram (25% dari kalori, 9 kalori per gram lemak)
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4); // Karbohidrat dalam gram (sisanya setelah protein dan lemak)

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
