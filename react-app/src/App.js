import Sidebar from './components/Sidebar';
import Content from './Content';

function App() {

  const categories = [
    {
      name: 'Type',
      icon: 'bi-cast',
      options: [['All', true], ['Film', false], ['Series', false], ['Person', false]]
    },
    {
      name: 'Streaming Services',
      icon: 'bi-film',
      options: [['Netflix', true], ['Disney+', true], ['Amazon Prime', true], ['HBOMax', true]]
    },
    {
      name: 'Regions',
      icon: 'bi-globe',
      options: [['EU', true], ['US', true], ['AU', false], ['CA', false]]
    }
  ];

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
