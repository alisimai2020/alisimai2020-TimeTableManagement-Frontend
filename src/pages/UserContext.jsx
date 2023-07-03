import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [roleName, setRoleName] = useState('');

  const setContextUsername = (username) => {
    setUsername(username);
  };

  return (
    <UserContext.Provider value={{ username, setContextUsername, roleName, setRoleName }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;





// React Context is a feature in React that provides a way to pass data through the 
// component tree without having to pass props manually at every level. 
// It allows you to share data between components that are not directly connected through the component hierarchy.

// Context consists of two main parts: the Context object and the Context Provider.

// Context Object: The Context object is created using the createContext function from the react package.
//  It returns an object with a Provider and a Consumer.

// Context Provider: The Provider component is used to wrap the part of the component tree where you want to share the data. 
// It accepts a value prop which represents the data you want to share.

// Context Consumer: The Consumer component is used to access the shared data within a component. 
// It uses a render prop pattern where the Consumer component provides a function as its child, and
//  that function receives the shared data as its argument.

