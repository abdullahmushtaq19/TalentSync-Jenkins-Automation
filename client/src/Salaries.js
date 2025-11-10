import React, { useEffect, useState } from 'react';
import './salary.css';

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [jobtitle, setJobtitle] = useState('');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
    fetch(`/api/salaries`)
      .then(res => {
        if (!res.ok) throw new Error(`API error ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        setSalaries(data);
        setLoading(false); 
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Error fetching data'); 
        setLoading(false); 
      });
  }, []);

  const handleSearch = () => {
    setLoading(true); 
    fetch(`/api/salaries?job_title=${jobtitle}`)
      .then(res => {
        if (!res.ok) throw new Error(`API error ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        setSalaries(data);
        setLoading(false); 
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Error fetching data'); 
        setLoading(false); 
      });
  };

  return (
    <div>
      <div className='top_back'>
        <div className='top'>
          <h1>Are you paid fairly? Find out</h1>
          <input
            type='text'
            placeholder='Enter the job title'
            value={jobtitle}
            onChange={(e) => setJobtitle(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {loading && <p>Loading...</p>} 
      {error && <p>{error}</p>} 
      <h2>Salary Listings</h2>

      {salaries.length === 0 && !loading && !error ? (
        <p>No results found.</p> 
      ) : (
        <div className="salary-container">
          {salaries.map((salary) => (
            <div className="salary-box" key={salary._id}>
              <h3>{salary.EmployeeName}</h3>
              <p>Job Title: {salary.JobTitle}</p>
              <p>Base Pay: {salary.BasePay}</p>
              <p>Overtime Pay: {salary.OvertimePay}</p>
              <p>Other Pay: {salary.OtherPay}</p>
              <p>Total Pay: {salary.TotalPay}</p>
              <p>Total Pay with Benefits: {salary.TotalPayBenefits}</p>
              <p>Year: {salary.Year}</p>
              <p>Agency: {salary.Agency}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalaryList;
