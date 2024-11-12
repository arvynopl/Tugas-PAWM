// Authentication check functions
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'page-sign-in.html';
        return;
    }

    if (isTokenExpired(token)) {
        // Clear storage and redirect if token is expired
        localStorage.removeItem('token');
        localStorage.removeItem('nim');
        window.location.href = 'page-sign-in.html?error=' + encodeURIComponent('Session expired. Please login again');
    }
}

function isTokenExpired(token) {
    try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        return tokenData.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nim');
    window.location.href = 'page-sign-in.html';
}

// Handle login form submission
// Add 'async' keyword here
async function handleLogin(event) {  // <-- Add async here
    event.preventDefault();
    
    const nim = document.getElementById('nim').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('your-backend-url/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nim, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('nim', data.user.nim);
        
        window.location.href = 'page-home.html';
    } catch (error) {
        alert(error.message || 'Login failed. Please try again.');
    }
}

// Export functions to be used in other files
export { checkAuth, logout, handleLogin };