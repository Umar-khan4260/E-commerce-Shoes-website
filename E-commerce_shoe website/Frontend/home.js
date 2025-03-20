// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchForm(modalId) {
    closeModal('loginModal');
    closeModal('registerModal');
    closeModal('forgotPasswordModal');
    openModal(modalId);
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Handle Forgot Password Form Submission
document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    // Simulate sending a reset password email
    alert(`A password reset link has been sent to ${email}. Please check your email.`);
    closeModal('forgotPasswordModal');
});

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    // Simulate login functionality
    alert(`Logged in with email: ${email}`);
    closeModal('loginModal');
});