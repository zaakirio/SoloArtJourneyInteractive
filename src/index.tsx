import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <><Navbar onHomeClick={function (): void {
    throw new Error('Function not implemented.');
  } } onAboutClick={function (): void {
    throw new Error('Function not implemented.');
  } } onSignUpClick={function (): void {
    throw new Error('Function not implemented.');
  } } onRegisterClick={function (): void {
    throw new Error('Function not implemented.');
  } }></Navbar><App></App></>
);


