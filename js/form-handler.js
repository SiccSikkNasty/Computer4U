document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('input[type="submit"]');

  // ✅ Disable the submit button
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
    // ✅ Re-enable button if it fails
    submitButton.disabled = false;
    submitButton.value = "Submit";
  });
});
