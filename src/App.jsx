import {  Routes, Route } from 'react-router-dom'
import ViewDetails from './components/ViewUserDetails/ViewUserDetails'
import UserDetails from './components/UserAddDetails/UserAddDetails'
import { createContext, useContext, useEffect, useState } from 'react';

export const context = createContext()

const App = () => {
  const [selectedUser, setSelectedUser] = useState();
  const contextValue = { selectedUser, setSelectedUser }

  return (
    <context.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<UserDetails />}></Route>
        <Route path="/view" element={<ViewDetails />}></Route>
      </Routes>
    </context.Provider>
  );
};
export default App;
