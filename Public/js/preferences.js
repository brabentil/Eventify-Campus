async function fetchCategories() {
    try {
        const response = await fetch('/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const categories = await response.json();
        populateCategoryOptions(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

function populateCategoryOptions(categories) {
    const categoryContainer = document.querySelector('.category-options');
    categoryContainer.innerHTML = '';

    categories.forEach(category => {
        const label = document.createElement('label');
        label.classList.add('category-option');
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'event-category';
        input.value = category._id;
        
        const span = document.createElement('span');
        span.textContent = category.name;

        label.appendChild(input);
        label.appendChild(span);
        
        categoryContainer.appendChild(label);
    });

    let user = getUserFromStorage();
    if (user && user.preferences) {
        categories.forEach(category => {
            const checkbox = document.querySelector(`input[value="${category._id}"]`);
            if (checkbox && user.preferences.some(p => p.category.toString() === category._id.toString())) {
                checkbox.checked = true;
            }
        });
    }
}

function getUserFromStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        console.error('User not found in localStorage');
    }
    return user;
}

async function updateUserPreferences(user) {
    try {
        const response = await fetch(`/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to update user preferences');
        }

        alert('Preferences updated successfully!');
        console.log('User preferences updated successfully');
    } catch (error) {
        console.error('Error updating user preferences:', error);
        alert('Error updating preferences. Please try again.');
    }
}

function handleSavePreferencesClick() {
    let user = getUserFromStorage();
    if (!user) {
        alert('User not found!');
        return;
    }

    const selectedCategories = Array.from(document.querySelectorAll('.category-option input[type="checkbox"]:checked'))
        .map(input => input.value);

    user.preferences = selectedCategories.map(categoryId => ({
        category: categoryId,
        notification_enabled: true
    }));

    localStorage.setItem('user', JSON.stringify(user));

    updateUserPreferences(user);
}

function initializePage() {
    fetchCategories();
    console.log('user:',localStorage.getItem('user'));  
}

document.getElementById('preferences-btn').addEventListener('click', handleSavePreferencesClick);

document.addEventListener('DOMContentLoaded', initializePage);

function logout(event) {
    event.preventDefault();
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
        window.location.href =  window.location.href = '../auth/logout.html';
    } else {
        console.log("Logout cancelled");
    }
}
