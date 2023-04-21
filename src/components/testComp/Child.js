import { useContext } from "react";
import { MyContext } from "./Parent";
export const Child = () => {
    // Use the useContext hook to access the context object
    const { stateData } = useContext(MyContext);
  
    return (
      <div>
        <h2>Child Component</h2>
        <p>{stateData}</p>
      </div>
    );
  }
  