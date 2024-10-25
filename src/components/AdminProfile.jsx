import React, { useState, useEffect } from 'react';
import './AdminProfile.css';



const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        studentId: '',
        password: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const currentAdminData = JSON.parse(localStorage.getItem("loggedInUser"))
        setAdminData(currentAdminData);
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
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
        // Find the index of the logged-in user in the users array
        const userIndex = users.findIndex(user => user.firstname === loggedUser.firstname && user.email === loggedUser.email);
    
        if (userIndex !== -1) {
            // Update the user data in the array
            users[userIndex] = { ...users[userIndex], ...adminData }; // Merge updated data (adminData) with the current user
    
            // Save the updated users array to localStorage
            localStorage.setItem('users', JSON.stringify(users));
    
            // Optionally, update the loggedInUser in localStorage too
            localStorage.setItem('loggedInUser', JSON.stringify(users[userIndex]));
        }
    
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
                                name="firstname"
                                value={adminData.firstname}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{` ${adminData.firstname}`}</span>
                        )}
                    </label>
                </div>
                <div className="profile-item">
                    <label><b>Last Name:</b>
                        {isEditing ? (
                            <input
                                type="text"
                                name="lastname"
                                value={adminData.lastname}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{` ${adminData.lastname}`}</span>
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
                    <label><b>Admin ID:</b>
                        {isEditing ? (
                            <input
                                type="text"
                                name="studentId"
                                value={adminData.studentId}
                                onChange={handleChange}
                            />
                        ) : (
                            <span>{` ${adminData.studentId}`}</span>
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
                        <button className='save-btn' onClick={handleSave}>Save</button>
                        <button className='cancel-btn' onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <button className='edit-btn2' onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
