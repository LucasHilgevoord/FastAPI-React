import React, { useState, useEffect } from 'react';
import api from './api';

import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {
  const [filters, setfilters] = useState([]);

  useEffect(() => {
    const fetchfilters = async () => {
      try {
        const response = await api.get('/filters/');
        setfilters(response.data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
  
    fetchfilters();
  }, []);
  

  const handleFilter = (filter, option) => {
    console.log(`Filtering ${filter}: ${option}`);
  };

  return (
    <div className="App">
      <nav className='navbar navbar-light bg-light shadow-sm'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            <img src="assets/img/logo-no-text.png" alt="logo" height="40" />
          </a>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar filters={filters} onFilter={handleFilter} />
          <div className="col py-3">
            <Content/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
