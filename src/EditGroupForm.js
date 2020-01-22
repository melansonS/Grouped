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
    let name = this.props.data.name;
    let description = this.props.data.description;
    if (this.state.name !== "") {
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
  };

  handleDelete = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(this.props.id)
      .delete();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="updated name"
            onChange={this.handleNameChange}
            value={this.state.name}
          ></input>
          <textarea
            // rows="20"
            onChange={this.handleDescChange}
            value={this.state.description}
          ></textarea>
          <div onClick={this.handleSubmit}>Save</div>
        </form>
        <div className="delete" onClick={this.handleDelete}>
          Delete project
        </div>
      </div>
    );
  }
}

export default EditGroupForm;
