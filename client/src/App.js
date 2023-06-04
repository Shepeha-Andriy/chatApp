import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './components/SetAvatar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/setAvatar' element={<SetAvatar></SetAvatar>}></Route>
        <Route path='/' element={<Chat></Chat>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
