document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  
  const captcha = formData.get("g-recaptcha-response");
if (!captcha) {
  alert("Please complete the reCAPTCHA.");
  return;
}

  fetch("https://script.google.com/macros/s/AKfycbyOMGOTWF_CO20B9GqeYRxG44_eo68tdqecrW0Bb7-6cP_y86UDZDt5vXmkqBGGXlypSw/exec", {
    method: "POST",
    body: formData
  })
  .then(response => response.text()) // 🔧 Always read as text first
  .then(text => {
    console.log("Raw response:", text); // 🪵 LOG IT for debugging

    let data;
    try {
      data = JSON.parse(text); // ✅ Safely try parsing JSON
    } catch (err) {
      throw new Error("Response is not valid JSON");
    }

    if (data.result === "success") {
      document.body.innerHTML = `
        <div style="text-align: center; padding-top: 20vh; font-family: Arial;">
          <h1>Thank you!</h1>
          <p>Your form has been submitted.</p>
          <p>Redirecting...</p>
        </div>
      `;
      setTimeout(() => {
        window.location.href = "https://computer4u.ca";
      }, 3000);
    } else {
      throw new Error("Server returned non-success result");
    }
  })
  .catch(error => {
    alert("Submission failed. Please try again.");
    console.error("Fetch error:", error);
  });
});
