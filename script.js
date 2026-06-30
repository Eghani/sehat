const appState = {
  currentModal: null,
};

const elements = {
  bmiModal: document.getElementById("bmiModal"),
  bodyFatModal: document.getElementById("bodyFatModal"),
  idealWeightModal: document.getElementById("idealWeightModal"),
  nutritionModal: document.getElementById("nutritionModal"),
  aboutModal: document.getElementById("aboutModal"),
  bmiValue: document.getElementById("bmiValue"),
  bmiCategory: document.getElementById("bmiCategory"),
  bmiHealthyRange: document.getElementById("bmiHealthyRange"),
  bmiUnderstanding: document.getElementById("bmiUnderstanding"),
  bmiGuidanceTitle: document.getElementById("bmiGuidanceTitle"),
  bmiGuidanceList: document.getElementById("bmiGuidanceList"),
  bodyFatValue: document.getElementById("bodyFatValue"),
  bodyFatCategory: document.getElementById("bodyFatCategory"),
  bodyFatRange: document.getElementById("bodyFatRange"),
  bodyFatUnderstanding: document.getElementById("bodyFatUnderstanding"),
  bodyFatGuidanceTitle: document.getElementById("bodyFatGuidanceTitle"),
  bodyFatGuidanceList: document.getElementById("bodyFatGuidanceList"),
  idealWeightValue: document.getElementById("idealWeightValue"),
  idealWeightRange: document.getElementById("idealWeightRange"),
  idealWeightDifference: document.getElementById("idealWeightDifference"),
  nutritionMaintenance: document.getElementById("nutritionMaintenance"),
  nutritionSummary: document.getElementById("nutritionSummary"),
  nutritionLoss: document.getElementById("nutritionLoss"),
  nutritionMaintain: document.getElementById("nutritionMaintain"),
  nutritionGain: document.getElementById("nutritionGain"),
  nutritionProtein: document.getElementById("nutritionProtein"),
  nutritionWater: document.getElementById("nutritionWater"),
  nutritionFiber: document.getElementById("nutritionFiber"),
  weightInput: document.getElementById("weightInput"),
  heightInput: document.getElementById("heightInput"),
  ageInputBodyFat: document.getElementById("ageInputBodyFat"),
  weightInputBodyFat: document.getElementById("weightInputBodyFat"),
  heightInputBodyFat: document.getElementById("heightInputBodyFat"),
  heightInputIdealWeight: document.getElementById("heightInputIdealWeight"),
  currentWeightInput: document.getElementById("currentWeightInput"),
  ageInputNutrition: document.getElementById("ageInputNutrition"),
  weightInputNutrition: document.getElementById("weightInputNutrition"),
  heightInputNutrition: document.getElementById("heightInputNutrition"),
  activityInputNutrition: document.getElementById("activityInputNutrition"),
  bodyFatGenderInputs: document.querySelectorAll('input[name="bodyFatGender"]'),
  idealWeightGenderInputs: document.querySelectorAll(
    'input[name="idealWeightGender"]',
  ),
  nutritionGenderInputs: document.querySelectorAll(
    'input[name="nutritionGender"]',
  ),
  bmiCard: document.querySelector('[data-calculator="bmi"]'),
  bodyFatCard: document.querySelector('[data-calculator="body-fat"]'),
  idealWeightCard: document.querySelector('[data-calculator="ideal-weight"]'),
  nutritionCard: document.querySelector('[data-calculator="nutrition"]'),
  aboutTrigger: document.querySelector("[data-open-about]"),
  closeButtons: document.querySelectorAll("[data-close-modal]"),
};

function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return "Underweight";
  }

  if (bmi < 25) {
    return "Normal Weight";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  return "Obese";
}

function getBmiUnderstanding(bmi) {
  if (bmi < 18.5) {
    return "Your BMI falls below the healthy range. This may suggest that your weight is lower than expected for your height.";
  }

  if (bmi < 25) {
    return "Your BMI falls within the healthy weight range. BMI is a screening tool that estimates body size. It does not directly measure body fat or overall health.";
  }

  if (bmi < 30) {
    return "Your BMI is above the healthy range. This may indicate that your weight is higher than expected for your height.";
  }

  return "Your BMI is well above the healthy range. This may indicate excess body weight relative to height and may warrant further attention.";
}

function getBmiGuidance(bmi) {
  if (bmi < 18.5) {
    return {
      title: "Recommended Focus",
      items: [
        "Increase calorie intake gradually",
        "Prioritize protein",
        "Strength training",
        "Consult a healthcare professional if needed",
      ],
    };
  }

  if (bmi < 25) {
    return {
      title: "Recommended Focus",
      items: [
        "Maintain healthy habits",
        "Exercise regularly",
        "Eat a balanced diet",
        "Sleep 7–9 hours",
      ],
    };
  }

  if (bmi < 30) {
    return {
      title: "Recommended Focus",
      items: [
        "Increase daily movement",
        "Reduce sugary beverages",
        "Maintain a calorie deficit",
        "Prioritize protein intake",
      ],
    };
  }

  return {
    title: "Recommended Focus",
    items: [
      "Seek professional guidance if possible",
      "Focus on sustainable lifestyle changes",
      "Increase physical activity gradually",
      "Improve overall nutrition",
    ],
  };
}

function updateBmiResult() {
  const weight = Number.parseFloat(elements.weightInput.value);
  const heightCm = Number.parseFloat(elements.heightInput.value);

  if (
    !Number.isFinite(weight) ||
    !Number.isFinite(heightCm) ||
    weight <= 0 ||
    heightCm <= 0
  ) {
    elements.bmiValue.textContent = "—";
    elements.bmiCategory.textContent =
      "Enter your height and weight to calculate your Body Mass Index.";
    elements.bmiHealthyRange.textContent = "—";
    elements.bmiUnderstanding.textContent =
      "BMI is a screening tool that estimates body size.";
    elements.bmiGuidanceTitle.textContent = "Recommended Focus";
    elements.bmiGuidanceList.innerHTML = "";
    return;
  }

  const heightMeters = heightCm / 100;
  const bmi = weight / (heightMeters * heightMeters);

  if (!Number.isFinite(bmi)) {
    elements.bmiValue.textContent = "—";
    elements.bmiCategory.textContent =
      "Enter your height and weight to calculate your Body Mass Index.";
    elements.bmiHealthyRange.textContent = "—";
    elements.bmiUnderstanding.textContent =
      "BMI is a screening tool that estimates body size.";
    elements.bmiGuidanceTitle.textContent = "Recommended Focus";
    elements.bmiGuidanceList.innerHTML = "";
    return;
  }

  const guidance = getBmiGuidance(bmi);
  const bmiCategoryText = getBmiCategory(bmi);

  elements.bmiValue.textContent = bmi.toFixed(1);
  elements.bmiCategory.textContent = bmiCategoryText;
  elements.bmiHealthyRange.textContent = "18.5 – 24.9";
  elements.bmiUnderstanding.textContent = getBmiUnderstanding(bmi);
  elements.bmiGuidanceTitle.textContent = guidance.title;
  elements.bmiGuidanceList.innerHTML = guidance.items
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function getBodyFatCategory(gender, bodyFat) {
  if (gender === "female") {
    if (bodyFat < 10) {
      return "Essential Fat";
    }

    if (bodyFat < 14) {
      return "Essential Fat";
    }

    if (bodyFat < 21) {
      return "Athletes";
    }

    if (bodyFat < 25) {
      return "Fitness";
    }

    if (bodyFat < 32) {
      return "Average";
    }

    return "Obese";
  }

  if (bodyFat < 6) {
    return "Essential Fat";
  }

  if (bodyFat < 14) {
    return "Athletes";
  }

  if (bodyFat < 18) {
    return "Fitness";
  }

  if (bodyFat < 25) {
    return "Average";
  }

  return "Obese";
}

function getBodyFatRanges(gender) {
  if (gender === "female") {
    return [
      { label: "Essential Fat", range: "10–13%" },
      { label: "Athletes", range: "14–20%" },
      { label: "Fitness", range: "21–24%" },
      { label: "Average", range: "25–31%" },
      { label: "Obese", range: "32%+" },
    ];
  }

  return [
    { label: "Essential Fat", range: "2–5%" },
    { label: "Athletes", range: "6–13%" },
    { label: "Fitness", range: "14–17%" },
    { label: "Average", range: "18–24%" },
    { label: "Obese", range: "25%+" },
  ];
}

function getBodyFatUnderstanding(category) {
  switch (category) {
    case "Essential Fat":
      return "Your estimated body fat is very low. This range is typically associated with essential fat needed for basic physiological function.";
    case "Athletes":
      return "Your estimated body fat falls within a lean and athletic range for your gender.";
    case "Fitness":
      return "Your estimated body fat percentage falls within a healthy and lean range for your gender.";
    case "Average":
      return "Your estimated body fat is within the average range. This can be a useful reference point, though it varies by activity level and body composition.";
    case "Obese":
      return "Your estimated body fat is above the typical healthy range. This may reflect excess body fat relative to your height and gender.";
    default:
      return "Body fat is an estimate and may differ from direct measurement methods.";
  }
}

function getBodyFatGuidance(category) {
  switch (category) {
    case "Essential Fat":
      return {
        title: "Recommended Focus",
        items: ["Balanced nutrition", "Adequate calorie intake", "Recovery"],
      };
    case "Athletes":
      return {
        title: "Recommended Focus",
        items: [
          "Maintain healthy habits",
          "Continue regular exercise",
          "Balanced nutrition",
        ],
      };
    case "Fitness":
      return {
        title: "Recommended Focus",
        items: [
          "Maintain healthy habits",
          "Continue regular exercise",
          "Balanced nutrition",
        ],
      };
    case "Average":
      return {
        title: "Recommended Focus",
        items: [
          "Increase daily activity",
          "Prioritize protein",
          "Monitor calorie intake",
        ],
      };
    case "Obese":
      return {
        title: "Recommended Focus",
        items: [
          "Sustainable fat loss",
          "Increase physical activity gradually",
          "Consult healthcare professionals if needed",
        ],
      };
    default:
      return {
        title: "Recommended Focus",
        items: [
          "Maintain healthy habits",
          "Regular exercise",
          "Balanced nutrition",
        ],
      };
  }
}

function updateBodyFatResult() {
  const selectedGender = Array.from(elements.bodyFatGenderInputs || []).find(
    (input) => input.checked,
  );
  const gender = selectedGender?.value || "male";
  const age = Number.parseFloat(elements.ageInputBodyFat.value);
  const weight = Number.parseFloat(elements.weightInputBodyFat.value);
  const heightCm = Number.parseFloat(elements.heightInputBodyFat.value);

  if (
    !Number.isFinite(age) ||
    !Number.isFinite(weight) ||
    !Number.isFinite(heightCm) ||
    age <= 0 ||
    age >= 120 ||
    weight <= 0 ||
    heightCm <= 0
  ) {
    elements.bodyFatValue.textContent = "—";
    elements.bodyFatCategory.textContent =
      "Enter your details to estimate your body fat percentage.";
    elements.bodyFatRange.textContent = "—";
    elements.bodyFatUnderstanding.textContent =
      "Body fat is an estimate and may differ from direct measurement methods.";
    elements.bodyFatGuidanceTitle.textContent = "Recommended Focus";
    elements.bodyFatGuidanceList.innerHTML = "";
    return;
  }

  const heightMeters = heightCm / 100;
  const bmi = weight / (heightMeters * heightMeters);

  if (!Number.isFinite(bmi) || bmi <= 0) {
    elements.bodyFatValue.textContent = "—";
    elements.bodyFatCategory.textContent =
      "Enter your details to estimate your body fat percentage.";
    elements.bodyFatRange.textContent = "—";
    elements.bodyFatUnderstanding.textContent =
      "Body fat is an estimate and may differ from direct measurement methods.";
    elements.bodyFatGuidanceTitle.textContent = "Recommended Focus";
    elements.bodyFatGuidanceList.innerHTML = "";
    return;
  }

  const bodyFat =
    gender === "female"
      ? 1.2 * bmi + 0.23 * age - 5.4
      : 1.2 * bmi + 0.23 * age - 16.2;

  const roundedBodyFat = Number(bodyFat.toFixed(1));
  const category = getBodyFatCategory(gender, roundedBodyFat);
  const ranges = getBodyFatRanges(gender);
  const rangeText = ranges
    .map((item) => `${item.label}: ${item.range}`)
    .join(" • ");

  elements.bodyFatValue.textContent = `${roundedBodyFat.toFixed(1)}%`;
  elements.bodyFatCategory.textContent = category;
  elements.bodyFatRange.textContent = rangeText;
  elements.bodyFatUnderstanding.textContent = getBodyFatUnderstanding(category);

  const guidance = getBodyFatGuidance(category);
  elements.bodyFatGuidanceTitle.textContent = guidance.title;
  elements.bodyFatGuidanceList.innerHTML = guidance.items
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function getIdealWeightFormula(gender) {
  return gender === "female"
    ? { base: 49, multiplier: 1.7 }
    : { base: 52, multiplier: 1.9 };
}

function calculateIdealWeight(gender, heightCm) {
  const heightInches = heightCm / 2.54;
  const formula = getIdealWeightFormula(gender);
  return Number(
    (formula.base + formula.multiplier * (heightInches - 60)).toFixed(1),
  );
}

function updateIdealWeightResult() {
  const selectedGender = Array.from(
    elements.idealWeightGenderInputs || [],
  ).find((input) => input.checked);
  const gender = selectedGender?.value || "male";
  const heightCm = Number.parseFloat(elements.heightInputIdealWeight.value);
  const currentWeight = Number.parseFloat(elements.currentWeightInput.value);

  if (!Number.isFinite(heightCm) || heightCm <= 0 || heightCm >= 300) {
    elements.idealWeightValue.textContent = "—";
    elements.idealWeightRange.textContent =
      "Enter your height to calculate your estimated ideal weight.";
    elements.idealWeightDifference.hidden = true;
    elements.idealWeightDifference.textContent = "";
    return;
  }

  const idealWeight = calculateIdealWeight(gender, heightCm);
  const lowerRange = idealWeight - 5;
  const upperRange = idealWeight + 5;

  elements.idealWeightValue.textContent = `${idealWeight.toFixed(1)} kg`;
  elements.idealWeightRange.textContent = `${lowerRange.toFixed(1)} kg – ${upperRange.toFixed(1)} kg`;

  if (Number.isFinite(currentWeight) && currentWeight > 0) {
    const difference = currentWeight - idealWeight;
    const differenceLabel =
      difference < 0
        ? `${Math.abs(difference).toFixed(1)} kg below your estimated ideal weight.`
        : `${difference.toFixed(1)} kg above your estimated ideal weight.`;

    elements.idealWeightDifference.hidden = false;
    elements.idealWeightDifference.textContent = differenceLabel;
  } else {
    elements.idealWeightDifference.hidden = true;
    elements.idealWeightDifference.textContent = "";
  }
}

function calculateNutritionMetrics(
  gender,
  age,
  weight,
  height,
  activityFactor,
) {
  const bmr =
    gender === "female"
      ? 10 * weight + 6.25 * height - 5 * age - 161
      : 10 * weight + 6.25 * height - 5 * age + 5;

  const maintenanceCalories = Math.round(bmr * activityFactor);
  const weightLossCalories = maintenanceCalories - 500;
  const weightGainCalories = maintenanceCalories + 500;
  const protein = Math.round(1.6 * weight);
  const water = Number(((35 * weight) / 1000).toFixed(1));
  const fiber = gender === "female" ? 25 : 38;

  return {
    bmr: Math.round(bmr),
    maintenanceCalories,
    weightLossCalories,
    weightGainCalories,
    protein,
    water,
    fiber,
  };
}

function updateNutritionResult() {
  const selectedGender = Array.from(elements.nutritionGenderInputs || []).find(
    (input) => input.checked,
  );
  const gender = selectedGender?.value || "male";
  const age = Number.parseFloat(elements.ageInputNutrition.value);
  const weight = Number.parseFloat(elements.weightInputNutrition.value);
  const height = Number.parseFloat(elements.heightInputNutrition.value);
  const activityFactor = Number.parseFloat(
    elements.activityInputNutrition?.value || "1.2",
  );

  if (
    !Number.isFinite(age) ||
    !Number.isFinite(weight) ||
    !Number.isFinite(height) ||
    !Number.isFinite(activityFactor) ||
    age < 10 ||
    age > 120 ||
    weight <= 0 ||
    height <= 0 ||
    activityFactor <= 0
  ) {
    elements.nutritionMaintenance.textContent = "—";
    elements.nutritionSummary.textContent =
      "Enter your details to calculate your daily nutrition requirements.";
    elements.nutritionLoss.textContent = "—";
    elements.nutritionMaintain.textContent = "—";
    elements.nutritionGain.textContent = "—";
    elements.nutritionProtein.textContent = "—";
    elements.nutritionWater.textContent = "—";
    elements.nutritionFiber.textContent = "—";
    return;
  }

  const metrics = calculateNutritionMetrics(
    gender,
    age,
    weight,
    height,
    activityFactor,
  );

  elements.nutritionMaintenance.textContent = `${metrics.maintenanceCalories} kcal/day`;
  elements.nutritionSummary.textContent =
    "Daily calorie targets for your current goals.";
  elements.nutritionLoss.textContent = `${metrics.weightLossCalories} kcal/day`;
  elements.nutritionMaintain.textContent = `${metrics.maintenanceCalories} kcal/day`;
  elements.nutritionGain.textContent = `${metrics.weightGainCalories} kcal/day`;
  elements.nutritionProtein.textContent = `${metrics.protein} g/day`;
  elements.nutritionWater.textContent = `${metrics.water.toFixed(1)} L/day`;
  elements.nutritionFiber.textContent = `${metrics.fiber} g/day`;
}

function openModal(modal) {
  if (!modal) {
    return;
  }

  appState.currentModal = modal;
  modal.classList.add("is-visible");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-visible");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  appState.currentModal = null;
}

function handleModalClose(event) {
  if (
    event.target.matches("[data-close-modal]") ||
    event.target.matches(".modal__backdrop")
  ) {
    closeModal(event.currentTarget.closest(".modal"));
  }
}

function wireEvents() {
  elements.bmiCard?.addEventListener("click", () =>
    openModal(elements.bmiModal),
  );
  elements.bodyFatCard?.addEventListener("click", () =>
    openModal(elements.bodyFatModal),
  );
  elements.idealWeightCard?.addEventListener("click", () =>
    openModal(elements.idealWeightModal),
  );
  elements.nutritionCard?.addEventListener("click", () =>
    openModal(elements.nutritionModal),
  );
  elements.aboutTrigger?.addEventListener("click", () =>
    openModal(elements.aboutModal),
  );

  elements.closeButtons.forEach((button) => {
    button.addEventListener("click", () =>
      closeModal(button.closest(".modal")),
    );
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal__backdrop")) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && appState.currentModal) {
      closeModal(appState.currentModal);
    }
  });

  [elements.weightInput, elements.heightInput].forEach((input) => {
    input?.addEventListener("input", updateBmiResult);
  });

  [
    elements.ageInputBodyFat,
    elements.weightInputBodyFat,
    elements.heightInputBodyFat,
  ].forEach((input) => {
    input?.addEventListener("input", updateBodyFatResult);
    input?.addEventListener("change", updateBodyFatResult);
  });

  Array.from(elements.bodyFatGenderInputs || []).forEach((input) => {
    input.addEventListener("input", updateBodyFatResult);
    input.addEventListener("change", updateBodyFatResult);
  });

  [elements.heightInputIdealWeight, elements.currentWeightInput].forEach(
    (input) => {
      input?.addEventListener("input", updateIdealWeightResult);
      input?.addEventListener("change", updateIdealWeightResult);
    },
  );

  Array.from(elements.idealWeightGenderInputs || []).forEach((input) => {
    input.addEventListener("input", updateIdealWeightResult);
    input.addEventListener("change", updateIdealWeightResult);
  });

  [
    elements.ageInputNutrition,
    elements.weightInputNutrition,
    elements.heightInputNutrition,
    elements.activityInputNutrition,
  ].forEach((input) => {
    input?.addEventListener("input", updateNutritionResult);
    input?.addEventListener("change", updateNutritionResult);
  });

  Array.from(elements.nutritionGenderInputs || []).forEach((input) => {
    input.addEventListener("input", updateNutritionResult);
    input.addEventListener("change", updateNutritionResult);
  });

  updateBmiResult();
  updateBodyFatResult();
  updateIdealWeightResult();
  updateNutritionResult();
}

wireEvents();
