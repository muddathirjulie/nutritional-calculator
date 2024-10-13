document.getElementById('healthForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get form data
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to meters
    const bodyFat = parseFloat(document.getElementById('bodyFat').value);
    const activityMultiplier = parseFloat(document.getElementById('activityLevel').value);
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
  
    // BMI Calculation
    const bmi = weight / (height * height);
    document.getElementById('bmiResult').innerText = bmi.toFixed(1);
  
    // Lean BMI
    const leanBodyMass = weight * (1 - bodyFat / 100);
    const leanBmi = leanBodyMass / (height * height);
    document.getElementById('leanBmiResult').innerText = leanBmi.toFixed(1);
  
    // Katch-McArdle BMR Calculation (uses lean body mass)
    const bmrKatch = 370 + (21.6 * leanBodyMass);
    const maintKatch = bmrKatch * activityMultiplier;
    const cutKatch = maintKatch * 0.63;
    const bulkKatch = maintKatch * 1.2;
  
    document.getElementById('bmrKatch').innerText = bmrKatch.toFixed(0);
    document.getElementById('maintKatch').innerText = maintKatch.toFixed(0);
    document.getElementById('cutKatch').innerText = cutKatch.toFixed(0);
    document.getElementById('bulkKatch').innerText = bulkKatch.toFixed(0);
  
    // Mifflin-St. Jeor BMR Calculation (uses age and gender)
    let bmrMifflin;
    if (gender === 'male') {
      bmrMifflin = 10 * weight + 6.25 * (height * 100) - 5 * age + 5;
    } else {
      bmrMifflin = 10 * weight + 6.25 * (height * 100) - 5 * age - 161;
    }
  
    const maintMifflin = bmrMifflin * activityMultiplier;
    const cutMifflin = maintMifflin * 0.63;
    const bulkMifflin = maintMifflin * 1.2;
  
    document.getElementById('bmrMifflin').innerText = bmrMifflin.toFixed(0);
    document.getElementById('maintMifflin').innerText = maintMifflin.toFixed(0);
    document.getElementById('cutMifflin').innerText = cutMifflin.toFixed(0);
    document.getElementById('bulkMifflin').innerText = bulkMifflin.toFixed(0);
  });
  