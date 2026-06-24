const appState = {
  currentModal: null,
};

const elements = {
  bmiModal: document.getElementById("bmiModal"),
  aboutModal: document.getElementById("aboutModal"),
  bmiValue: document.getElementById("bmiValue"),
  bmiCategory: document.getElementById("bmiCategory"),
  weightInput: document.getElementById("weightInput"),
  heightInput: document.getElementById("heightInput"),
  bmiCard: document.querySelector('[data-calculator="bmi"]'),
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

  updateBmiResult();
}

wireEvents();
