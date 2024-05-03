import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
function App() {
  return (
   <div className='App' >
    <Routes>
    <Route path='/' Component={Home}  />
    <Route path='/chats' Component={ChatPage}/>

    </Routes>
   </div>
  );
}

export default App;
