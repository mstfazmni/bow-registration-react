import React from "react";

const CourseCard = ({id,Programs,Terms,Descriptions, StartDate, EndDate, Fees, showDeleteButton, showAddButton, showEditButton, onDelete, onAdd, onEdit}) => {
    
    return(
        <div className="course-card">
            <p>id: {id}</p>
            <h2>{Programs}</h2>
                <p>Term: {Terms}</p>
                <p>Description: {Descriptions}</p>
                <p>Start Date: {StartDate}</p>
                <p>End Date: {EndDate}</p>
                <p>Fees: {Fees}</p>
                {showDeleteButton && <button className="btn-delete" onClick={onDelete}>Delete</button>}
                {showAddButton && <button className="btn-add" onClick={onAdd}>Add</button>}   
                {showEditButton && <button className="btn-edit" onClick={onEdit}>Edit</button>}  
        </div>
    );
};

export default CourseCard;