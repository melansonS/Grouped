import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: 0
    };

    window.onscroll = () => {
      console.log("SCROLL HEIGHT?: ", document.documentElement.scrollTop);
      if (document.documentElement.scrollTop > 0) {
        this.setState({ scroll: document.documentElement.scrollTop });
      }
    };
  }

  getStyle = () => {
    if (this.state.scroll > 15) {
      return { boxShadow: "0 0 7px rgba(0,0,0,.1)" };
    } else {
      return;
    }
  };
  render() {
    return (
      <div className="navbar" style={this.getStyle()}>
        <a
          href="#top"
          className="icon"
          onClick={() => this.setState({ scroll: 0 })}
        >
          <div>grouped</div>
          <div className="pink_comma">.</div>
        </a>
        <div>Scroll:{this.state.scroll}</div>
      </div>
    );
  }
}

export default Navbar;
