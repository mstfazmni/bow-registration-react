import React, { useState } from 'react';
import ProgramCard from './ProgramCard'; 

const SearchProgramsComponent = ({ programs, onProgramAdd }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTerm, setSelectedTerm] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("");

    const terms = [...new Set(programs.map(program => program.Term))];

    const programNames = [...new Set(programs.map(program => program.Program))];


    const filteredPrograms = programs.filter(program => 
        (program.Program.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedTerm ? program.Term === selectedTerm : true) &&
        (selectedProgram ? program.Program === selectedProgram : true)     

    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search by Program Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select onChange={(e) => setSelectedTerm(e.target.value)} value={selectedTerm}>
                <option value="">Filter by Term</option>
                {terms.map(term => (
                    <option key={term} value={term}>{term}</option>
                ))}
            </select>

            <select onChange={(e) => setSelectedProgram(e.target.value)} value={selectedProgram}>
                <option value="">Filter by Program</option>
                {programNames.map(program => (
                    <option key={program} value={program}>{program}</option>
                ))}
            </select>

            <div>
            {filteredPrograms.length > 0 ? (
                    filteredPrograms.map(program => (
                        <ProgramCard 
                            key={program.Code} 
                            {...program} 
                            showAddButton 
                            onAdd={onProgramAdd}
                        />
                    ))
                ) : (
                    <p>No programs found</p> 
                )}
            </div>
        </div>
    );
};

export default SearchProgramsComponent;
