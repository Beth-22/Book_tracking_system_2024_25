// settings.ts

export interface UserSettings {
    username?: string;
    email?: string;
    password?: string;
}

// Update user settings
export async function updateUserSettings(settings: UserSettings): Promise<void> {
    const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
    });

    if (!response.ok) {
        throw new Error('Failed to update user settings');
    }

    alert('Settings updated successfully!');
}
