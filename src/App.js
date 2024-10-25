//importing css file for App.js
import './App.css';
import React, {useEffect,useState} from "react";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProfile from './components/AdminProfile';
import AdminStudentList from './components/AdminStudentList';
import AdminCourseManagement from './components/AdminCourseManagement';
import AdminForms from './components/AdminForms';
import RegistrationPage from './pages/RegistrationPage';
import CourseListingPage from './pages/CourseListingPage';
import ProgramListingPage from './pages/ProgramListingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import coursesData from './components/courses.json'; 
import programsData from './components/programs.json';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [loggedInUser, setLoggedInUser] = useState(() => JSON.parse(localStorage.getItem('loggedInUser') || '{}'));
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [session, setSession] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState("Login");
  const [isGuest, setIsGuest] = useState(true);
  


  const [courses, setCourses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);

  

  useEffect(() => {
    setCourses(coursesData); 
    setPrograms(programsData);
 
    if (loggedInUser && Object.keys(loggedInUser).length > 0) {
      setIsAdmin(loggedInUser.isAdmin || false);
    }
  }, [loggedInUser]);

const handleLogout = () => {
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('selectedProgram');
  localStorage.removeItem('chosenCourses');
  setIsGuest(true);

  setLoggedInUser({});
  setIsAdmin(false);
  setSelectedProgram(null);
  setChosenCourses([]);
  setSession(false);
  setUserName('');
  setIsLoggedIn("Login");
};

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

  
  const programInfo = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(programInfo.program)
  // Check if the course belongs to the selected program and term
  // if (course.Program !== programInfo.program || course.Term !== programInfo.term) {
  //     alert(`You can only add courses from the ${programInfo.program} program for the ${programInfo.term} term.`);
  //     return;
  // }
     

  // Check if the maximum number of courses is reached or if the course is already added
  if (chosenCourses.length < 5 ) {
      const updatedCourses = [...chosenCourses, course];
      setChosenCourses(updatedCourses);
      localStorage.setItem('chosenCourses', JSON.stringify(updatedCourses));
      alert(`Course ${course.Course} added successfully!`);
  } else {
      alert("You cannot add this course.");
  }
};

const handleCourseDrop = (courseCode) => {
  // Ensure chosenCourses is not empty and properly initialized
  const updatedCourses = chosenCourses.filter(course => course.Code !== courseCode);

  // Set state with updated courses after filtering
  setChosenCourses(updatedCourses);

  // Save updated courses in localStorage
  localStorage.setItem('chosenCourses', JSON.stringify(updatedCourses));

  // Notify the user
  alert(`Course with code ${courseCode} dropped successfully!`);
};



const handleCourseAdd = (newCourse) => {
  setCourses((prevCourses) => [...prevCourses, newCourse]);
};

const handleCourseEdit = (id, updatedCourse) => {
  setCourses((prevCourses) =>
    prevCourses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
    )
  );
};

const handleCourseDelete = (id) => {
  setCourses((prevCourses) =>
    prevCourses.filter((course) => course.id !== id)
  );
};

  return (
  <div>
      <BrowserRouter>

      <Header logInName={isLoggedIn} selectedProgram={selectedProgram} onLogout={handleLogout} isLoggedIn={isLoggedIn} isGuest={isGuest}/>

      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path="/signup" element={<SignupPage 
                setUserName={setLoggedInUser}
                setSession={setSession}
                setIsAdmin={setIsAdmin}
                setIsLoggedIn={setIsLoggedIn}
                setIsGuest={setIsGuest}
               />}/> 
               
        <Route path='/studentdashboard' element={<StudentDashboardPage 
                            studentFirstName={loggedInUser.firstName} 
                            studentLastName={loggedInUser.lastName} 
                            studentEmail={loggedInUser.email}
                            chosenCourses={chosenCourses} 
                            selectedProgram={selectedProgram}
                            setLoggedInUser={setLoggedInUser} 
                            onProgramAdd={handleProgramAdd}
                            onCourseAdd={handleChosenCourses}
                            onCourseDrop={handleCourseDrop} />} />
        <Route path='/Registration' element={<RegistrationPage 
                            courses={courses} 
                            programs={programs} 
                            onCourseAdd={handleChosenCourses} 
                            onProgramAdd={handleProgramAdd}  />} />
        <Route path='/courselisting' element={<CourseListingPage 
                            courses={courses} 
                            onCourseAdd={handleChosenCourses}
                            selectedProgram={selectedProgram} />} />
                            <Route path='/programlisting' element={
                        <ProgramListingPage 
                            programs={programs} 
                            onProgramAdd={handleProgramAdd}
                            selectedProgram={selectedProgram} 
                        />} 
                    />

        <Route path='/admin' element={<AdminDashboardPage/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboardPage/>}/>
        <Route path='/admin/profile' element={<AdminProfile/>}/>
        <Route path="/admin/courses" element={<AdminCourseManagement courses={courses} onNewCourse={handleCourseAdd} onCourseEdit={handleCourseEdit} onCourseDelete={handleCourseDelete}/>}/>
        <Route path='/admin/students' element={<AdminStudentList/>}/>
        <Route path='/admin/forms' element={<AdminForms/>}/>



      </Routes>

      <Footer />
      
    </BrowserRouter>
  </div>
  );
}

export default App;
