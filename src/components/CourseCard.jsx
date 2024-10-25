import React from 'react';

    

const CourseCard = ({key,id,Course,Code, Program, Term, Description, StartDate, EndDate, showEditButton, showDeleteButton, onEdit, onDelete, onAdd}) => {
    return (
        <div className="course-card">
            <h2>{Course}</h2>
            <p>Code: {Code}</p>
            <p>Program: {Program}</p>
            <p>Term: {Term}</p>
            <p>Start Date: {StartDate}</p>
            <p>End Date: {EndDate}</p>
            <p>Description: {Description}</p>
            {!showEditButton && <button onClick={() => onAdd({ Course,Code, Program , Term, StartDate, EndDate, Description})}>Add</button>}
            {showEditButton && <button className='btn-edit' onClick={onEdit}>Edit</button>}
            {showDeleteButton && <button className='btn-delete' onClick={onDelete}>Delete</button>}
        </div>
    );
};

export default CourseCard;
