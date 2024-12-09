// Fetch users on page load
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
        const userTableBody = document.getElementById('user-table-body');

        // Clear current table rows
        userTableBody.innerHTML = '';

        // Insert new rows
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
    } catch (error) {
        console.error(error);
    }
}

// Search users by name, email, or role
function searchUsers() {
    const query = document.getElementById('user-search').value;
    fetch(`/api/users/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById('user-table-body');
            userTableBody.innerHTML = '';
            data.forEach(user => {
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
        })
        .catch(error => console.error('Error searching users:', error));
}

// Filter users by role
function filterUsersByRole() {
    const role = document.getElementById('role-filter').value;
    fetch(`/api/users/filter/role/${role}`)
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById('user-table-body');
            userTableBody.innerHTML = '';
            data.forEach(user => {
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
        })
        .catch(error => console.error('Error filtering users:', error));
}

// Filter users by status
function filterUsersByStatus() {
    const status = document.getElementById('status-filter').value;
    fetch(`/api/users/filter/status/${status}`)
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById('user-table-body');
            userTableBody.innerHTML = '';
            data.forEach(user => {
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
        })
        .catch(error => console.error('Error filtering users:', error));
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

// Edit a user (e.g., open a modal or new page)
function editUser(userId) {
    // Implement edit logic here
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
