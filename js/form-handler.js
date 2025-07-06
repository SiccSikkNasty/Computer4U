document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycbzkh5ckHMloEaSDX0gmWkDlrfixALwcQkPLsMNJsXN2MIEScSnEUiQM0wLMo-9wzBPw/exec", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())  // parse the JSON
  .then(data => {
    if (data.result === "success") {
      // Show thank-you message and redirect
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
      throw new Error("Server did not return success.");
    }
  })
  .catch(error => {
    alert("Submission failed. Please try again.");
    console.error("Error:", error);
  });
});
