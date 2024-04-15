import React, { useState, useEffect } from 'react';
import api from './api';

import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
  

  const handleFilter = (category, option) => {
    console.log(`Filtering ${category}: ${option}`);
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
          <Sidebar categories={categories} onFilter={handleFilter} />
          <div className="col py-3">
            <Content/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
