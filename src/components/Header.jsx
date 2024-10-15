import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';

const Header = ({ selectedProgram }) => {
    const navigate = useNavigate();

    const handleCoursesClick = () => {
        if (!selectedProgram) {
            alert("You must select a program to view courses.");
            navigate("/programlisting"); 
        } else {
            navigate("/courselisting");
        }
    };

    return (
        <div>
            <div className="b-example-divider"></div>
            <header>
                <div className="px-3 py-2 bg-dark text-white">
                    <div className="container">
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                            <Link to="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                                <img className="bow-home-icon" src="https://cdn.prod.website-files.com/6475eb90c59d6bd3bc835d50/648b5df6bca32974dd79ac54_logo%2Bwhite-1.png" alt="Bow-Valley" />
                            </Link>
                            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                                <li>
                                    <Link to="/programlisting" className="nav-link text-white">
                                        Programs
                                    </Link>
                                </li>
                                <li>
                                    <button className="nav-link text-white bg-transparent border-0" onClick={handleCoursesClick}>
                                        Courses
                                    </button>
                                </li>
                                <li>
                                    <Link to="/signup" className="nav-link text-white">
                                        Signup
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/studentdashboard" className="nav-link text-white">
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
