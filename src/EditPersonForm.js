import React, { Component } from "react";
import firebase from "./firebaseConfig";

class EditPersonForm extends Component {
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
    if (e) {
      e.preventDefault();
    }
    firebase
      .firestore()
      .collection("people")
      .doc(this.props.id)
      .update({ name: this.state.name });
    this.setState({ name: "" });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            required
            placeholder="updated name"
            onChange={this.handleNameChange}
            value={this.state.name}
          ></input>
          <div onClick={this.handleSubmit}>Save</div>
        </form>
      </div>
    );
  }
}

export default EditPersonForm;
