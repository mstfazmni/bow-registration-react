import React, { useState } from 'react';
import studentImg from '../assets/student.jpg';
import adminImg from '../assets/admin.jpg';
import './SignupPage.css'
import { useNavigate } from 'react-router-dom';

const SignupPage = ({setUserName, setSession, setIsAdmin, setIsLoggedIn, setIsGuest}) => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [user, setUser] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    //registration el
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [studentId, setStudentId] = useState("");
    const [isAdmin, setIsadmin] = useState(false);
    const [program, setProgram] = useState(0);
    const [term, setTerm] = useState("");
    

    function student(){
      return(
        <div className='lContainer'>
          <div className='sContainer'>
            <div className="imageContainer">
              <img src={studentImg} alt="student" />
            </div>
            <div className="studentInfo">
              <div className="head">
                <h3>Student Login</h3>
                <p>Hello enter your details to sign In!</p>
              </div>
              <div className="userName">
                <input type="text" placeholder='Enter your username/email' onChange={(e)=>{
                  setName(e.target.value);
                }}/>
              </div>
              <div className="password">
                <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>{
                  setPassword(e.target.value)}}/>
              </div>
              <div className="logInBtn">
                <button onClick={studentLoginBtnFunc}>Login</button>
              </div>
              <div className='register'>
                <p>Don't have an account? <button onClick={()=>{setIsRegistering(true)}}> Sign up now</button></p>
              </div>
            </div>
          </div>
        
        </div>
      )
    }

    function admin(){
      return(
        <div className='lContainer'>
          <div className='sContainer'>
            <div className="imageContainer">
              <img src={adminImg} alt="student" />
            </div>
            <div className="studentInfo">
              <div className="head">
                <h3>Admin Login</h3>
                <p>Hello enter your details to sign In!</p>
              </div>
              <div className="userName">
                <input type="text" placeholder='Enter your username/email' onChange={(e)=>{
                  setName(e.target.value);
                }}/>
              </div>
              <div className="password">
                <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>{
                  setPassword(e.target.value)}}/>
              </div>
              <div className="logInBtn">
                <button onClick={adminLoginBtnFunc}>Login</button>
              </div>
              <div className='register'>
                <p>Don't have an account? <button onClick={()=>{setIsRegistering(true)}}> Sign up now</button></p>
              </div>
            </div>
          </div>
        
        </div>
      )
    }

    function register(){
      return(
        <div className="rContainer">
          <div className="rsContainer">
            <h3>
              Registration
            </h3>
            <div className="studentFirstName">
              <p>First Name</p>
              <input type="text"  placeholder='first name' onChange={(e)=>{setFirstName(e.target.value)}}/>
            </div>
            <div className="studentLastName">
              <p>Last Name</p>
              <input type="text"  placeholder='last name' onChange={(e)=>{setLastName(e.target.value)}}/>
            </div>
            <div className="studentEmail">
              <p>Email</p>
              <input type="email" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="studentPassword">
              <p>Password</p>
              <input type="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="studentPhone">
              <p>Phone Number</p>
              <input type="number" placeholder='phone' onChange={(e)=>{setPhone(e.target.value)}}/>
            </div>
            <div className="program">
              <input type="text" placeholder='Software Developmnet' readOnly/>
            </div>

            {/* program info */}
            <div className="programType">
              <select 
                name="programType" 
                id="programType" 
                value={program} // Set the selected value
                onChange={(e) => setProgram(e.target.value)} // Update state on change
              >
                <option value="default">Program Type</option>
                <option value="Diploma (2 years)">Diploma (2 years)</option>
                <option value="Post-Diploma (1 year)">Post-Diploma (1 year)</option>
                <option value="Certificate (6 months)">Certificate (6 months)</option>
              </select>
            </div>

    
            <div className="term">
              <select 
                name="term" 
                id="term"
                value={term} // Set the selected value
                onChange={(e) => setTerm(e.target.value)} // Update state on change
              >
                <option value="default">Select Term</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
              </select>
            </div>
            <div className="studentId">
              <p>Student ID / Admin ID</p>
              <input type="number" placeholder='student ID' onChange={(e)=>{setStudentId(e.target.value)}}/>
              <br />
              <input type="checkbox" onChange={handleCheckboxChange} checked={isAdmin}/><p>Are you admin?</p>
            </div>
            <div className="logBtn">
              <button onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      )
    }

    const handleCheckboxChange = (event) => {
      setIsadmin(event.target.checked); 
    }

    const adminLoginBtnFunc = async () => {
      try {
        // Get the list of users from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        // Find the user that matches the entered username and password
        const user = users.find(
          (user) => user.email === name && user.password === password
        );
    
        if (!user) {
          // If no matching user is found
          alert('Invalid username or password');
          return;
        }
    
        // Check if the user is an admin
        if (user.isAdmin) {
          // Save session
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          alert('Admin login successful');
          setIsAdmin(true);
          setSession("Logout");
          setIsLoggedIn("Logout")
          setIsGuest(false);
          navigate('/admin');

      } else {
          alert('Please use the student portal to log in');
      }
  } catch (error) {
      console.error('Error logging in:', error);
  }
};

    const studentLoginBtnFunc = async () => {
      try {
        // Get the list of users from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        // Find the user that matches the entered username and password
        const user = users.find(
          (user) => user.email === name && user.password === password
        );
    
        if (!user) {
          // If no matching user is found
          alert('Invalid username or password');
          return;
        }
    
        // Check if the user is an admin or a student
        if (!user.isAdmin) {
          // Save session
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          localStorage.setItem('loggedInEmail', user.email);
          localStorage.setItem('loggedInFirstName', user.firstname);
          localStorage.setItem('loggedInLastName', user.lastname);
          setSession("Logout");
          setIsAdmin(false);
        setFirstName(user.firstname);
        setLastName(user.lastname);
        setEmail(user.email);
        setIsLoggedIn("Logout")
          alert('Student login successful');
          setIsGuest(false);
          navigate('/studentdashboard');
      } else {
          alert('Please use the admin portal to log in');
      }
  } catch (error) {
      console.error('Error logging in:', error);
  }
};
    const handleRegister = () => {
    
      const newUser = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        phone: phone,
        studentId: studentId,
        isAdmin: isAdmin,
        program: program,
        term: term,
      };
    
      let users = JSON.parse(localStorage.getItem('users')) || [];

      if (!Array.isArray(users)) {
        users = [];
    }
      users.push(newUser);
    
      
      localStorage.setItem('users', JSON.stringify(users));

      localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    
    setUserName(`${firstName} ${lastName}`);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setIsAdmin(isAdmin);
    setSession('Logout');
    setIsLoggedIn("Logout")


      alert('Registration successful');
      
      if (isAdmin) {
        navigate('/admin');
        setIsGuest(false);
      } else {
        navigate('/studentdashboard');
        setIsGuest(false);
      }
    };
    



    function changeUser(){
        setUser((prevUser) => !prevUser);
    }

    return (
      <div>
        {isRegistering ? (
          register()
        ) : (
          <>
            {user ? admin() : student()}
            <div className="userStateBtn">
              <button className='userBtn' onClick={changeUser}>
                {user ? 'Are you the student?' : 'Are you the admin?'}
              </button>
            </div>
          </>
        )}
      </div>
    );

}

export default SignupPage;
