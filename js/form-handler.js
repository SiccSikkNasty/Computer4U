document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Form submitted — disabling button...");

    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');

    // Disable the button
    submitButton.disabled = true;
    submitButton.value = "Submitting...";

    fetch("https://script.google.com/macros/s/AKfycbxV2R0Oyb6y20SHeTl-xXT9voj2Th3LsFVrY6DruTT1VfIhD09sU6mAfjkGa_rpsjgIxA/exec", {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(text => {
        console.log("Raw response:", text);
        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          throw new Error("Invalid JSON response");
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
            window.location.href = "https://computer4u.ca/contact-page";
          }, 3000);
        } else {
          throw new Error("Non-success result");
        }
      })
      .catch(error => {
        alert("Submission failed. Please try again.");
        console.error("Error:", error);
        submitButton.disabled = false;
        submitButton.value = "Submit";
      });
  });
});
