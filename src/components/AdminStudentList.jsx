import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminStudentList.css';
import { FaColumns} from 'react-icons/fa';


const AdminStudentList = () => {
    const [students, setStudents] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        firstName: 'All',
        lastName: 'All',
        email: 'All',
        phone: 'All',
        program: 'All',
        term: 'All',
    });

    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleColumns, setVisibleColumns] = useState({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        program: true,
        term: true,
    });
    
    // State to manage filter dropdown visibility
    const [dropdownState, setDropdownState] = useState({
        filterDropdownOpen: false,
        columnDropdownOpen: false,
    });

    const filterDropdownRef = useRef(null);
    const columnDropdownRef = useRef(null);

    // Close dropdowns if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filterDropdownRef.current && !filterDropdownRef.current.contains(event.target) &&
                columnDropdownRef.current && !columnDropdownRef.current.contains(event.target)
            ) {
                setDropdownState({ filterDropdownOpen: false, columnDropdownOpen: false });
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Parsing the users local storage for retrieving the students information
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("users"));
        let studentsData = [];
        for(let i = 0; i < data.length; i++){
            if(data[i].isAdmin === false){
                studentsData.push(data[i])
            }
        }
        setStudents(studentsData);
        setFilteredStudents(studentsData);
    }, []);

    // Handler to update filter options based on user selection
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => {
            const updatedOptions = {
                ...prevOptions,
                [name]: value,
            };
            applyRegularFilter(updatedOptions);
            return updatedOptions;
        });
    };

    // Function to apply regular filters to the student list
    const applyRegularFilter = () => {
        const filtered = students.filter(student => {
            return (
                (filterOptions.firstName === 'All' || student.firstname.toLowerCase()) &&
                (filterOptions.lastName === 'All' || student.lastname.toLowerCase().includes(filterOptions.lastName.toLowerCase())) &&
                (filterOptions.email === 'All' || student.email.toLowerCase().includes(filterOptions.email.toLowerCase())) &&
                (filterOptions.phone === 'All' || student.phone.includes(filterOptions.phone)) &&
                (filterOptions.program === 'All' || student.program.toLowerCase().includes(filterOptions.program.toLowerCase())) &&
                (filterOptions.term === 'All' || student.term.toLowerCase().includes(filterOptions.term.toLowerCase()))
            );
        });

        setFilteredStudents(filtered);
    };

    // Update the search
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Column visibility
    const toggleColumnVisibility = (column) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    // Function to toggle the filter dropdown visibility
    const toggleDropdown = (dropdownName) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [dropdownName]: !prevState[dropdownName],
        }));
    };

    return (
        <div className='student-list-container'>
            <div className='header'>
                <h2 className='title'>BVC Students</h2>
                <div className='search-bar'>
                    {/* Search Input */}
                    {/* <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="form-control"
                    /> */}
                    {/* Filter Dropdown */}
                    {/* Column Filter Dropdown */}
                    <div className='dropdown' ref={columnDropdownRef}>
                        <button className="btn btn-custom column-button" onClick={() => toggleDropdown('columnDropdownOpen')}>
                            <span>
                            <FaColumns />
                            </span>
                        </button>
                        {dropdownState.columnDropdownOpen && (
                            <div className="student-dropdown-menu show">
                            {/* Column Visibility Checkboxes */}
                                {Object.keys(visibleColumns).map((column) => (
                                    <div key={column} className="checkbox-container">
                                        <label>{column.charAt(0).toUpperCase() + column.slice(1)}</label>
                                        <input
                                            type="checkbox"
                                            checked={visibleColumns[column]}
                                            onChange={() => toggleColumnVisibility(column)}
                                            className="custom-checkbox"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className='table table-striped table-bordered student-table'>
                    <thead>
                        <tr>
                            {visibleColumns.firstName && <th>First Name</th>}
                            {visibleColumns.lastName && <th>Last Name</th>}
                            {visibleColumns.email && <th>Email</th>}
                            {visibleColumns.phone && <th>Phone</th>}
                            {visibleColumns.department && <th>Department</th>}
                            {visibleColumns.program && <th>Program</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.filter(student => {
                            // Filtering students based on search term
                            return (
                                student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                student.phone.includes(searchTerm) ||
                                student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                student.program.toLowerCase().includes(searchTerm.toLowerCase())
                            );
                        }).map((student) => (
                            <tr key={student.id}>
                                {visibleColumns.firstName && <td>{student.firstName}</td>}
                                {visibleColumns.lastName && <td>{student.lastName}</td>}
                                {visibleColumns.email && <td>{student.email}</td>}
                                {visibleColumns.phone && <td>{student.phone}</td>}
                                {visibleColumns.department && <td>{student.department}</td>}
                                {visibleColumns.program && <td>{student.program}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStudentList;