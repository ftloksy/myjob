import logo from './logo.svg';
import './App.css';

// FrontPage's routing and layout/
import JobAppLayout from './layout/JobAppLayout';
import Footer from './pages/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Maintenance Management System</h1>
        <JobAppLayout />
      </header>
      <Footer />
    </div>
  );
}

export default App;
