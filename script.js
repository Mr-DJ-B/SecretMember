// Initialize users array from localStorage or create with default admin user
let users = localStorage.getItem('users') 
    ? JSON.parse(localStorage.getItem('users')) 
    : [
        {
            id: 1,
            username: 'admin',
            password: '123',
            email: 'admin@secretmember.com',
            createdAt: new Date().toISOString()
        }
    ];

// Function to handle user sign-up
function signUp(username, password, email) {
    // Check if username already exists
    if (users.some(user => user.username === username)) {
        return {
            success: false,
            message: 'Username already exists. Please choose a different username.'
        };
    }

    // Create new user object
    const newUser = {
        id: Date.now(),
        username: username,
        password: password,
        email: email,
        createdAt: new Date().toISOString()
    };

    // Add user to users array
    users.push(newUser);

    // Save updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    return {
        success: true,
        message: 'Sign-up successful! You can now log in.',
        user: newUser
    };
}

// Function to handle user login
function login(username, password) {
    // Find user with matching username and password
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return {
            success: false,
            message: 'Invalid username or password. Please try again.'
        };
    }

    // Save logged-in status to localStorage
    localStorage.setItem('loggedIn', JSON.stringify({
        userId: user.id,
        username: user.username,
        email: user.email,
        loginTime: new Date().toISOString()
    }));

    // Redirect to members page
    window.location.href = 'members.html';

    return {
        success: true,
        message: 'Login successful!',
        user: user
    };
}
