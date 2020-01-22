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
    e.preventDefault();
    console.log("NAME:", this.state.name, "DESC:", this.state.description);
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
      <div className="new_group_form group_assign">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            placeholder="Name"
            onChange={this.handleNameChange}
            required
          ></input>
          <input
            type="text"
            value={this.state.description}
            placeholder="Description"
            onChange={this.handleDescChange}
            required
          ></input>
          <input type="submit" value="add group"></input>
        </form>
      </div>
    );
  }
}

export default NewGroupForm;
