// Calculate BMI
function calculateBMI(weight, height) {
  return (weight / ((height / 100) ** 2)).toFixed(2);
}

// Calculate Lean Body Mass (LBM)
function calculateLeanBodyMass(weight, bodyFatPercentage) {
  return (weight * (1 - (bodyFatPercentage / 100))).toFixed(2);
}

// Calculate BMR using Katch-McArdle Formula
function calculateBMRKatch(leanBodyMass) {
  return (370 + (21.6 * leanBodyMass)).toFixed(2);
}

// Calculate BMR using Mifflin-St Jeor Formula
function calculateBMRMifflin(weight, height, age, gender) {
  if (gender === 'male') {
      return (10 * weight + 6.25 * height - 5 * age + 5).toFixed(2);
  } else {
      return (10 * weight + 6.25 * height - 5 * age - 161).toFixed(2);
  }
}

// Calculate calorie needs based on activity level
function calculateCalorieNeeds(bmr, activityLevel) {
  const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9
  };
  return (bmr * activityMultipliers[activityLevel]).toFixed(2);
}

// Update results on the page
function displayResults(bmi, leanBmi, bmrKatch, maintKatch, cutKatch, bulkKatch, bmrMifflin, maintMifflin, cutMifflin, bulkMifflin) {
  document.getElementById('bmiResult').innerText = `BMI: ${bmi}`;
  document.getElementById('leanBmiResult').innerText = `Lean Body Mass: ${leanBmi} kg`;
  document.getElementById('bmrKatch').innerText = `BMR (Katch-McArdle): ${bmrKatch} kcal/day`;
  document.getElementById('maintKatch').innerText = `Maintenance Calories (Katch-McArdle): ${maintKatch} kcal/day`;
  document.getElementById('cutKatch').innerText = `Cutting Calories (Katch-McArdle): ${cutKatch} kcal/day`;
  document.getElementById('bulkKatch').innerText = `Bulking Calories (Katch-McArdle): ${bulkKatch} kcal/day`;
  document.getElementById('bmrMifflin').innerText = `BMR (Mifflin-St Jeor): ${bmrMifflin} kcal/day`;
  document.getElementById('maintMifflin').innerText = `Maintenance Calories (Mifflin-St Jeor): ${maintMifflin} kcal/day`;
  document.getElementById('cutMifflin').innerText = `Cutting Calories (Mifflin-St Jeor): ${cutMifflin} kcal/day`;
  document.getElementById('bulkMifflin').innerText = `Bulking Calories (Mifflin-St Jeor): ${bulkMifflin} kcal/day`;
}

// Handle form submission
document.getElementById('healthForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value, 10);
  const bodyFatPercentage = parseFloat(document.getElementById('bodyFatPercentage').value);
  const gender = document.getElementById('gender').value;
  const activityLevel = document.getElementById('activityLevel').value;

  // Calculations
  const bmi = calculateBMI(weight, height);
  const leanBmi = calculateLeanBodyMass(weight, bodyFatPercentage);
  const bmrKatch = calculateBMRKatch(leanBmi);
  const maintKatch = calculateCalorieNeeds(bmrKatch, activityLevel);
  const cutKatch = (maintKatch - 500).toFixed(2); // Subtract 500 kcal for cutting
  const bulkKatch = (parseFloat(maintKatch) + 500).toFixed(2); // Add 500 kcal for bulking
  const bmrMifflin = calculateBMRMifflin(weight, height, age, gender);
  const maintMifflin = calculateCalorieNeeds(bmrMifflin, activityLevel);
  const cutMifflin = (maintMifflin - 500).toFixed(2);
  const bulkMifflin = (parseFloat(maintMifflin) + 500).toFixed(2);

  // Display results
  displayResults(bmi, leanBmi, bmrKatch, maintKatch, cutKatch, bulkKatch, bmrMifflin, maintMifflin, cutMifflin, bulkMifflin);
});

// Clear form and results
document.getElementById('clearButton').addEventListener('click', function () {
  // Reset the form fields
  document.getElementById('healthForm').reset();

  // Clear the results display
  document.getElementById('bmiResult').innerText = '';
  document.getElementById('leanBmiResult').innerText = '';
  document.getElementById('bmrKatch').innerText = '';
  document.getElementById('maintKatch').innerText = '';
  document.getElementById('cutKatch').innerText = '';
  document.getElementById('bulkKatch').innerText = '';
  document.getElementById('bmrMifflin').innerText = '';
  document.getElementById('maintMifflin').innerText = '';
  document.getElementById('cutMifflin').innerText = '';
  document.getElementById('bulkMifflin').innerText = '';
});
