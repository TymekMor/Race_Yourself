document.querySelectorAll(".but").forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    document
      .querySelectorAll(".but")
      .forEach((btn) => btn.classList.remove("is-active"));

    // Add active class to the clicked button
    this.classList.add("is-active");

    // Set the value to the hidden input field
    document.getElementById("gender-input").value =
      this.getAttribute("data-value");
  });
});

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  var emailInput = document.querySelector('input[name="Email"]');
  var emailValue = emailInput.value.trim(); // Remove whitespace from the beginning and end
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern

  if (emailValue === "") {
    // Display error message for empty email
    document.getElementById("message").textContent =
      "Email field cannot be empty.";
    document.getElementById("message").style.display = "block";
    document.getElementById("message").style.backgroundColor = "red";
    document.getElementById("message").style.color = "white";
    return; // Stop the form submission
  }

  if (!emailPattern.test(emailValue)) {
    // Display error message for invalid email
    document.getElementById("message").textContent =
      "Please enter a valid email address.";
    document.getElementById("message").style.display = "block";
    document.getElementById("message").style.backgroundColor = "red";
    document.getElementById("message").style.color = "white";
    return; // Stop the form submission
  }

  document.getElementById("message").style.display = "block";
  document.getElementById("message").style.backgroundColor = "green";
  document.getElementById("message").textContent = "Submitting..";
  document.getElementById("message").style.display = "block";
  document.getElementById("message").style.color = "white";
  document.getElementById("submit-button").disabled = true;
  // Collect the form data
  var formData = new FormData(this);
  var keyValuePairs = [];
  for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
  }

  var formDataString = keyValuePairs.join("&");

  // Send a POST request to your Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycbymVNQtAcpOrVLZPvV-3IomHztyf0QkXUh7goFrlJVjGumP8ZLXpoIKo1kqge554fbK/exec",
    {
      redirect: "follow",
      method: "POST",
      body: formDataString,
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    }
  )
    .then(function (response) {
      // Check if the request was successful
      if (response) {
        return response; // Assuming your script returns JSON response
      } else {
        throw new Error("Failed to submit the form.");
      }
    })
    .then(function (data) {
      // Display a success message
      document.getElementById("message").textContent =
        "Data submitted successfully!";
      document.getElementById("message").style.display = "block";
      document.getElementById("message").style.backgroundColor = "green";
      document.getElementById("message").style.color = "beige";
      document.getElementById("submit-button").disabled = false;
      document.getElementById("form").reset();

      setTimeout(function () {
        document.getElementById("message").textContent = "";
        document.getElementById("message").style.display = "none";
      }, 2600);
    })
    .catch(function (error) {
      // Handle errors, you can display an error message here
      console.error(error);
      document.getElementById("message").textContent =
        "An error occurred while submitting the form.";
      document.getElementById("message").style.display = "block";
    });
});
