import { createContext } from "react";

const UserContext = createContext({
    user:{
    email: "sumana@gmail.com",
    role: "librarian",
}});

 export default UserContext;