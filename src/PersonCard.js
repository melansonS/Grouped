import React, { Component } from "react";
import firebase from "./firebaseConfig";
import EditPersonForm from "./EditPersonForm";

import { AiOutlineDelete } from "react-icons/ai";

class PersonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditPerson: false,
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
          className="group_option"
          key={i}
          onClick={() => {
            this.handleReassign(group);
          }}
        >
          {group}
        </div>
      );
    });
    let groupColor;
    if (this.props.data.group === "ungrouped") {
      groupColor = { color: "#697b93" };
    }
    return (
      <div className="person_card">
        <div
          className="person_name"
          onClick={() => {
            this.setState({ showEditPerson: true });
          }}
        >
          {this.props.data.name}{" "}
        </div>
        <div
          className="person_group"
          onClick={this.handleShowAssignGroup}
          style={groupColor}
        >
          {this.props.data.group}
        </div>
        <span onClick={this.handleDeletePerson} className="delete">
          <AiOutlineDelete />
        </span>
        {this.state.showEditPerson && (
          <div
            className="modal"
            onClick={e => {
              if (e.target.getAttribute("class") === "modal") {
                this.setState({ showEditPerson: false });
              }
            }}
          >
            <EditPersonForm id={this.props.data.id} />
          </div>
        )}

        {this.state.showAssignGroup && (
          <div
            className="modal"
            onClick={e => {
              if (e.target.getAttribute("class") === "modal") {
                this.setState({ showAssignGroup: false });
              }
            }}
          >
            <div className="group_assign">
              <h4>Assign to a new group :</h4>
              {groupOptions}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default PersonCard;
