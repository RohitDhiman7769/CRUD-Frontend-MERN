import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import ViewDetails from './components/ViewUserDetails/ViewUserDetails'
import UserDetails from './components/UserAddDetails/UserAddDetails'
import { createContext, useContext, useEffect, useState } from 'react';

function AppLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export const context = createContext()

const App = () => {
  const [selectedUser, setSelectedUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : {};
  });

  // Save to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(selectedUser));
    setSelectedUser(selectedUser)

  }, [selectedUser]);

  const contextValue = { selectedUser, setSelectedUser }
  console.log('contextValue : ',contextValue)
  const route = createBrowserRouter([
    {
      path: '/',
      element: <context.Provider value={contextValue}><AppLayout /></context.Provider>,
      children: [
        {
          path: '',
          element: <UserDetails />
        }, {
          path: '/view',
          element: <ViewDetails />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={route} />
  );
};

export default App;
