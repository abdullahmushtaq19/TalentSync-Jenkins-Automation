import { useState } from "react";
import { useLocation } from 'react-router-dom';
import './apply.css';

const ApplyForJob = () => {
  const location = useLocation();
  console.log('Location State:', location.state);
  const jobId = location.state?.jobId;
  console.log(jobId);

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLeter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('job_id', jobId);
    formData.append('firstName', fname);
    formData.append('lastName', lname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('positionApplied', position);
    formData.append('interviewDate', date);
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);

    formData.forEach((value, key) => {
      console.log(key, value);
    });

  fetch(`/api/jobs/apply`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Application submitted:', data);
        alert('Application successfully submitted!');
        // Reset the form
        setFname('');
        setLname('');
        setEmail('');
        setPhone('');
        setPosition('');
        setDate('');
        setResume(null);
        setCoverLeter('');
        document.getElementById('resume').value = '';
      })
      .catch((err) => {
        console.error('Error applying for the job:', err);
        alert('Error submitting application. Please try again.');
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="firstPortion">
        <div>
          <label id="first">First Name</label>
          <input type="text" placeholder="John" value={fname} onChange={(e) => setFname(e.target.value)} />
        </div>
        <div>
          <label id="last">Last Name</label>
          <input type="text" placeholder="Doe" value={lname} onChange={(e) => setLname(e.target.value)} />
        </div>
        <div>
          <label id="email">Email</label>
          <input type="email" placeholder="john12@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label id="phone">Phone</label>
          <input type="phone" placeholder="901892" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label id="position">Position Applied</label>
          <input type="text" placeholder="Software Engineer" value={position} onChange={(e) => setPosition(e.target.value)} />
        </div>
        <div>
          <label id="date">Preferred Interview Date</label>
          <input type="date" placeholder="MM-DD-YY" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>
      <div className="secondPortion">
        <div>
          <label id="cover">Cover Letter</label>
          <textarea value={coverLetter} onChange={(e) => setCoverLeter(e.target.value)} />
        </div>
        <div>
          <label id="res">Resume</label>
          <input id="resume" type="file" onChange={(e) => setResume(e.target.files[0])} />
        </div>
        <div>
          <button type="Submit">Apply</button>
        </div>
      </div>
    </form>
  );
};

export default ApplyForJob;
