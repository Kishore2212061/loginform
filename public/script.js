document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Registration successful');
            event.target.reset(); // Reset form on successful registration
        } else {
            const data = await response.text();
            alert(`Registration failed: ${data}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to register. Please try again later.');
    }
});
