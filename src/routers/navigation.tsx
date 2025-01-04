import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../pages/login/login';
import Registration from '../pages/registration/registration';
import Chat from '../pages/chat/chat';
import PrivatePage from '../pages/privatePage/privatePage';


const Navigation: React.FC = () => {
  return (
    <Routes >

      <Route path='/' element={
        <PrivatePage>
          {/* <LogInPage /> */}
          <Home />
        </PrivatePage>
      } />
      <Route path='/home' element={<PrivatePage>
        <Home />
      </PrivatePage>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Registration />} />
      <Route path='/chat' element={
        <PrivatePage>
          <Chat />
        </PrivatePage>
      } />
    </Routes>
  );
};
export default Navigation;
