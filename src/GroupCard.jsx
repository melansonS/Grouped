import React, { Component } from "react";
import firebase from "./firebaseConfig";
import PersonCard from "./PersonCard";
import EditGroupForm from "./EditGroupForm";

import { AiOutlineEdit } from "react-icons/ai";

class GroupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsub: undefined,
      showMembers: false,
      showEditGroup: false,
      members: []
    };
  }
  componentDidMount() {
    //set the query based on the name received as a prop
    let query = firebase
      .firestore()
      .collection("people")
      .where("group", "==", this.props.groupDetails.name);
    //set up unsubscribe for component unmount
    let unsubscribe = query.onSnapshot(snapshot => {
      let updatedMembers = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      //set the list of group members to the state
      this.setState({ members: updatedMembers });
    });
    this.setState({ unsub: unsubscribe });
  }
  componentWillUnmount() {
    this.state.unsub();
    this.setState({ unsub: undefined });
  }
  handleShowMembers = () => {
    this.setState({ showMembers: !this.state.showMembers });
  };

  handleEditGroup = updatedName => {
    console.log(updatedName);
    //if the group's name has been updated
    if (updatedName) {
      //updated the group data for each of it's current memebers
      this.state.members.forEach(member => {
        console.log("Member:", member.name, " id:", member.id);
        firebase
          .firestore()
          .collection("people")
          .doc(member.id)
          .update({ group: updatedName });
      });
      //unsub from previous onSnapshot
      this.state.unsub();
      //set up new onSnapshot with updated name
      let query = firebase
        .firestore()
        .collection("people")
        .where("group", "==", updatedName);
      //set up unsubscribe for the unmount
      let unsubscribe = query.onSnapshot(snapshot => {
        let updatedMembers = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        //set state to "new members"
        this.setState({ members: updatedMembers });
      });
      this.setState({ unsub: unsubscribe });
    }
    this.setState({ showEditGroup: false });
  };
  handleDeleteGroup = () => {
    //set the group of each current member of the group to "ungrouped"
    this.state.members.forEach(member => {
      firebase
        .firestore()
        .collection("people")
        .doc(member.id)
        .update({ group: "ungrouped" });
    });
    this.setState({ showEditGroup: false });
  };

  render() {
    let members = this.state.members.map(member => {
      return (
        <li key={member.id}>
          <PersonCard data={member} />
          {/* {member.name} - {member.group} */}
        </li>
      );
    });
    if (this.state.members[0] === undefined) {
      members = (
        <li className="group_description">This group is currently empty</li>
      );
    }
    let iconRotation;
    if (this.state.showMembers) {
      iconRotation = { transform: "rotate(90deg)", zIndex: "0" };
    }
    return (
      <div className="group_card">
        <div className="group_header">
          <div className="open_close_icon" style={iconRotation}>
            >
          </div>
          <h3 onClick={this.handleShowMembers} className="group_name">
            {this.props.groupDetails.name}
          </h3>
          <div
            className="edit_group_button"
            onClick={() => {
              this.setState({ showEditGroup: true });
            }}
          >
            <AiOutlineEdit />
          </div>
        </div>

        <h5 className="group_description">
          {this.props.groupDetails.description}
        </h5>
        {this.state.showMembers && (
          <div>
            <div className="group_description">
              Members: {this.state.members.length}
            </div>
            <ul>{members}</ul>
          </div>
        )}
        {this.state.showEditGroup && (
          <div
            className="modal"
            onClick={e => {
              if (e.target.getAttribute("class") === "modal") {
                this.setState({ showEditGroup: false });
              }
            }}
          >
            <EditGroupForm
              id={this.props.groupDetails.id}
              data={this.props.groupDetails}
              submitEdit={this.handleEditGroup}
              submitDelete={this.handleDeleteGroup}
            />
          </div>
        )}
      </div>
    );
  }
}

export default GroupCard;
