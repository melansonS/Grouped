import React, { Component } from "react";
import firebase from "./firebaseConfig";

class EditPersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "",
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    //don't set the name to blank..
    if (this.state.name === "") {
      return;
    }
    //update data on firestore
    firebase
      .firestore()
      .collection("people")
      .doc(this.props.id)
      .update({ name: this.state.name });
    this.setState({ name: "" });
    this.props.handleShowEditPerson();
  };
  render() {
    return (
      <div className="edit_person_modal">
        <h4>Update name</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="updated name"
            onChange={this.handleNameChange}
            value={this.state.name}
            required></input>
          <div className="edit_person_save" onClick={this.handleSubmit}>
            Save
          </div>
        </form>
      </div>
    );
  }
}

export default EditPersonForm;
