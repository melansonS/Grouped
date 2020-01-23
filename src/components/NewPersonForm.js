import React, { Component } from "react";
import firebase from "./firebaseConfig";

class NewPersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedGroup: "ungrouped",
      groups: []
    };
  }
  componentDidMount() {
    //get a list of the current groups
    let groupsArr = [];
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //add each group to the list
          groupsArr = groupsArr.concat(doc.data().name);
        });
      })
      .then(state => {
        //store the group in the state
        this.setState({ groups: groupsArr });
      });
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("people")
      .add({
        name: this.state.name,
        group: this.state.selectedGroup
      });
    this.setState({ name: "" });
  };
  render() {
    //generate dom element for each group element, whose classname is dependant on whether it is currently 'selected'
    let groupElems = this.state.groups.map((group, i) => {
      let groupClass = "group_select";
      if (this.state.selectedGroup === group) {
        groupClass = "selected";
      }
      return (
        <div
          key={i}
          onClick={() => {
            this.setState({ selectedGroup: group });
          }}
          className={groupClass}
        >
          {group}
        </div>
      );
    });

    return (
      <div className="new_person_form">
        <h4>Add a new Person!</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            onChange={this.handleNameChange}
            value={this.state.name}
            required
          ></input>
        </form>
        <div className="group_options">
          <div className="group_select_header">Select a group:</div>
          {groupElems}
        </div>
        <div className="new_person_save" onClick={this.handleSubmit}>
          Add!
        </div>
      </div>
    );
  }
}

export default NewPersonForm;
