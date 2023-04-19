import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BookEntries from "./components/BookEntries";
import ShowBooks from "./components/ShowBooks";
import UpdateEntries from "./components/UpdateEntries";
import SidebarTest from "./components/SidebarTest";
const App = () =>{
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="bookentries" element={<BookEntries />} />
        <Route path="showbooks" element={<ShowBooks />} /> 
        <Route path="bookupdate" element={<UpdateEntries />} />
        {/*<Route path="todoform" element={<TodoForm />} />
        <Route path="category/:catId" element={<CategoryDetails />} />
        <Route path="todo" element={<UpdateForm />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
