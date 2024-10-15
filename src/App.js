import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import RegistrationPage from './pages/RegistrationPage';
import CourseListingPage from './pages/CourseListingPage';
import ProgramListingPage from './pages/ProgramListingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import coursesData from './components/courses.json'; 
import programsData from './components/programs.json'; 
import AdminDashboard from './pages/AdminDashboardPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const studentFirstName = localStorage.getItem('studentFirstName');
    const studentLastName = localStorage.getItem('studentLastName');
    const studentEmail = localStorage.getItem('studentEmail');

    const [courses, setCourses] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);//set to false when implementing login/signup
    
    useEffect(() => {
        setCourses(coursesData); 
        setPrograms(programsData);
    }, []);

    const [chosenCourses, setChosenCourses] = useState(() => {
        const storedCourses = localStorage.getItem('chosenCourses');
        return storedCourses ? JSON.parse(storedCourses) : [];
    });
    
    const [selectedProgram, setSelectedProgram] = useState(() => {
        const storedProgram = localStorage.getItem('selectedProgram');
        return storedProgram ? JSON.parse(storedProgram) : null; 
    });

    const handleProgramAdd = (program) => {
        if (selectedProgram) {
            alert("You can only select one program at a time.");
            return;
        }
        
        setSelectedProgram(program);
        localStorage.setItem('selectedProgram', JSON.stringify(program));
        alert(`Program ${program.Program} added successfully!`);

    };
    

    const handleChosenCourses = (course) => {

        if (!selectedProgram) {
            alert("Please select a program first.");
            return;
        }
    
        // Check if the course belongs to the selected program and term
        if (course.Program !== selectedProgram.Program || course.Term !== selectedProgram.Term) {
            alert(`You can only add courses from the ${selectedProgram.Program} program for the ${selectedProgram.Term} term.`);
            return;
        }
           
    
        // Check if the maximum number of courses is reached or if the course is already added
        if (chosenCourses.length < 5 && !chosenCourses.some(c => c.Code === course.Code)) {
            const updatedCourses = [...chosenCourses, course];
            setChosenCourses(updatedCourses);
            localStorage.setItem('chosenCourses', JSON.stringify(updatedCourses));
            alert(`Course ${course.Course} added successfully!`);
        } else {
            alert("You cannot add this course.");
        }
    };

    const handleCourseDrop = (courseCode) => {
        const updatedCourses = chosenCourses.filter(course => course.Code !== courseCode);
        setChosenCourses(updatedCourses);
        localStorage.setItem('chosenCourses', JSON.stringify(updatedCourses));
        alert(`Course with code ${courseCode} dropped successfully!`);
    };

    return (
        <div>
            <BrowserRouter>
                <Header isLoggedIn={isLoggedIn} selectedProgram={selectedProgram} />
                <Routes>
                    <Route path='/' element={<Navigate to="/home" />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path='/studentdashboard' element={
                        <StudentDashboardPage 
                            studentFirstName={studentFirstName} 
                            studentLastName={studentLastName} 
                            studentEmail={studentEmail} 
                            chosenCourses={chosenCourses} 
                            selectedProgram={selectedProgram} 
                            onProgramAdd={handleProgramAdd}
                            onCourseAdd={handleChosenCourses} 
                            onCourseDrop={handleCourseDrop} 
                        />} 
                    />
                    <Route path='/registration' element={
                        <RegistrationPage 
                            courses={courses} 
                            programs={programs} 
                            onCourseAdd={handleChosenCourses} 
                            onProgramAdd={handleProgramAdd} 
                        />} 
                    />
                    <Route path='/courselisting' element={
                        <CourseListingPage 
                            courses={courses} 
                            onCourseAdd={handleChosenCourses}
                            selectedProgram={selectedProgram}
                        />} 
                    />
                    <Route path='/programlisting' element={
                        <ProgramListingPage 
                            programs={programs} 
                            onProgramAdd={handleProgramAdd}
                            selectedProgram={selectedProgram} 
                        />} 
                    /> 
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
