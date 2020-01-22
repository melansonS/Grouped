import React, { Component } from "react";
import firebase from "./firebaseConfig";
import PersonCard from "./PersonCard";
import EditGroupForm from "./EditGroupForm";

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
    this.setState({ unsub: unsubscribe });
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
      members = (
        <li className="group_description">This group is currently empty</li>
      );
    }
    let iconRotation;
    if (this.state.showMembers) {
      iconRotation = { transform: "rotate(90deg)" };
    }
    return (
      <div className="group_card">
        <div className="group_header">
          <div className="open_close_icon" style={iconRotation}>
            >
          </div>
          <h3 onClick={this.handleButtonClick} className="group_name">
            {this.props.groupDetails.name}
          </h3>
          <div
            className="edit_group_button"
            onClick={() => {
              this.setState({ showEditGroup: true });
            }}
          >
            [...]
          </div>
        </div>

        <h5 className="group_description">
          {this.props.groupDetails.description}
        </h5>
        {this.state.showMembers && (
          <div>
            <div className="group_description">Members:</div>
            <ul>{members}</ul>
          </div>
        )}
        {this.state.showEditGroup && (
          <EditGroupForm
            id={this.props.groupDetails.id}
            data={this.props.groupDetails}
          />
        )}
      </div>
    );
  }
}

export default GroupCard;
