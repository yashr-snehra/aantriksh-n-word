let loginForm = document.querySelector(".my-form");
let messageContainer = document.getElementById("message-container");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Send form data to the backend
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Success response
        } else {
            throw new Error('Invalid credentials');
        }
    })
    .then(data => {
        // Handle success message
        showMessage(data.message, 'success');
    })
    .catch(error => {
        // Handle errors
        showMessage(error.message || 'Login failed. Please check your credentials.', 'error');
    });
});

function showMessage(message, messageType) {
    // Create a div element for the message
    let messageDiv = document.createElement('div');
    messageDiv.textContent = message;

    // Add styling based on message type (success or error)
    if (messageType === 'success') {
        messageDiv.style.color = 'green';
    } else if (messageType === 'error') {
        messageDiv.style.color = 'red';
    }

    // Clear previous messages
    messageContainer.innerHTML = '';

    // Append the message to the message container
    messageContainer.appendChild(messageDiv);
}
