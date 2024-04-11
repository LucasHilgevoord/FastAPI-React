import React, {useState, useEffect} from 'react'
import api from './api'

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    is_enabled: false
  });

  const fetchItem = async () => {
    // Create a 'get' reponse
    const response = await api.get('/items/');

    // Set the reponse data
    setItems(response.data);
  }

  useEffect(() => {
    fetchItem();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/items/', formData);
    fetchItem();
    setFormData({
      name: '',
      amount: '',
      is_enabled: false
    });
  };

  return (
    <div className="App">
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Test App
          </a>
        </div>
      </nav>

      <div className='container'>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3 mt-3'>
            <label htmlFor='name' className='form-label'> 
              Name 
            </label>
            <input type='text' className='form-control' id='name' name='name' onChange={handleInputChange} value={formData.name}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='amount' className='form-label'> 
              Amount 
            </label>
            <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formData.amount}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='is_enabled' className='form-label'> 
              Is Enabled
            </label>
            <input type='checkbox' className='ms-2' id='is_enabled' name='is_enabled' onChange={handleInputChange} value={formData.amount}/>
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>

        <hr/>

        <table className='mt-3 table table-bordered table-striped table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Is Enabled?</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.is_enabled ? 'True' : 'False'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
