const appState = {
  currentModal: null,
};

const elements = {
  bmiModal: document.getElementById("bmiModal"),
  bodyFatModal: document.getElementById("bodyFatModal"),
  aboutModal: document.getElementById("aboutModal"),
  bmiValue: document.getElementById("bmiValue"),
  bmiCategory: document.getElementById("bmiCategory"),
  bodyFatValue: document.getElementById("bodyFatValue"),
  bodyFatCategory: document.getElementById("bodyFatCategory"),
  bodyFatNote: document.getElementById("bodyFatNote"),
  weightInput: document.getElementById("weightInput"),
  heightInput: document.getElementById("heightInput"),
  ageInputBodyFat: document.getElementById("ageInputBodyFat"),
  weightInputBodyFat: document.getElementById("weightInputBodyFat"),
  heightInputBodyFat: document.getElementById("heightInputBodyFat"),
  bodyFatGenderInputs: document.querySelectorAll('input[name="bodyFatGender"]'),
  bmiCard: document.querySelector('[data-calculator="bmi"]'),
  bodyFatCard: document.querySelector('[data-calculator="body-fat"]'),
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
    elements.bmiCategory.textContent = "Enter your details";
    return;
  }

  const heightMeters = heightCm / 100;
  const bmi = weight / (heightMeters * heightMeters);

  if (!Number.isFinite(bmi)) {
    elements.bmiValue.textContent = "—";
    elements.bmiCategory.textContent = "Enter your details";
    return;
  }

  elements.bmiValue.textContent = bmi.toFixed(2);
  elements.bmiCategory.textContent = getBmiCategory(bmi);
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
    elements.bodyFatCategory.textContent = "Enter your details";
    return;
  }

  const heightMeters = heightCm / 100;
  const bmi = weight / (heightMeters * heightMeters);

  if (!Number.isFinite(bmi) || bmi <= 0) {
    elements.bodyFatValue.textContent = "—";
    elements.bodyFatCategory.textContent = "Enter your details";
    return;
  }

  const bodyFat =
    gender === "female"
      ? 1.2 * bmi + 0.23 * age - 5.4
      : 1.2 * bmi + 0.23 * age - 16.2;

  const roundedBodyFat = Number(bodyFat.toFixed(1));
  elements.bodyFatValue.textContent = `${roundedBodyFat.toFixed(1)}%`;
  elements.bodyFatCategory.textContent = getBodyFatCategory(
    gender,
    roundedBodyFat,
  );
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

  updateBmiResult();
  updateBodyFatResult();
}

wireEvents();
