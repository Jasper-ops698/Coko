import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
export const auth = getAuth(app);

// Assign role to user
export async function assignRole(uid, role) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user is currently signed in');

        const token = await user.getIdToken(true); // Fetch current user's ID token
        const response = await fetch('/api/setAdminRole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Send token for validation
            },
            body: JSON.stringify({ uid, role }), // Send the desired role and UID to the backend
        });

        if (response.ok) {
            console.log('Role successfully assigned on the server.');
            // Force refresh to get updated custom claims
            await user.getIdToken(true);
        } else {
            console.error('Failed to assign role:', await response.text());
        }
    } catch (error) {
        console.error('Error assigning role:', error);
    }
}
