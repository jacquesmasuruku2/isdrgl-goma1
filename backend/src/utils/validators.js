const validator = require('validator');

// Email validation
const isValidEmail = (email) => {
  return validator.isEmail(email);
};

// Phone validation
const isValidPhone = (phone) => {
  return /^[0-9+\-\s()./]{7,}$/.test(phone);
};

// Date of birth validation
const isValidDateOfBirth = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;

  const age = new Date().getFullYear() - date.getFullYear();
  return age >= 16 && age <= 100;
};

// Name validation
const isValidName = (name) => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

// Message validation
const isValidMessage = (message) => {
  const trimmed = message.trim();
  return trimmed.length >= 10 && trimmed.length <= 2000;
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidDateOfBirth,
  isValidName,
  isValidMessage
};
