import React from "react";
import  {useEffect,useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ logInName, selectedProgram, onLogout, isLoggedIn , isGuest}) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCoursesClick = () => {
        navigate("/courselisting");
    };

    const handleLogout = () => {
        if(logInName){
        onLogout();
        }
        else{
            navigate("/signup");  
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const isAdminPage = location.pathname.startsWith('/admin');

    //Close dropdown when route changes
    useEffect(() => {
        setDropdownOpen(false);
    }, [location]);

    return (
        <div>
            <div className="b-example-divider"></div>
            <header>
                <div className="px-3 py-2 bg-dark text-white">
                    <div className="container">
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                            <Link to="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
                            >
                                <img className="bow-home-icon" src="https://cdn.prod.website-files.com/6475eb90c59d6bd3bc835d50/648b5df6bca32974dd79ac54_logo%2Bwhite-1.png" alt="Bow-Valley" />
                            </Link>                                
                            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                                {isGuest && <li>
                                    <Link to="/programlisting" className="nav-link text-white">
                                        Programs
                                    </Link>
                                </li>
                                }
                                { !isGuest &&
                                <li>
                                    <button className="nav-link text-white bg-transparent border-0" onClick={handleCoursesClick}>
                                        Courses
                                    </button>
                                </li>
                                }
                                <li>
                                <Link to="/signup" className="nav-link text-white" onClick={handleLogout}>
                                        {logInName}
                                    </Link>
                                 </li>
                                 { !isAdminPage && !isGuest &&<li>
                                    <Link to="/studentdashboard" className="nav-link text-white">
                                        Dashboard
                                    </Link>
                                
                                </li>
                                }                     
                                        
                                {/* Admin Account Dropdown */}
                                {isAdminPage && (
                                    <li className="nav-item dropdown">
                                        <div 
                                            className="profile-icon" 
                                            onClick={toggleDropdown} 
                                            style={{ 
                                                cursor: 'pointer', fontSize: '15px', padding: '10px 10px', backgroundColor: 'none', color: 'white' }}>
                                            <span className="material-icons text-white">account_circle</span>
                                        </div>
                                                
                                        <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/admin">
                                                <span className="material-icons dropdown-icon">dashboard</span>
                                                Dashboard</Link>
                                            <Link className="dropdown-item" to="/admin/profile">
                                                <span className="material-icons dropdown-icon">person</span> 
                                                Profile</Link>
                                            <Link className="dropdown-item" to="/admin/courses">
                                                <span className="material-icons dropdown-icon">school</span>
                                                Courses</Link>
                                            <Link className="dropdown-item" to="/admin/students">
                                                <span className="material-icons dropdown-icon">groups</span> 
                                                Student List</Link>
                                            <Link className="dropdown-item" to="/admin/forms">
                                                <span className="material-icons dropdown-icon">description</span> 
                                                Forms</Link>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>   
            </header>
        </div>
    );
};

export default Header;