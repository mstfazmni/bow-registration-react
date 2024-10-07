import React, {useEffect,useState} from "react";
import CourseCard from "../components/CourseCard";

const RegistrationPage = ({courses, onCourseAdd}) => {

    const addBtnHandler = (id) => {
        let course = courses.find(courseItem => courseItem.id === id);
        if (course) {
            onCourseAdd(course); // Call the parent's function with the selected course
        }
    }

    return(
        
            <div className="course-card-list">
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
                    showAddButton = {true}
                    onAdd = { () => addBtnHandler(course.id)}
                    />
                ))
                    }
            </div>
        
    )
}
export default RegistrationPage;