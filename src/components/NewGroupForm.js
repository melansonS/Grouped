import React, { Component } from "react";
import firebase from "./firebaseConfig";

class NewGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handleDescChange = e => {
    this.setState({ description: e.target.value });
  };
  handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    firebase
      .firestore()
      .collection("groups")
      .add({
        name: this.state.name,
        description: this.state.description
      });
    this.setState({ name: "", description: "" });
  };
  render() {
    return (
      <div className="new_group_form">
        <h4>Create a new Group!</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            onChange={this.handleNameChange}
            value={this.state.name}
            required
          ></input>
          <textarea
            rows="5"
            placeholder="Description"
            onChange={this.handleDescChange}
            value={this.state.description}
            required
          ></textarea>
        </form>
        <div className="new_group_save" onClick={this.handleSubmit}>
          Create!
        </div>
      </div>
    );
  }
}

export default NewGroupForm;
