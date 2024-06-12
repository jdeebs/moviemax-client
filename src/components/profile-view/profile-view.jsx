import React, { useState, useEffect } from "react";
import axios from "axios";

export const ProfileView = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/users");
                setUser(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user data available.</div>;
    }

    return (
        <div className="profile-view">
            <h1>Profile Info</h1>
            <div>
                <strong>Name:</strong> {user.Name}
            </div>
            <div>
                <strong>Email:</strong> {user.Email}
            </div>
            <div>
                <strong>Username:</strong> {user.Username}
            </div>
            <div>
                <strong>Birthday:</strong> {user.Birthday}
            </div>
        </div>
    )
};