import React, { Component } from "react";
import groups from "./dumyData";
import GroupCard from "./GroupCard";

class GroupsCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  componentDidMount() {
    this.setState({ groups: groups });
  }
  render() {
    console.log("state log:", this.state.groups);
    let groupElems = this.state.groups.map(group => {
      return <GroupCard groupDetails={group} />;
    });
    return (
      <div>
        <h1>Groups</h1>
        {groupElems}
      </div>
    );
  }
}

export default GroupsCollection;
