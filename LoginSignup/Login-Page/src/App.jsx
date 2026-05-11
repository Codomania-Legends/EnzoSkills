 import './styles/App.css';
import LeftSection from './components/LeftSection';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="app">
      <div className="main-container">

        <LeftSection />
        <LoginForm />

        <div className="corner"></div>

      </div>
    </div>
  );
}

export default App;

