document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycbxV2R0Oyb6y20SHeTl-xXT9voj2Th3LsFVrY6DruTT1VfIhD09sU6mAfjkGa_rpsjgIxA/exec", {
    method: "POST",
    body: formData
  })
  .then(response => {
    document.body.innerHTML = `
      <div style="text-align: center; padding-top: 20vh; font-family: Arial;">
        <h1>Thank you!</h1>
        <p>Your form has been submitted.</p>
        <p>Redirecting...</p>
      </div>
    `;
    setTimeout(() => {
      window.location.href = "computer4u.ca";
    }, 3000);
  })
  .catch(error => {
    alert("Submission failed. Please try again.");
    console.error("Error:", error);
  });
});
