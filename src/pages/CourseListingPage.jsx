import React from 'react';
import SearchCoursesComponent from '../components/SearchCoursesComponent';
import './CourseListingPage.css';

const CourseListingPage = ({ courses, onCourseAdd }) => {
    return (
        <div >
            <h1 className='courseH1'>Courses</h1>
            <SearchCoursesComponent courses={courses} onCourseAdd={onCourseAdd} />
        </div>
    );
};

export default CourseListingPage;
