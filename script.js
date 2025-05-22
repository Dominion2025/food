function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

async function submitCode() {
  const code = document.getElementById('confirmation-code').value.trim();

  if (!code) return alert("Please enter a code.");

  // Simulated server response for demo purposes
  const response = await fakeVerifyCode(code);

  if (response.status === "invalid") {
    goToPage('page-error');
  } else if (response.status === "used") {
    goToPage('page-duplicate');
  } else if (response.status === "valid") {
    goToPage('page-menu');
  }
}

async function submitForm(event) {
  event.preventDefault();
  // You would normally send data to your server here
  console.log("Form submitted.");
  goToPage('page-confirmation');
}

// Fake server logic to simulate verification
async function fakeVerifyCode(code) {
  const validCodes = { "VALID123": "valid", "USED123": "used" };
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ status: validCodes[code] || "invalid" });
    }, 500);
  });
}
