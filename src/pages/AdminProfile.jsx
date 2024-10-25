import React, { useState, useEffect } from 'react';
import './AdminProfile.css';



const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    // Load admin.json file
    useEffect(() => {
        const fetchAdminData = async () => {
            const response = await fetch('/admin.json');
            const data = await response.json();
            setAdminData(data);
        };

        fetchAdminData();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Save changes
    const handleSave = async () => {

        await fetch('/admin.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData),
        });
        setIsEditing(false);
    };

    return (
        <div className="admin-profile-container">
            <h1>Profile</h1>
            <div className="admin-profile-info">
                <div className="profile-item">
                    <label><b>First Name:</b>
                        {isEditing ? (
                            <input
                                type="text"
                                name="firstName"
                                value={adminData.firstName}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{` ${adminData.firstName}`}</span>
                        )}
                    </label>
                </div>
                <div className="profile-item">
                    <label><b>Last Name:</b>
                        {isEditing ? (
                            <input
                                type="text"
                                name="lastName"
                                value={adminData.lastName}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{` ${adminData.lastName}`}</span>
                        )}
                    </label>
                </div>
                <div className="profile-item"> 
                    <label><b>Email:</b>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={adminData.email}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{` ${adminData.email}`}</span>
                        )}
                    </label>
                </div>
                <div className="profile-item">
                    <label><b>Phone:</b>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone"
                                value={adminData.phone}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{` ${adminData.phone}`}</span>
                        )}
                    </label>
                </div>
                <div className="profile-item">
                    <label><b>Username:</b>
                        {isEditing ? (
                            <input
                                type="text"
                                name="username"
                                value={adminData.username}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{` ${adminData.username}`}</span>
                        )}
                    </label>
                </div>
                <div className="profile-item">
                    <label><b>Password:</b>
                        {isEditing ? (
                            <input
                                type="password"
                                name="password"
                                value={adminData.password}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{` ***********`}</span>
                        )}
                    </label>
                </div>
            </div>
            <div className="admin-profile-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
