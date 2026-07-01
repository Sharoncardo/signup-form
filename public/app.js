const form = document.getElementById("signupForm");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  age: document.getElementById("age"),
};

let step = 1;

// Load saved draft
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("draft"));
  if (saved) {
    Object.keys(saved).forEach(key => {
      if (fields[key]) fields[key].value = saved[key];
    });
  }
};

// Save draft
function saveDraft() {
  const data = {
    name: fields.name.value,
    email: fields.email.value,
    password: fields.password.value,
    age: fields.age.value,
  };

  localStorage.setItem("draft", JSON.stringify(data));
}

// Blur validation
Object.values(fields).forEach(input => {
  input.addEventListener("blur", () => {
    validateField(input.id);
    saveDraft();
  });
});

// Validate single field
function validateField(field) {
  const value = fields[field].value;
  const errorEl = document.getElementById(field + "Error");

  let error = "";

  if (field === "name" && value.length < 3) {
    error = "Name field must be at least 3 characters. Please fix it.";
  }

  if (field === "email" && !value.includes("@")) {
    error = "Email field must include '@'. Please correct it.";
  }

  if (field === "password" && value.length < 6) {
    error = "Password must be at least 6 characters.";
  }

  if (field === "age" && value < 18) {
    error = "Age must be 18 or above.";
  }

  errorEl.textContent = error;
  return !error;
}

// Next step
function nextStep() {
  if (!validateField("name") || !validateField("email")) return;

  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
  step = 2;
}

// Previous step
function prevStep() {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
  step = 1;
}

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;

  const data = {
    name: fields.name.value,
    email: fields.email.value,
    password: fields.password.value,
    age: fields.age.value,
  };

  const res = await fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  submitBtn.disabled = false;

  if (!res.ok) {
    Object.keys(result.errors).forEach(key => {
      document.getElementById(key + "Error").textContent =
        result.errors[key];
    });
    return;
  }

  localStorage.removeItem("draft");

  document.getElementById("success").textContent =
    "Signup successful 🎉 Welcome!";
});