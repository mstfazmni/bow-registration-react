import React, { useState, useEffect} from 'react';
import './StudentDashboardPage.css';
import ContactForm from '../components/ContactForm';
 
const StudentDashboardPage = ({ chosenCourses, selectedProgram, onCourseDrop }) => {
        const [selectedCourse, setSelectedCourse] = useState(null);
        const [studentFirstName, setStudentFirstName] = useState('');
        const [studentLastName, setStudentLastName] = useState('');
        const [studentEmail, setStudentEmail] = useState('');
        const [showContactForm, setShowContactForm] = useState(false);
        const [messages, setMessages] = useState([]);
 
        useEffect(() => {
            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            if (user) {
                setStudentFirstName(user.firstname);
                setStudentLastName(user.lastname);
                setStudentEmail(user.email);
            }
        }, []);
 
        const handleCourseSelection = (course) => {
            if (selectedProgram && selectedProgram.Program === course.Program) {
                setSelectedCourse(course);
            } else {
                alert("The selected course does not match the chosen program.");
            }
        };
       
        const handleSendMessage = (message) => {
            const existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
            localStorage.setItem('messages', JSON.stringify([...existingMessages, message]));
            setMessages((prevMessages) => [...prevMessages, message]);
            alert('Message sent!');
          };
       
 
    return (
        <div className='dashboard-container'>
            <div className='st-info'>
               {/* <img
                    className='st-img'
                    src='https://media.istockphoto.com/id/1438969575/photo/smiling-young-male-college-student-wearing-headphones-standing-in-a-classroom.jpg?s=612x612&w=0&k=20&c=yNawJP9JGXU6LOL262ME5M1U2xxNKQsvT7F9DZhZCh4='
                    alt="Student"
                />
                //upload profile img can be implemented in phase 2
                */}
                <p className='st-fname'>First Name: {studentFirstName}</p>
                <p className='st-lName'>Last Name: {studentLastName}</p>
                <p className='st-eMail'>E-mail: {studentEmail}</p>
               
                <br />
                <button className='btn-contact' onClick={() => setShowContactForm(!showContactForm)}>Contact</button>
                {showContactForm && <ContactForm onSend={handleSendMessage} />}
            </div>
 
            <div className='program-section'>
            <h2> Program</h2>
                {selectedProgram && (
                    <div>
                        <p>Code: {selectedProgram.Code}</p>
                        <p>Program: {selectedProgram.Program}</p>
                        <p>Department: {selectedProgram.Department}</p>
                        <p>Term: {selectedProgram.Term}</p>
                        <p>Description: {selectedProgram.Description}</p>
                        <p>Start Date: {selectedProgram.StartDate}</p>
                        <p>End Date: {selectedProgram.EndDate}</p>
                        <p>Fees: {selectedProgram.Fees}</p>
                    </div>
               
                )}
            </div>
 
            <div className='courses-section'>
                <h2>Your Courses</h2>
                {chosenCourses.length > 0 ? (
                    <ul>
                        {chosenCourses.map(course => (
                            <li key={course.Code}>
                                <h4>{course.Course}({course.Code})</h4>
                                {/*details for courses will be added in backend*/}
                                <p>{course.Description}</p>
                                <p>{course.StartDate}</p>
                                <p>{course.EndDate}</p>
                                <button
                                    className='btn-drop'
                                    onClick={() => onCourseDrop(course.Code)}
                                >
                                    Drop
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No courses chosen.</p>
                )}
            </div>
        </div>
    );
};
 
export default StudentDashboardPage;