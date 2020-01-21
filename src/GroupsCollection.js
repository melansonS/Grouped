import React, { Component } from "react";
import GroupCard from "./GroupCard";
import firebase from "./firebaseConfig";

class GroupsCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  componentDidMount() {
    // this.setState({ groups: groups });
    let groupsArr = [];
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let group = { ...doc.data(), id: doc.id };
          groupsArr = groupsArr.concat(group);
        });
      })
      .then(state => {
        this.setState({ groups: groupsArr });
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
  }

  render() {
    console.log("state log:", this.state.groups);
    let groupElems = this.state.groups.map(group => {
      return <GroupCard groupDetails={group} key={group.id} />;
    });
    return (
      <div className="groups_collection">
        <h1>Groups</h1>
        {groupElems}
      </div>
    );
  }
}

export default GroupsCollection;
