import React from "react";
import "../styles/style.css";
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
