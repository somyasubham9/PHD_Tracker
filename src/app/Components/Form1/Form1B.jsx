import React, { useState } from 'react';

const Form1B = () => {
  const [courses, setCourses] = useState([{
    subjectID: '',
    courseTitle: '',
    credits: '',
    remarks: ''
  }]);

  const handleAddCourse = () => {
    const newCourse = { subjectID: '', courseTitle: '', credits: '', remarks: '' };
    setCourses([...courses, newCourse]);
  };

  const handleRemoveCourse = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  const handleChange = (index, event) => {
    const newCourses = courses.map((course, idx) => {
      if (idx === index) {
        return { ...course, [event.target.name]: event.target.value };
      }
      return course;
    });
    setCourses(newCourses);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form className="bg-slate-100 p-8 shadow-md rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-700">COURSEWORK RECOMMENDED BY DSC FOR Ph.D. CANDIDATE</h2>
        
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
          <input type="text" id="department" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">Full name of the candidate:</label>
          <input type="text" id="candidateName" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number:</label>
          <input type="text" id="rollNumber" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="dateOfEnrollment" className="block text-sm font-medium text-gray-700">Date of Enrolment/Admission:</label>
          <input type="date" id="dateOfEnrollment" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
        </div>

        <div>
          <label htmlFor="researchArea" className="block text-sm font-medium text-gray-700">Broad area of research proposed:</label>
          <textarea id="researchArea" className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" rows="4"></textarea>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-gray-700">Category of studentship:</legend>
          <div className="mt-2 space-y-2">
            {["Institute Fellowship", "UGC/CSIR Fellowship", "Sponsored/Self-financed (Full time)", "Sponsored/Self-financed (Part time)", "Institute Faculty Members"].map((item, idx) => (
              <div key={idx}>
                <label className="inline-flex items-center">
                  <input type="radio" name="studentship" className="form-radio h-5 w-5 text-blue-600"/>
                  <span className="ml-2 text-gray-700">{item}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course work recommended (if any):</label>
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-6 gap-3 items-center mb-2">
              <input type="text" name="subjectID" placeholder="Subject-ID" value={course.subjectID} onChange={(e) => handleChange(index, e)} className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input type="text" name="courseTitle" placeholder="Course Title" value={course.courseTitle} onChange={(e) => handleChange(index, e)} className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input type="text" name="credits" placeholder="Credits" value={course.credits} onChange={(e) => handleChange(index, e)} className="col-span-1 p-2 border border-gray-300 rounded-md shadow-sm"/>
              <input type="text" name="remarks" placeholder="Remarks" value={course.remarks} onChange={(e) => handleChange(index, e)} className="col-span-2 p-2 border border-gray-300 rounded-md shadow-sm"/>
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveCourse(index)} className="ml-2 bg-red-500 text-white p-1 rounded">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddCourse} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Add Course</button>
        </div>

        <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form1B;
