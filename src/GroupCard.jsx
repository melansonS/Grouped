import React, { Component } from "react";

class GroupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }
  getStyle = () => {
    if (this.state.hidden) {
      return { opacity: 0 };
    }
  };
  handleButtonClick = () => {
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    let members = this.props.groupDetails.members.map(member => {
      return <li>{member}</li>;
    });
    let icon = "v";
    if (this.state.hidden) {
      icon = ">";
    }
    return (
      <div>
        {icon}
        <div>
          <h3 onClick={this.handleButtonClick} className="group_name">
            {this.props.groupDetails.name}
          </h3>
          <h5 className="group_description">
            {this.props.groupDetails.description}
          </h5>
          <ul style={this.getStyle()}>{members}</ul>
        </div>
      </div>
    );
  }
}

export default GroupCard;
