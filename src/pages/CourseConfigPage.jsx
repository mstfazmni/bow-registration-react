import React, { useState, useRef} from 'react';
import CourseCard from "../components/CourseCard";
import './CourseConfigPage.css';
import { Link } from 'react-router-dom';

const CourseConfigPage = ({courses, onCourseDelete, onNewCourse, onCourseEdit}) => {

    const [courseID, setCourseID] = useState(0)
    const [program, setProgram] = useState('')
    const [term, setTerm] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStartDate] = useState('')
    const [end, setEndDate] = useState('')
    const [fees, setfees] = useState('')
    const [error, errorHandle] = useState('')
    const [buttonVisible, visibleToggle] = useState(true)

    const[editCourse, modify] = useState({})
    const ref = useRef(null)
    const scrolldown = useRef(null)
   
    const editHandler = (course) => {//Changes the current course card into a series of textboxes, which displays the previous information.
        //Pressing edit again will change the course to whatever was entered in the textboxes
        //Use a callback to refetch the data from the JSON, copy it to local storage, and have it update the courseconfig page in real time. 
            visibleToggle(false)
            setCourseID(course.id)
            setProgram(course.Programs)
            setTerm(course.Terms)
            setDescription(course.Descriptions)
            setStartDate(course.StartDate)
            setEndDate(course.EndDate)
            setfees(course.Fees)
            modify(course)
            console.log(editCourse)
            ref.current.scrollIntoView()
    }

    const editDone = () =>{
        if ( courseID &&
            program &&
            term &&
            description &&
            start &&
            end &&
            fees)
            {
                const newEntry = {id: Number(courseID),
                    Programs: program,
                    Terms: term,
                    Descriptions: description,
                    StartDate: start,
                    EndDate: end,
                    Fees: fees} 
                modify(newEntry)
                onCourseEdit(newEntry)
                errorHandle('')
                visibleToggle(true)
                scrolldown.current.scrollIntoView()
            }
            else{errorHandle("Error: Form cannot have empty values")}
    }
    const deleteHandler = (id) => {//Removes the course selected. 
        let course = courses.find(courseItem => courseItem.id === id);
        if (course) {
            onCourseDelete(id)
        }
    }
    
    const newCourseHandler = () => { //Takes the inputted data below and currently appends it onto the courses array in App.js
        if ( courseID &&
            program &&
            term &&
            description &&
            start &&
            end &&
            fees)
            {
                const newEntry = {id: Number(courseID),
                    Programs: program,
                    Terms: term,
                    Descriptions: description,
                    StartDate: start,
                    EndDate: end,
                    Fees: fees} 
                let course = courses.find(courseItem => courseItem.id === newEntry.id);
                if (course) {
                 errorHandle("Error: A course with this ID already exists")
                }
                else if (newEntry.id > 0 && !isNaN(newEntry.id)){
                    onNewCourse(newEntry)
                    errorHandle('')
                }
             else{errorHandle("Error: Invalid ID")}
            }
            else{errorHandle("Error: Form cannot have empty values")}
    }
    

    return(
        
            <div ref={ref} className="course-list-page-container">
                <Link to='/admindashboard'>
                 <button className='btn-back'>Back</button>
                </Link>
                <div className='course-card-list'>
                    {editCourse && ( 
                        <div className='course-card' hidden={buttonVisible}>
                            <form id="addCourse"> 
                            <label htmlFor="courseID">Course ID: {editCourse.id}</label> <br/>
                            <label htmlFor="program">Program: {editCourse.Programs}</label> <br/>
                            <label htmlFor="term">Term: <input  type="text" id="term" name="term" defaultValue={editCourse.Terms} onChange={(c) => setTerm(c.target.value)}/></label><br/>
                            <label htmlFor="description">Description: <br/> <textarea id="description" name="description" defaultValue={editCourse.Descriptions} onChange={(c) => setDescription(c.target.value)}></textarea></label>
                            <label htmlFor="startDate">Start Date: <input type="text" id="startDate" name="startDate" defaultValue={editCourse.StartDate} onChange={(c) => setStartDate(c.target.value)}/></label>
                            <label htmlFor="endDate">End Date: <input type="text" id="endDate" name="endDate" defaultValue={editCourse.EndDate} onChange={(c) => setEndDate(c.target.value)}/></label>
                            <label htmlFor="fees">Fees: <input type="text" id="fees" name="fees" defaultValue={editCourse.Fees} onChange={(c) => setfees(c.target.value)}/></label> <br/>
                            </form>
                            <button className='btn-newCourse' onClick={editDone}>Edit Course</button>
                            {error && (
                            <p className="error"> {error} </p>
                            )}
                        </div>
                        )}
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
                            showDeleteButton={buttonVisible}
                            showEditButton={buttonVisible}
                            onDelete={() => deleteHandler(course.id)}
                            onEdit={() => editHandler(course)}
                            />
                        ))
                        }
                        <div className="course-card" hidden={!buttonVisible}>
                        <form id="addCourse" > 
                            <label htmlFor="courseID">Course ID: <input type="text" id="courseID" name="courseID" onChange={(c) => setCourseID(c.target.value)}/></label>
                            <label htmlFor="program">Program: <input type="text" id="program" name="program" onChange={(c) => setProgram(c.target.value)}/></label>
                            <label htmlFor="term">Term: <input type="text" id="term" name="term" onChange={(c) => setTerm(c.target.value)}/></label><br/>
                            <label htmlFor="description">Description: <br/> <textarea id="description" name="description" onChange={(c) => setDescription(c.target.value)}></textarea></label>
                            <label htmlFor="startDate">Start Date: <input type="text" id="startDate" name="startDate" onChange={(c) => setStartDate(c.target.value)}/></label>
                            <label htmlFor="endDate">End Date: <input type="text" id="endDate" name="endDate" onChange={(c) => setEndDate(c.target.value)}/></label>
                            <label htmlFor="fees">Fees: <input type="text" id="fees" name="fees" onChange={(c) => setfees(c.target.value)}/></label> <br/>
                        </form>
                        {buttonVisible && <button className='btn-newCourse' onClick={newCourseHandler} >Add Course</button>}
                        {error && (
                         <p ref={scrolldown} className="error"> {error} </p>
                        )}
                        </div>
                        
                        
                    
                </div>
                <Link to='/admindashboard'>
                <button ref={scrolldown} className='btn-back'>Back</button>
                </Link>
            </div>
    );
}

export default CourseConfigPage;