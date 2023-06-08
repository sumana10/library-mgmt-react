import "./App.css";
import { Header, Footer, Login } from "./components/core/";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { AddBooks, ListBooks, AddMembers, ListOfMembers, ListOfAvailableBooks, Payment, ListOfDamagedBooks } from "./components/librarian";

import { useState } from "react";
import UserContext from "./utils/UserContext";

import Cart from "./components/member/Cart";
import BorrowedList from "./components/member/BorrowedList";
import { Parent } from "./components/testComp/Parent";
import ReturnedBooks from "./components/member/ReturnedBooks";
import NotReturnedBooks from "./components/member/NotReturnedBooks";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
      <ToastContainer/>
        <Header />
        <Routes>
          <Route index element={<Login />} />
          <Route path="addbooks" element={<AddBooks />} />
          <Route path="listbooks" element={<ListBooks />}></Route>
          <Route path="listofdamaged" element={<ListOfDamagedBooks />} />
          <Route path="addmembers" element={<AddMembers />} />
          <Route path="listmembers" element={<ListOfMembers />} />
          <Route path="listofavailable" element={<ListOfAvailableBooks />} />
          <Route path="cart" element={<Cart />} />
          <Route path="borrowed" element={<BorrowedList />}></Route>
          <Route path="returnedbooks" element={<ReturnedBooks />} />
          <Route path="notreturnedbooks" element={<NotReturnedBooks />} />
          <Route path="payment" element={<Payment />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
      {/* <Outlet/> */}
    </Router>
  );
};

export default App;
