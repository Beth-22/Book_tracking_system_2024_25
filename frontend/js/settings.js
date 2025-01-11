// settings.js

// Update user settings
export async function updateUserSettings(settings) {
    const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
    });

    if (!response.ok) {
        throw new Error('Failed to update user settings');
    }

    return await response.json();
}
