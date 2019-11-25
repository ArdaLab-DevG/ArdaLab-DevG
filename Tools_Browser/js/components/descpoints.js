import React, { Component } from "react";

class DescriptionPoints extends Component {
  getDescriptionList(description_points) {
    return description_points.map(function(item) {
      return <li>{item}</li>;
    });
  }

  render() {
    var description_list = null;
    if (
      this.props.description_points &&
      this.props.description_points.length > 0
    ) {
      description_list = (
        <ul>{this.getDescriptionList(this.props.description_points)}</ul>
      );
    }
    return description_list;
  }
}

export default DescriptionPoints;



// WEBPACK FOOTER //
// ./src/components/descriptionpoints.js
