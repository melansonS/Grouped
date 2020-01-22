import React, { Component } from "react";
import firebase from "./firebaseConfig";

class EditGroupForm extends Component {
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
    if (this.state.name === "" && this.state.description === "") {
      return;
    }
    //if one of the fields is left blank, keep the current data
    let newName = undefined;
    let name = this.props.data.name;
    let description = this.props.data.description;
    //if the name has been updated, store it as 'new name' to send up to the parent component for cleanup
    if (this.state.name !== "") {
      newName = this.state.name;
      name = this.state.name;
    }
    if (this.state.description !== "") {
      description = this.state.description;
    }
    firebase
      .firestore()
      .collection("groups")
      .doc(this.props.id)
      .update({ name, description });
    this.setState({ name: "", description: "" });
    //function in the parent component set to clean up/edit the group members
    this.props.submitEdit(newName);
  };

  handleDelete = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(this.props.id)
      .delete();
    //function in the parent component set to clean up/edit the group members
    this.props.submitDelete();
  };
  render() {
    return (
      <div className="edit_group_modal">
        <h4>Edit Group!</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="updated name"
            onChange={this.handleNameChange}
            value={this.state.name}
          ></input>
          <textarea
            rows="5"
            onChange={this.handleDescChange}
            value={this.state.description}
            placeholder="updated description..."
          ></textarea>
          <div onClick={this.handleSubmit} className="edit_group_save">
            Save
          </div>
        </form>
        <div className="delete" onClick={this.handleDelete}>
          Delete Group
        </div>
      </div>
    );
  }
}

export default EditGroupForm;
