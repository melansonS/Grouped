import React, { Component } from "react";
import GroupCard from "./GroupCard.js";
import firebase from "./firebaseConfig";
import NewGroupForm from "./NewGroupForm";

class GroupsCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsub: undefined,
      groups: [],
      showForm: false,
    };
  }

  componentDidMount() {
    //set up query
    let query = firebase.firestore().collection("groups");
    //set up unsubscribe for component unmount
    let unsubscribe = query.onSnapshot((snapshot) => {
      //pull data and id from each document
      let updatedGroups = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      //add groups to the state
      this.setState({ groups: updatedGroups });
    });
    this.setState({ unsub: unsubscribe });
  }
  componentWillUnmount() {
    this.state.unsub();
    this.setState({ unsub: undefined });
  }

  render() {
    //generate dom elements for each group
    let groupElems = this.state.groups.map((group) => {
      return <GroupCard groupDetails={group} key={group.id} />;
    });
    return (
      <div className="groups_container">
        <a id="groups"> </a>
        <div className="group_container_header">
          <h1>Groups</h1>
          <div
            onClick={() => this.setState({ showForm: true })}
            className="add_icon">
            Create a new Group!
          </div>

          {/* if we are showing the new group form:*/}
          {this.state.showForm && (
            <div
              className="modal"
              onClick={(e) => {
                if (e.target.getAttribute("class") === "modal") {
                  this.setState({ showForm: false });
                }
              }}>
              <NewGroupForm />
            </div>
          )}
        </div>

        <div className="groups_collection">{groupElems}</div>
        <a id="people"></a>
      </div>
    );
  }
}

export default GroupsCollection;
