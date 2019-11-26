import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import Slider from "material-ui/Slider";
import AutoComplete from "material-ui/AutoComplete";
import genes from "./all_genes";
import DropDownMenuLongMenu from "./components/dropdownmenu";
import { tissues, methods } from "./constants";

function handleActive(tab) {
  alert(
    `A tab with this route property ${tab.props["data-route"]} was activated.`
  );
}

class TabsExampleSimple extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs
        value = {this.props.value}
        >
        <Tab label="gene" value="gene"
          onActive={this.props.onChange}>
          <div>
            <AutoComplete
              floatingLabelText="Type your gene, i.e. Actb"
              filter={AutoComplete.fuzzyFilter}
              dataSource={genes}
              maxSearchResults={10}
              onNewRequest={this.props.handleGeneSelection}
              ref={(input) => {this.autocomplete = input;}}
            />
          </div>
        </Tab>
        <Tab label="metadata" value="metadata"
          onActive={this.props.onChange}>
          <div>
            <DropDownMenuLongMenu
              mylabel={this.props.mylabel}
              handleSelection={this.props.handleMetadataSelection}
              menuItems={this.props.metadata_options}
            />
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default TabsExampleSimple;



// WEBPACK FOOTER //
// ./src/colorby.js
