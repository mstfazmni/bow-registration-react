import React, { useState } from 'react';
import studentImg from '../assets/student.jpg';
import adminImg from '../assets/admin.jpg';
import './SignupPage.css'
import { useNavigate } from 'react-router-dom';
import header from '../components/Header.jsx';

const SignupPage = ({setUserName, setSession, setIsAdmin, setLoggedInUser}) => {

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
          alert('Admin login successful');
          navigate('/admin');
          setLoggedInUser("Logout");
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
        if (user.isAdmin) {
          alert('Please use the admin portal to log in');
          // Optionally, navigate to the admin portal
          // navigate('/adminportal');
        } else {
          alert('Student login successful');
          setLoggedInUser("Logout")
          navigate('/studentdashboard');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };
    

    const handleRegister = async () => {
      // Retrieve any existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
    
      // Create a new user object with the input values
      const newUser = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        phone: phone,
        studentId: studentId,
        isAdmin: isAdmin,
      };
    
    
      users.push(newUser);
    
      
      localStorage.setItem('users', JSON.stringify(users));
    
      alert('Registration successful');
      
      if (isAdmin) {
        navigate('/admin');
        setLoggedInUser("Logout")
      } else {
        navigate('/studentdashboard');
        setLoggedInUser("Logout")
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
