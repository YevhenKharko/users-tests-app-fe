import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignUpPage } from './components/SignUpPage/SignUpPage';
import { SingleTest } from './components/SingleTest/SingleTest';
import { SingleUserPage } from './components/SingleUserPage/SingleUserPage';
import { UsersPage } from './components/UsersPage/UsersPage';
import { Page404 } from './components/Page404/Page404';

import { getAllUsers } from './services/fetchClient';

import { User } from './types/User';
import { Test } from './types/Test';

import './App.css';
import 'bulma/css/bulma.min.css';

export const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTest, setCurrentTest] = useState<Test | null>(null);

  useEffect(() => {
    getAllUsers().then(data => setUsers(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage setCurrentUser={setCurrentUser}/>} />
        <Route path="/users" element={<UsersPage users={users} />} />
        <Route path="/users/:id/tests" element={<SingleUserPage user={currentUser} setCurrentTest={setCurrentTest}/>} />
        <Route path="/users/:id/tests/:testId" element={<SingleTest currentTest={currentTest}/>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
