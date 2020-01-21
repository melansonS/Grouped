import React, { Component } from "react";
import firebase from "./firebaseConfig";
import PersonCard from "./PersonCard";

class GroupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsub: undefined,
      showMembers: false,
      members: []
    };
  }
  componentDidMount() {
    let query = firebase
      .firestore()
      .collection("people")
      .where("group", "==", this.props.groupDetails.name);
    let unsubscribe = query.onSnapshot(snapshot => {
      let updatedMembers = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      this.setState({ members: updatedMembers });
    });
    this.setState({ usub: unsubscribe });
  }
  componentWillUnmount() {
    this.state.unsub();
    this.setState({ unsub: undefined });
  }

  handleButtonClick = () => {
    this.setState({ showMembers: !this.state.showMembers });
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
      members = <li>This group is currently empty</li>;
    }
    let icon = ">";
    if (this.state.showMembers) {
      icon = "v";
    }
    return (
      <div>
        <div>
          <h3 onClick={this.handleButtonClick} className="group_name">
            {icon} {this.props.groupDetails.name}
          </h3>
          <h5 className="group_description">
            {this.props.groupDetails.description}
          </h5>
          {this.state.showMembers && <ul>{members}</ul>}
        </div>
      </div>
    );
  }
}

export default GroupCard;
