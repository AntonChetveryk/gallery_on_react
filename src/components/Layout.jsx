import React from "react";

class Layout extends React.Component {
  render() {
    return (
      <div className="Layout">
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
