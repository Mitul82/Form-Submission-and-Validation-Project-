document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting

        let isValid = true; // Flag to check if form is valid
        const firstname = document.getElementById('firstname').value; // Get form values
        const middlename = document.getElementById('middlename').value; // Get form values
        const lastname = document.getElementById('lastname').value; // Get form values
        const username = document.getElementById('username').value; // Get form values
        const email = document.getElementById('email').value; // Get form values
        const phone_no = document.getElementById('phone_no').value; // Get form values
        const password = document.getElementById('password').value; // Get form values
        const reenter_password = document.getElementById('reenter_password').value; // Get form values

        // Clear previous errors (if any)
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => element.remove());

        // Validate first name
        if (firstname.trim() === '') {
            isValid = false;
            showError('firstname', 'First name is required');
        }

        // Validate last name
        if (lastname.trim() === '') {
            isValid = false;
            showError('lastname', 'Last name is required');
        }

        // Validate username
        if (username.length < 5) {
            isValid = false;
            showError('username', 'Username must be at least 5 characters long');
        }

        // Validate email
        if (!email.includes('@')) {
            isValid = false;
            showError('email', 'Please enter a valid email address');
        }

        // Validate phone number
        const phonePattern = /^\d{10}$/;
        if (phone_no === '1234567890' || !phonePattern.test(phone_no)) {
            isValid = false;
            showError('phone_no', 'Please enter a valid 10-digit phone number');
        }

        // Validate password
        if (password.length < 8 || password.toLowerCase() === 'password' || password.toLowerCase() === username.toLowerCase() || password.toLowerCase() === firstname.toLowerCase() || password.toLowerCase() === lastname.toLowerCase()) {
            isValid = false;
            showError('password', 'Password is not strong enough or contains your username/first name /last name');
        }

        // Validate confirm password
        if (password !== reenter_password) {
            isValid = false;
            showError('reenter_password', 'Password and confirm password do not match');
        }

        // Submit the form if valid
        if (isValid) {
            alert('Form submitted successfully!');
        }
    });

    // Function to validate individual fields on change
    function validateinput(event){
        const fieldId = event.target.id;
        const value = event.target.value;

        // Clear any existing errors for the field
        const errorElements = document.querySelectorAll(`#${fieldId} + .error`);
        errorElements.forEach(element => element.remove());

        // Validate based on field ID
        if (fieldId === 'firstname' && value.trim() === '') {
            showError(fieldId, 'First name is required');
        }
        if (fieldId === 'lastname' && value.trim() === '') {
            showError(fieldId, 'Last name is required');
        }
        if (fieldId === 'username' && value.length < 5) {
            showError(fieldId, 'Username must be at least 5 characters long');
        }
        if (fieldId === 'email' && !value.includes('@')) {
            showError(fieldId, 'Please enter a valid email address');
        }
        if (fieldId === 'phone_no' && !/^\d{10}$/.test(value)) {
            showError(fieldId, 'Please enter a valid 10-digit phone number');
        }
        if (fieldId === 'password' && (value.length < 8 || value.toLowerCase() === 'password' || value.toLowerCase() === 'username' || value.toLowerCase() === 'firstname' || value.toLowerCase() === 'lastname')) {
            showError(fieldId, 'Password is not strong enough or contains your username/first name/last name');
        }
        if (fieldId === 'reenter_password' && value !== document.getElementById('password').value) {
            showError(fieldId, 'Password and confirm password do not match');
        }
    };
    
    // Function to show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error');
        errorMessage.style.color = 'red';
        errorMessage.textContent = message;
        field.parentNode.appendChild(errorMessage);
    }
});