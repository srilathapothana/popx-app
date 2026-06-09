import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

// Simulated in-memory "database" of accounts
let accountsDB = [];

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in

  const registerAccount = (data) => {
    // Check duplicate email
    if (accountsDB.find(a => a.email === data.email)) {
      throw new Error('An account with this email already exists.');
    }
    const account = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      password: data.password,
    };
    accountsDB.push(account);
    setUser(account);
  };

  const loginWithCredentials = (email, password) => {
    const match = accountsDB.find(
      a => a.email === email && a.password === password
    );
    if (!match) return false;
    setUser(match);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, registerAccount, loginWithCredentials, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
