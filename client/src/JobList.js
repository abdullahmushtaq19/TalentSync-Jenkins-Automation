import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './jobList.css';


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchJob,setSearchJob]=useState('');
  const [searchLocation,setSearchLocation]=useState('');

  useEffect(() => {
  fetch(`/api/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  const navigate = useNavigate();
  const handleApply = () => {
    navigate('/job/apply',{ state: { jobId: selectedJob._id } }); 
  };


  const handleSearch = () => {
    if (!searchJob && !searchLocation) {
      alert('Please enter a job title or location to search.');
      return;
    }
  fetch(`/api/jobs?job_name=${searchJob}&location=${searchLocation}`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  };

  return (
    <>
    <div className='Search'>
        <input type='text' placeholder='Find your perfect Job' value={searchJob} onChange={(e)=>{setSearchJob(e.target.value)}}></input>
        <input type='text' id='location' placeholder='Location' value={searchLocation} onChange={(e)=>setSearchLocation(e.target.value)}></input>
        <button onClick={handleSearch}>Search</button>
    </div>
    <div className="job-container">
      <div className="job-list">
        {jobs.map((job) => (
          <div className="job-card" key={job._id} onClick={() => setSelectedJob(job)}>
            <p>{job["Company Name"]}</p>
            <h3>{job["Job Title"]}</h3>
            <p>{job["Salary Estimate"]}</p>
            <p>{job.Location}</p>
          </div>
        ))}
      </div>
      <div className="job-details">
        {selectedJob ? (
          <>
            <h2>{selectedJob["Job Title"]}</h2>
            <p><strong>Company:</strong> {selectedJob["Company Name"]}</p>
            <p><strong>Salary Estimate:</strong> {selectedJob["Salary Estimate"]}</p>
            <p><strong>Location:</strong> {selectedJob.Location}</p>
            <p><strong>Job Description:</strong> {selectedJob["Job Description"]}</p>
            <p><strong>Rating:</strong> {selectedJob.Rating}</p>
            <p><strong>Industry:</strong> {selectedJob.Industry}</p>
            <p><strong>Founded:</strong> {selectedJob.Founded}</p>
            <button onClick={handleApply}>Apply</button>
          </>
        ) : (
          <p>Select a job to view details</p>
        )}
      </div>
    </div>
    </>
  );
};

export default JobList;
