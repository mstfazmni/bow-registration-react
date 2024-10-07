//importing css file for App.js
import './App.css';
import React, {useEffect,useState} from "react";
//importing pages from pages folder
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import RegistrationPage from './pages/RegistrationPage';
import CourseListingPage from './pages/CourseListingPage';
//importing components from components folder
import CourseCard from './components/CourseCard';
import Header from './components/Header';
import Footer from './components/Footer';
//importing bootstrap (first install it with: npm install bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const studentFirstName = "Mostafa";
  const studentLastName = "Zamani"
  const studentEmail = "m.zamani031@mybvc.ca"
// ====================
const [courses, setCourses] = useState([]);

useEffect( ()=> {
    const fetchCourses = async () => {
        const response = await fetch('/courses.json');
        const data = await response.json();
        setCourses(data);
    };

    fetchCourses();
}, []);



const [chosenCourses, setChosenCourses] = useState(() => {
  // Retrieve from local storage if available
  const storedCourses = localStorage.getItem('chosenCourses');
  return storedCourses ? JSON.parse(storedCourses) : [];
});

// Callback to handle data from RegistrationPage
const handleChosenCourses = (course) => {
  setChosenCourses((prevChosenCourses) => {
    const updatedCourses = [...prevChosenCourses, course];
    // Save to local storage
    localStorage.setItem('chosenCourses', JSON.stringify(updatedCourses));
    return updatedCourses; 
  });

};

const deleteBtnHandler = (id) => {
  setChosenCourses((prevChosenCourses) => {
      const updatedCourses = prevChosenCourses.filter((course) => course.id !== id);
      console.log(updatedCourses); 
      
      // Update local storage with the new list
      localStorage.setItem('chosenCourses', JSON.stringify(updatedCourses));
      
      return updatedCourses;
  });
};

  return (
  <div>
      <BrowserRouter>

      <Header></Header>

      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path="/signup" element={<SignupPage/>}/> 
        <Route path='/studentdashboard' element={<StudentDashboardPage studentFirstName={studentFirstName} studentLastName={studentLastName} studentEmail={studentEmail} chosenCourses={chosenCourses} onDelete={deleteBtnHandler}/>} />
        <Route path='/Registration' element={<RegistrationPage courses={courses} onCourseAdd={handleChosenCourses} />} />
        <Route path='/courselisting' element={<CourseListingPage courses={courses} />} />
      </Routes>

      <Footer></Footer>
      
    </BrowserRouter>
  </div>
  );
}

export default App;
