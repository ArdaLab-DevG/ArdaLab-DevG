import React, { Component } from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

class DropDownMenuLongMenu extends Component {  
  handleChange = (event, index, value) => {
    this.props.handleSelection(value);
  };

  render() {
    var menuItems = this.props.menuItems.map(function(item) {
      return <MenuItem value={item} key={item} primaryText={item} />;
    });

    return (
      <DropDownMenu
        autoWidth={true}
        maxHeight={300}
        value={this.props.mylabel}
        onChange={this.handleChange.bind(this)}
      >
        {menuItems}
      </DropDownMenu>
    );
  }
}

export default DropDownMenuLongMenu;



// WEBPACK FOOTER //
// ./src/components/dropdownmenu.js
