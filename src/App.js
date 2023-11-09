import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
//QueryClient()는 라이브러리의 쿼리 변경에 대한 기본 설정

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>

        <AuthContextProvider>
          <GlobalStyle/>
          <Nav/>
          <Outlet/>
        </AuthContextProvider>
        
      </QueryClientProvider>
    </>
  );
}

export default App;
