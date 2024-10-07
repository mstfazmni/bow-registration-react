import React from "react";
import CourseCard from "../components/CourseCard";
import './CourseListingPage.css';

const CourseListingPage = ({courses}) => {

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
                            />
                        ))
                        }
                </div>
            </div>
    );
}
export default CourseListingPage;