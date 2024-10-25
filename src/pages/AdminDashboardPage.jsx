// import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import '../pages/AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboardPage = () => {

    // // Course Management States
    // const [courses, setCourses] = useState([]);
    // const [newCourse, setNewCourse] = useState({
    //     id: '',
    //     Programs: '',
    //     Terms: '',
    //     Descriptions: '',
    //     StartDate: '',
    //     EndDate: '',
    //     Fees: ''
    // });

    // const [isAddingCourse, setIsAddingCourse] = useState(false);
    // const [editingCourseId, setEditingCourseId] = useState(null);

    // // Admin Profile States
    // const [adminData, setAdminData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     phone: '',
    //     username: '',
    //     password: '',
    // });

    // const [isEditing, setIsEditing] = useState(false);
    const users = JSON.parse(localStorage.getItem('loggedInUser')) || [];
    const name = users.firstname;
    

    return (
        <div className='admin-dashboard'>
            <div className='admin-content'>
                <h1>Hello, {name} !</h1>
                <h2>Welcome to your Admin Dashboard</h2>
                <p>Get ready to manage your courses and students effectively!</p>
            </div>
        </div>
    );
}

export default AdminDashboardPage;
