import React from "react";
import "./App.css";
import GroupsCollection from "./GroupsCollection";
import PoepleCollection from "./PeopleCollection";
import Navbar from "./navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <GroupsCollection />
      <PoepleCollection />
    </div>
  );
}

export default App;
