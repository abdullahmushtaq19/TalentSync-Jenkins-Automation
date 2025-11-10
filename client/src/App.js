import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import JobList from './JobList';
import Companies from './Companies'; 
import SalaryList from './Salaries'; 
import ApplyForJob from './JobApply';
import Login from './login';
import './header.css'

const App = () => (
  <Router>
    <div className='conatiner'>
      <div className='header'>
        <ul>
          <li><NavLink to="/jobs" className="custom-link-logo" activeClassName="active">JobSeeker</NavLink></li>
          <li><NavLink to="/jobs" className="custom-link" activeClassName="active">Jobs</NavLink></li>
          <li><NavLink to="/companies" className="custom-link" activeClassName="active">Companies</NavLink></li>
          <li><NavLink to="/salaries" className="custom-link" activeClassName="active">Salaries</NavLink></li>
          <li><NavLink to="/login" className="custom-link"activeClassName="active">login</NavLink></li>
        </ul>
        
      </div>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/salaries" element={<SalaryList />} />
        <Route path="/jobs/apply" element={<ApplyForJob/>}/>
        <Route path="/job/apply" element={<ApplyForJob />} />
        <Route path="/login" element={<Login/>}/>
        
      </Routes>
    </div>
  </Router>
);

export default App;
