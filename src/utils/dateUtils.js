// src/utils/dateUtils.js

/**
 * Menghitung usia berdasarkan tanggal lahir
 * @param {string} birthdate - Tanggal lahir dalam format ISO (yyyy-mm-dd)
 * @returns {number} Usia dalam tahun
 */
function calculateAge(birthdate) {
  if (!birthdate) {
    throw new Error('Birthdate is required');
  }

  const birthDateObj = new Date(birthdate);
  if (isNaN(birthDateObj)) {
    throw new Error('Invalid birthdate format. Use ISO format (yyyy-mm-dd)');
  }

  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const isBeforeBirthdayThisYear =
    today.getMonth() < birthDateObj.getMonth() ||
    (today.getMonth() === birthDateObj.getMonth() && today.getDate() < birthDateObj.getDate());

  if (isBeforeBirthdayThisYear) {
    age -= 1;
  }

  return age;
}

module.exports = { calculateAge };
