// Fetch all users on page load
document.addEventListener("DOMContentLoaded", function() {
    fetchUsers();
});

// Fetch all users from the backend
async function fetchUsers() {
    try {
        const response = await fetch('/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error(error);
    }
}

// Render users into the table
function renderUsers(users) {
    const userTableBody = document.getElementById('user-table-body');
    userTableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="editUser('${user._id}')">Edit</button>
                <button onclick="deleteUser('${user._id}')">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Search users by name, email, or role
function searchUsers() {
    const query = document.getElementById('user-search').value.toLowerCase();

    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const filteredUsers = users.filter(user => 
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query)
            );
            renderUsers(filteredUsers);
        })
        .catch(error => console.error('Error searching users:', error));
}

// Filter users by role
function filterUsersByRole() {
    const selectedRole = document.getElementById('role-filter').value;

    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const filteredUsers = selectedRole 
                ? users.filter(user => user.role === selectedRole) 
                : users;
            renderUsers(filteredUsers);
        })
        .catch(error => console.error('Error filtering users by role:', error));
}

// Add a new user
async function addNewUser(event) {
    event.preventDefault();

    const name = document.getElementById('new-user-name').value;
    const email = document.getElementById('new-user-email').value;
    const role = document.getElementById('new-user-role').value;

    const newUser = { name, email, role };

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        fetchUsers(); // Refresh the user list
        document.getElementById('add-user-form').reset(); // Reset the form
    } catch (error) {
        console.error('Error adding new user:', error);
    }
}

// Edit a user
function editUser(userId) {
    alert('Edit user with ID: ' + userId);
}

// Delete a user
async function deleteUser(userId) {
    try {
        const response = await fetch(`/users/${userId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        fetchUsers(); // Refresh the user list
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

function logout(event) {
    event.preventDefault();
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
        window.location.href =  window.location.href = '../auth/logout.html';
    } else {
        console.log("Logout cancelled");
    }
}
