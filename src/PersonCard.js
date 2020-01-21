import React, { Component } from "react";
import firebase from "./firebaseConfig";

class PersonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangeName: false,
      showAssignGroup: false,
      groups: [],
      selected: ""
    };
  }

  handleShowAssignGroup = () => {
    this.setState({ showAssignGroup: !this.state.showAssignGroup });
    let groupsArr = ["ungrouped"];
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          groupsArr = groupsArr.concat(doc.data().name);
        });
      })
      .then(state => {
        this.setState({ groups: groupsArr });
      });
  };
  handleDeletePerson = () => {
    console.log(
      "person name:",
      this.props.data.name,
      " id:",
      this.props.data.id
    );
    firebase
      .firestore()
      .collection("people")
      .doc(this.props.data.id)
      .delete();
  };
  handleReassign = g => {
    firebase
      .firestore()
      .collection("people")
      .doc(this.props.data.id)
      .update({ group: g });
    this.setState({ showAssignGroup: false });
  };

  render() {
    let groupOptions = this.state.groups.map((group, i) => {
      return (
        <div
          key={i}
          onClick={() => {
            this.handleReassign(group);
          }}
        >
          {group}
        </div>
      );
    });
    return (
      <div className="person_card">
        <h4>name:{this.props.data.name} </h4>
        <h5 onClick={this.handleShowAssignGroup}>
          Group:{this.props.data.group}
        </h5>
        <span onClick={this.handleDeletePerson} className="delete">
          X
        </span>
        {this.state.showAssignGroup && <div>Pick from :{groupOptions}</div>}
      </div>
    );
  }
}
export default PersonCard;
