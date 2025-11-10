import React, { useEffect, useState } from 'react';
import './company.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');

  useEffect(() => {
  fetch(`/api/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error('Error fetching companies:', err));
  }, []);

  const handleQuery = () => {
    if (!searchQuery.trim()) {
      alert('Please enter the company name');
      return;
    }
  fetch(`/api/companies?company_name=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setSearchResult(data))
      .catch((err) => console.error('Error searching companies:', err));
  };


  const handleFilter = () => {
    let filteredCompanies = companies;
    if (companyName) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.company_name && company.company_name.toLowerCase().includes(companyName.toLowerCase()) 
      );
    }
    if (location) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.country && company.country.toLowerCase().includes(location.toLowerCase()) 
      );
    }

    if (industry) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.industry && company.industry.toLowerCase().includes(industry.toLowerCase()) 
      );
    }
  
    
    setSearchResult(filteredCompanies);
  };
 
  const renderCompanies = searchResult.length > 0 ? searchResult : companies;
  return (
    <div className='container'>
      <img src="./firms.webp" alt="Architecture Firms in USA" />
      <div className='search_box'>
        <p>Have a company in mind</p>
        <input
          placeholder='Enter the company name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleQuery}>Search</button>
      </div>

      <div className='content'>
        <div className='filter'>
          <p><strong>Filter Companies</strong></p>
          <p><strong>1-10</strong> of <strong>{renderCompanies.length}</strong> Companies sorted by relevancy</p>

          <div>
            <label>Location</label>
            <input
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label>Company Name</label>
            <input
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label>Industry</label>
            <input
              placeholder="Enter industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <button onClick={handleFilter}>Apply Filters</button>
        </div>

        <div className='company'>
          <ul>
            {renderCompanies.length > 0 ? (
              renderCompanies.map((company) => (
                <div className='Acompany' key={company._id}>
                  <li>
                    <h3>{company.company_name}</h3>
                    <p>Valuation: {company.valuation}</p>
                    <p>Contact: {company.contact_info}</p>
                    <p>Country: {company.country}</p>
                    <p>Industry: {company.industry}</p>
                  </li>
                </div>
              ))
            ) : (
              <p>No results found. Try searching for another company.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
