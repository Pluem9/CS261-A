// Attach submitLogin to the form's submit event
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from reloading the page
    submitLogin();
});

function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Clear previous messages
    messageElement.innerHTML = '';
    
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': '-'  // Replace '-' with your actual API key
        },
        body: JSON.stringify({
            UserName: username,
            PassWord: password
        })
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        // Assuming the response contains "status" and useful fields
        if (data.status === true) {
            messageElement.innerHTML = `
                <p>Login successful!</p>
                <p>Username: ${data.username}</p>
                <p>Email: ${data.email}</p>
                <p>Display Name: ${data.displayname_en}</p>
                <p>Faculty: ${data.faculty}</p>`;
        } 
        
        else {
            messageElement.innerHTML = `<p>Login failed: ${data.message}</p>`;
        }
    })

    .catch(error => {
        messageElement.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

