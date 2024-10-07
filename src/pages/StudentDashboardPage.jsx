import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboardPage.css';
import CourseCard from '../components/CourseCard';

const StudentDashboardPage = ({studentFirstName, studentLastName, studentEmail, chosenCourses, onDelete}) => {

    
    useEffect(() => {
        console.log(chosenCourses); 
      }, [chosenCourses]);



    return(
        <div className='dashboard-container'>
                <div className='st-info'>
                    <img className='st-img' src='https://media.istockphoto.com/id/1438969575/photo/smiling-young-male-college-student-wearing-headphones-standing-in-a-classroom.jpg?s=612x612&w=0&k=20&c=yNawJP9JGXU6LOL262ME5M1U2xxNKQsvT7F9DZhZCh4='></img>
                    <p className='st-fname'>First Name: {studentFirstName}</p>
                    <p className='st-lName'>Last Name: {studentLastName}</p>
                    <p className='st-eMail'>E-mail: {studentEmail}</p>
                    <Link to='/registration'>
                    <button className='btn-registration'>Registration</button>
                    </Link> 
                    
                    <br></br>

                    <button className='btn-contact'>Contact</button>

                    {/* Displaying the courses which were chosen by the st */}
                </div>
                <div className='course-card-list'>
                        {chosenCourses.map((course) => (
                            <CourseCard
                            key = {course.id}
                            id = {course.id}
                            Programs = {course.Programs}
                            Terms = {course.Terms}
                            Descriptions = {course.Descriptions}
                            StartDate={course.StartDate} 
                            EndDate={course.EndDate} 
                            Fees={course.Fees}
                            showDeleteButton = {true}
                            onDelete={ ()=> onDelete(course.id)}
                            />
                        ))
                        }
                </div>
        </div>

    );
}

export default StudentDashboardPage;