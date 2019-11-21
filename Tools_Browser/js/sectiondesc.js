import React, { Component } from "react";

class SectionDescription extends Component {
  render() {
    return (
      <div style={{}} id={this.props.id}>
        <h2
          style={{ marginTop: "60px", marginBottom: "60px", color: "#00a1e0" }}
        >
          {this.props.title}
        </h2>
        <p style={{ fontSize: "18px", lineHeight: "36px" }}>
          {this.props.description}
        </p>
      </div>
    );
  }
}

export default SectionDescription;



// WEBPACK FOOTER //
// ./src/components/sectiondescription.js
