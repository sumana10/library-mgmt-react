import React, { createContext, useState } from "react";
import { Child } from "./Child";
// Create a new context object
export const MyContext = createContext();

export const Parent = () =>{
  const [stateData, setStateData] = useState("Hello World");

  return (
    <div>
      <h1>Parent Component</h1>
      <MyContext.Provider value={{ stateData, setStateData }}>
        <Child />
      </MyContext.Provider>
    </div>
  );
}

