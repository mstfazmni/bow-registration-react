import React from 'react';

const ProgramCard = ({ Code, Program, Term,Department, Description, Fees, StartDate, EndDate, onAdd }) => {
    return (
        <div className="program-card">
            <h2>{Program}</h2>
            <p>Code: {Code}</p>
            <p>Department: {Department}</p>
            <p>Term: {Term}</p>
            <p>Description: {Description}</p>
            <p>Start Date: {StartDate}</p>
            <p>End Date: {EndDate}</p>
            <p>Fees: ${Fees}</p>
            <button onClick={() => onAdd({ Code, Program, Department, Term, Description, StartDate, EndDate, Fees })}>Add</button>
        </div>
    );
};

export default ProgramCard;
