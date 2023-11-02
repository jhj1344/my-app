import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Nav/>
      <Outlet/>

    </>
  );
}

export default App;
