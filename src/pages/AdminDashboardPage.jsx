import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboardPage.css';

const AdminDashboardPage = ({adminFirstName, adminLastName, adminEmail}) => {

    return(
        <div className='dashboard-container'>
                <div className='ad-info'>
                    <img className='ad-img' src='https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg'></img>
                    <p className='ad-fname'>First Name: {adminFirstName}</p>
                    <p className='ad-lName'>Last Name: {adminLastName}</p>
                    <p className='ad-eMail'>E-mail: {adminEmail}</p>
                    <Link to='/courseconfig'>
                    <button className='btn-config'>Course Config</button>
                    </Link> 
                    
                    <br></br>

                    <button className='btn-viewStudents'>View Students</button>
                </div>
                <div className='st-forms'> 

                </div>
        </div>
    );
}

export default AdminDashboardPage