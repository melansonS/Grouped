import React, { Component } from "react";
import firebase from "./firebaseConfig";

class NewPersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("NAME:", this.state.name);
    firebase
      .firestore()
      .collection("people")
      .add({
        name: this.state.name,
        group: "ungrouped"
      });
    this.setState({ name: "" });
  };
  render() {
    return (
      <div className="new_person_form">
        <h4>Add a new Person!</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            placeholder="Name"
            onChange={this.handleNameChange}
            required
          ></input>
        </form>
        <div className="new_person_save" onClick={this.handleSubmit}>
          Add!
        </div>
      </div>
    );
  }
}

export default NewPersonForm;
