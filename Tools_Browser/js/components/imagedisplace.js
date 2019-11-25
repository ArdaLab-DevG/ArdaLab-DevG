import React, { Component } from "react";

class ImageDisplay extends Component {
  getLinkHref = () => {
    var linkHref = this.props.linkHref;

    if (!linkHref) {
      linkHref = this.props.imgSrc;
    }

    return linkHref;
  };

  render() {
    return (
      <div style={this.props.stylePaper}>
        <h2 style={{ color: "black" }}>{this.props.title}</h2>
        <a target="_blank" href={this.getLinkHref()}>
          <img
            src={this.props.imgSrc}
            style={this.props.styleImg}
            onError={e => {
              e.target.src = this.props.onErrorImageUrl;
            }}
          />
        </a>
      </div>
    );
  }
}

export default ImageDisplay;



// WEBPACK FOOTER //
// ./src/components/imagedisplay.js
