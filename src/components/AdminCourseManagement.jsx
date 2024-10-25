import React, { useState } from 'react';
import CourseCard from "../components/CourseCard";
import './AdminCourseManagement.css';

const AdminCourseManagement = ({courses, onCourseDelete, onNewCourse, onCourseEdit}) => {
    const [newCourse, setNewCourse] = useState({
        id: '',
        Programs: '',
        Terms: '',
        Descriptions: '',
        StartDate: '',
        EndDate: '',
        Fees: ''
    });

    const [isAddingCourse, setIsAddingCourse] = useState(false); // State to control visibility of the form
    const [editingCourseId, setEditingCourseId] = useState(null); // State for editing course

    const editHandler = (id) => {//Changes the current course card into a series of textboxes, which displays the previous information.
        //Pressing edit again will change the course to whatever was entered in the textboxes
        //Use a callback to refetch the data from the JSON, copy it to local storage, and have it update the courseconfig page in real time. 
        let course = courses.find(courseItem => courseItem.id === id);
        if (course) {
            setNewCourse(course);
            setEditingCourseId(id);
            setIsAddingCourse(true);
    }
    }

    const deleteHandler = (id) => {//Removes the course selected. Finds course in the JSON via id to then delete.
        //Use a callback to refetch the data from the JSON, copy it to local storage, and have it update the courseconfig page in real time.
        let course = courses.find(courseItem => courseItem.id === id);
        if (course) {
            onCourseDelete(id);
        }
    }

    // Handle form change
    const handleChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    };

    const saveCourseHandler = () => {//Takes the inputted data below and parses it into courses.json.
        //Use a callback to refetch the data from the JSON, copy it to local storage, and have it update the courseconfig page in real time.
        if (editingCourseId) {
            // If we are editing an existing course
            onCourseEdit(editingCourseId, newCourse);
        } else {
            // If we are adding a new course
            const courseExists = courses.find(courseItem => courseItem.id === newCourse.id);
            if (courseExists) {
                alert('A course with this ID already exists');
            } else {
                onNewCourse(newCourse);
            }
        }
        resetForm();
    };

    const resetForm = () => {
        setNewCourse({
            id: '',
            Programs: '',
            Terms: '',
            Descriptions: '',
            StartDate: '',
            EndDate: '',
            Fees: ''
        });
        setIsAddingCourse(false);
        setEditingCourseId(null);
    };

    return(
        <div className="course-list-page-container">
            <div className="course-list-header">
                <h1>Course Management</h1>
                <button className="btn-newCourse" onClick={() => setIsAddingCourse(true)}>Add Course</button>
            </div>
            {!isAddingCourse ? (
                <div className='course-card-list'>
                    {courses && courses.length > 0 ? (
                        courses.map((course) => (
                            <CourseCard
                            key={course.id}
                            id={course.id}
                            Programs={course.Programs}
                            Terms={course.Terms}
                            Descriptions={course.Descriptions}
                            StartDate={course.StartDate}
                            EndDate={course.EndDate}
                            Fees={course.Fees}
                            showEditButton={true}
                            showDeleteButton={true}
                            onEdit={() => editHandler(course.id)}
                            onDelete={() => deleteHandler(course.id)}
                            />
                        ))
                    ) : (
                        <p>No courses available.</p>
                    )}
                </div>
                ) : (
                    <div className="course-card">
                        <h2>{editingCourseId ? "Edit Course" : "Add New Course"}</h2>
                        <form id="addCourse" > 
                            <label htmlFor="id">Course ID: 
                                <input type="text" id="id" name="id" value={newCourse.id} onChange={handleChange} readOnly={editingCourseId !== null}/>
                            </label>
                            <label htmlFor="Programs">Program: 
                                <input type="text" id="Programs" name="Programs" value={newCourse.Programs} onChange={handleChange} />
                            </label>
                            <label htmlFor="Terms">Term: 
                                <input type="text" id="Terms" name="Terms" value={newCourse.Terms} onChange={handleChange} />
                            </label><br />
                            <label htmlFor="Descriptions">Description: 
                                <textarea id="Descriptions" name="Descriptions" value={newCourse.Descriptions} onChange={handleChange}></textarea>
                            </label>
                            <label htmlFor="StartDate">Start Date: 
                                <input type="date" id="StartDate" name="StartDate" value={newCourse.StartDate} onChange={handleChange} />
                            </label>
                            <label htmlFor="EndDate">End Date: 
                                <input type="date" id="EndDate" name="EndDate" value={newCourse.EndDate} onChange={handleChange} />
                            </label>
                            <label htmlFor="Fees">Fees: 
                                <input type="number" id="Fees" name="Fees" value={newCourse.Fees} onChange={handleChange} />
                            </label><br />
                            <br/>
                            <br/>
                        </form>
                        <button className='btn-newCourse' onClick={saveCourseHandler}>{editingCourseId ? "Save Changes" : "Save Course"}</button>
                        <button className='btn-cancel' onClick={resetForm}>Cancel</button>
                    </div>
                )}
            </div>
        );
}
export default AdminCourseManagement;