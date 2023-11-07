import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Nav/>
        <Outlet/>
      </AuthContextProvider>

    </>
  );
}

export default App;
