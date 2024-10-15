import React, { useEffect,useState } from 'react';
import CourseCard from "../components/CourseCard";
import './CourseConfigPage.css';

const CourseConfigPage = ({courses, onCourseDelete, onNewCourse, onCourseEdit}) => {


    const editHandler = (id) => {//Changes the current course card into a series of textboxes, which displays the previous information.
        //Pressing edit again will change the course to whatever was entered in the textboxes
        //Use a callback to refetch the data from the JSON, copy it to local storage, and have it update the courseconfig page in real time. 
        let course = courses.find(courseItem => courseItem.id === id);
        if (course) {
            
        }
    }

    const deleteHandler = (id) => {//Removes the course selected. Finds course in the JSON via id to then delete.
        //Use a callback to refetch the data from the JSON, copy it to local storage, and have it update the courseconfig page in real time.
        let course = courses.find(courseItem => courseItem.id === id);
        if (course) {
            
        }
    }
    
    const newCourseHandler = () => { //Takes the inputted data below and parses it into courses.json.
        //Use a callback to refetch the data from the JSON, copy it to local storage, and have it update the courseconfig page in real time.
        let newCourse = document.getElementById("addCourse");
        if (newCourse){
            let course = courses.find(courseItem => courseItem.id === newCourse["courseID"]);
            
            if (course) {
                alert("A course with this ID already exists")
            }

            else {

            }
        }
        
        
        
    }

    return(
            <div className="course-list-page-container">
                <div className='course-card-list'>
                        {courses.map((course) => (
                            <CourseCard
                            key = {course.id}
                            id = {course.id}
                            Programs = {course.Programs}
                            Terms = {course.Terms}
                            Descriptions = {course.Descriptions}
                            StartDate={course.StartDate} 
                            EndDate={course.EndDate} 
                            Fees={course.Fees}
                            showDeleteButton={true}
                            showEditButton={true}
                            onDelete={() => deleteHandler(course.id)}
                            onEdit={() => editHandler(course.id)}
                            />
                        ))
                        }
                        <div className="course-card">
                        <form id="addCourse" > 
                            <label htmlFor="courseID">Course ID: <input type="text" id="courseID" name="courseID"/></label>
                            <label htmlFor="program">Program: <input type="text" id="program" name="program"/></label>
                            <label htmlFor="term">Term: <input type="text" id="term" name="term"/></label><br/>
                            <label htmlFor="description">Description: <br/> <textarea id="description" name="description"></textarea></label>
                            <label htmlFor="startDate">Start Date: <input type="text" id="startDate" name="startDate"/></label>
                            <label htmlFor="endDate">End Date: <input type="text" id="endDate" name="endDate"/></label>
                            <label htmlFor="fees">Fees: <input type="text" id="fees" name="fees"/></label> <br/>
                        </form>
                        <button className='btn-newCourse' onClick={newCourseHandler()}>Add Course</button>
                        </div>
                </div>
            </div>
    );
}
export default CourseConfigPage;