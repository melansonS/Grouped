import React, { Component } from "react";
import firebase from "./firebaseConfig";
import PersonCard from "./PersonCard";
import EditGroupForm from "./EditGroupForm";

import { AiOutlineEdit, AiOutlineRight } from "react-icons/ai";

class GroupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsub: undefined,
      showMembers: false,
      showEditGroup: false,
      members: [],
    };
  }
  componentDidMount() {
    //set the query based on the name received as a prop
    let query = firebase
      .firestore()
      .collection("people")
      .where("group", "==", this.props.groupDetails.name);
    //set up unsubscribe for component unmount
    let unsubscribe = query.onSnapshot((snapshot) => {
      //pull the data and id from each of the docs
      let updatedMembers = snapshot.docs.map((doc) => {
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

  //this functions is passed down to the edit form child component and is called upon 'form submission'
  handleEditGroup = (updatedName) => {
    //if the group's name has been updated
    if (updatedName) {
      //updated the 'group' data for each of it's current memebers
      this.state.members.forEach((member) => {
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
      let unsubscribe = query.onSnapshot((snapshot) => {
        //pull data and ids from each document
        let updatedMembers = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        //set state to "new members"
        this.setState({ members: updatedMembers });
      });
      this.setState({ unsub: unsubscribe });
    }
    this.setState({ showEditGroup: false });
  };

  //this functions is passed down to the edit form child component and is called upon 'form submission'
  handleDeleteGroup = () => {
    //set the group of each current member of the group to "ungrouped"
    this.state.members.forEach((member) => {
      firebase
        .firestore()
        .collection("people")
        .doc(member.id)
        .update({ group: "ungrouped" });
    });
    this.setState({ showEditGroup: false });
  };

  render() {
    //generate dom element for each of the members
    let members = this.state.members.map((member) => {
      return (
        <li key={member.id}>
          <PersonCard data={member} />
        </li>
      );
    });
    //if there are no members in the group, display custon dom element
    if (this.state.members[0] === undefined) {
      members = (
        <li className="group_description">This group is currently empty</li>
      );
    }
    //set up "icon" that rotates to a position based on the "show members" state
    let iconRotation;
    if (this.state.showMembers) {
      iconRotation = { transform: "rotate(90deg)" };
    }
    return (
      <div className="group_card">
        <div className="group_header">
          <div
            className="open_close_icon"
            style={iconRotation}
            onClick={this.handleShowMembers}>
            <AiOutlineRight onClick={this.handleShowMembers} />
          </div>
          <div onClick={this.handleShowMembers} className="group_text_info">
            <div className="group_title">
              <h3 className="group_name">{this.props.groupDetails.name}</h3>
            </div>

            <h5 className="group_description">
              {this.props.groupDetails.description}
            </h5>
          </div>
          <div
            className="edit_group_button"
            title="Edit Group"
            onClick={() => {
              this.setState({ showEditGroup: true });
            }}>
            <AiOutlineEdit title="Edit Group" />
          </div>
        </div>

        {/* if we are showing members: */}
        {this.state.showMembers && (
          <div>
            <div className="group_description group_members">
              Members: {this.state.members.length}
            </div>
            <ul>{members}</ul>
          </div>
        )}

        {/* if we are showing the Edit group form: */}
        {this.state.showEditGroup && (
          <div
            className="modal"
            onClick={(e) => {
              if (e.target.getAttribute("class") === "modal") {
                this.setState({ showEditGroup: false });
              }
            }}>
            <EditGroupForm
              id={this.props.groupDetails.id}
              data={this.props.groupDetails}
              // functions passed down to handle members cleanup upon group deletion or name edit
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
