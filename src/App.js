import logo from "./logo.svg";
import "./App.css";
import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import Login from "./components/core/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import AddBooks from "./components/librarian/AddBooks";
import ListBooks from "./components/librarian/ListBooks";
import UserContext from "./utils/UserContext";
import AddMembers from "./components/librarian/AddMembers";
import ListOfMembers from "./components/librarian/ListOfMembers";

import { useState } from "react";
import ListOfAvailableBooks from "./components/librarian/ListOfAvailableBooks";
import Payment from "./components/librarian/Payment";
import ListOfDmagedBooks from "./components/librarian/ListOfDamagedBooks";
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
          <Route path="listofdamaged" element={<ListOfDmagedBooks />} />
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
