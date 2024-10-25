import React from "react";

const CourseCard = ({key,id,Programs,Terms,Descriptions, StartDate, EndDate, Fees, showEditButton, showDeleteButton, onEdit, onDelete,onAdd}) => {
    
    return(
        <div className="course-card">
            <h2>{Course}</h2>
            <p>Code: {Code}</p>
            <p>Program: {Program}</p>
            <p>Term: {Term}</p>
            <p>Start Date: {StartDate}</p>
            <p>End Date: {EndDate}</p>
            <p>Description: {Description}</p>
            {showDeleteButton && <button className="btn-delete" onClick={onDelete}>Delete</button>}
            {showAddButton && <button className="btn-add" onClick={onAdd}>Add</button>}        
        </div>
    );
};

export default CourseCard;