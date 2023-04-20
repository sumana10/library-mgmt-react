import logo from "./logo.svg";
import "./App.css";
import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import Login from "./components/core/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddBooks from "./components/librarian/AddBooks";
import ListBooks from "./components/librarian/ListBooks";
import UserContext from "./utils/UserContext";
import AddMembers from "./components/librarian/AddMembers";
import ListOfMembers from "./components/librarian/ListOfMembers";

import { useState } from "react";
import ListOfAvailableBooks from "./components/librarian/ListOfAvailableBooks";
import Payment from "./components/librarian/Payment";

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          <Route index element={<Login />} />
          <Route path="addbooks" element={<AddBooks />} />
          <Route path="listbooks" element={<ListBooks />} />
          <Route path="addmembers" element={<AddMembers />} />
          <Route path="listmembers" element={<ListOfMembers />} />
          <Route path="listofavailable" element={<ListOfAvailableBooks/>} />
          <Route path="payment" element={<Payment/>} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
};

export default App;
