import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      groups: [
        {
          name: "Cool Guys",
          description:
            "A small ish group comprised of only a few members currently, but that is open to adding new members, as long as they are up to the standards, that is, ofcourse, yes yes",
          members: ["sam", "joe", "ron"]
        }
      ]
    };
  }

  getStyle = () => {
    if (this.state.hidden) {
      console.log("IS HIDDEN");
      return { opacity: 0 };
    }
  };
  handleButtonClick = () => {
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    let groupElems = this.state.groups.map(group => {
      let members = group.members.map(member => {
        return <li>{member}</li>;
      });
      return (
        <div>
          <h3 onClick={this.handleButtonClick} className="group_name">
            {group.name}
          </h3>
          <h5 className="group_description">{group.description}</h5>
          <ul style={this.getStyle()}>{members}</ul>
        </div>
      );
    });
    let icon = "v";
    if (this.state.hidden) {
      icon = ">";
    }
    return (
      <div>
        {icon}
        {groupElems}
      </div>
    );
  }
}

export default Test;
