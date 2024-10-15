import React from 'react';

const CourseCard = ({ Code, Course, Program, Term, StartDate, EndDate, onAdd, Description}) => {
    return (
        <div className="course-card">
            <h2>{Course}</h2>
            <p>Program: {Program}</p>
            <p>Term: {Term}</p>
            <p>Start Date: {StartDate}</p>
            <p>End Date: {EndDate}</p>
            <p>Description: {Description}</p>
            <button onClick={() => onAdd({ Code, Course, Program, Term, StartDate, EndDate, Description})}>Add</button>
        </div>
    );
};

export default CourseCard;
