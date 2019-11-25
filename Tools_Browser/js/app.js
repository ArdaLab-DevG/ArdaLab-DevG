import React, { Component } from "react";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import AutoComplete from "material-ui/AutoComplete";
import {
  all_tissue_metadata_facs,
  all_tissue_metadata_droplet,
  facs_tissues,
  droplet_tissues,
  methods,
  metadata,
  abstract,
  data_description,
  code_description,
  tsne_place_holder_image_url,
  violin_place_holder_image_url,
  visualization_description
} from "./constants";
import Paper from "material-ui/Paper";
import TabsExampleSimple from "./colorby";
import "./App.css";
import SectionDescription from "./components/sectiondescription";
import DropDownMenuLongMenu from "./components/dropdownmenu";
import ImageDisplay from "./components/imagedisplay";
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn
} from "material-ui/Table";

const stylePaperSections = {
  display: "inline-block",
  height: "450px",
  width: "800px",
  margin: 20,
  textAlign: "center"
};

const stylePaper = {
  display: "inline-block",
  width: "600px",
  margin: 20,
  textAlign: "center"
};

const stylePaperVln = {
  textAlign: "center"
};

const styleImgVln = {
  maxWidth: "1500px"
};

const styleTable = {
  height: "200px",
  maxWidth: "1000px",
  textAlign: "center"
};

const styleImg = {
  maxHeight: "600px",
  maxWidth: "800px",
  verticalAlign: "top"
};

const methodOptions = Object.freeze({
  FACS: "FACS",
  DROPLET: "droplet"
});

var IMAGE_ASSET_URL;
if (process.env.NODE_ENV == "development") {
  IMAGE_ASSET_URL = "http://tabula-muris.staging.ds.czbiohub.org";
} else {
  IMAGE_ASSET_URL = process.env.PUBLIC_URL;
}

class FACS {
  constructor(tissue) {
    this.name = "FACS";

    if (tissue == "ALL") {
      this.metadata = all_tissue_metadata_facs;
    } else {
      var newMetadata = metadata.slice();
      newMetadata.splice(0, 0, "plate.barcode");
      this.metadata = newMetadata;
    }
  }
}

class Droplet {
  constructor(tissue) {
    this.name = "droplet";

    if (tissue == "ALL") {
      this.metadata = all_tissue_metadata_droplet;
    } else {
      var newMetadata = metadata.slice();
      newMetadata.splice(0, 0, "channel");
      this.metadata = newMetadata;
    }
  }
}

const initialState = {
  tissue_options: facs_tissues,
  tissue: "Mammary Gland",
  method: new FACS("Mammary Gland"),
  color: "Actb",
  color_by_gene: "Actb",
  color_selection: "gene",
  color_by_metadata: "mouse.sex",
  vln_plot_type: "vln"
};

class App extends Component {
  state = initialState;

  reset = () => {
    this.setState(initialState);
    this.tabs.autocomplete.state.searchText = "";
  };

  handleTissueSelection = value => {
    var method =
      this.state.method.name == methodOptions.FACS
        ? new FACS(value)
        : new Droplet(value);

    var color_by_metadata;
    if (value == "ALL" && !method.metadata.some(item => item == value)) {
      color_by_metadata = "mouse.sex";
    } else if (
      this.state.tissue == "ALL" &&
      this.state.color_by_metadata == "tissue"
    ) {
      color_by_metadata = "mouse.sex";
    } else {
      color_by_metadata = this.state.color_by_metadata;
    }

    var vln_plot_type;
    if (value == "ALL") {
      vln_plot_type = "vln";
    } else {
      vln_plot_type = this.state.vln_plot_type;
    }

    this.setState({
      tissue: value,
      selectedOne: true,
      method: method,
      color_by_metadata: color_by_metadata,
      vln_plot_type: vln_plot_type
    });
  };

  updateVlnPlotType = (event, value) => {
    this.setState({
      vln_plot_type: value
    });
  };

  handleMethodSelection = value => {
    var method =
      value == methodOptions.FACS
        ? new FACS(this.state.tissue)
        : new Droplet(this.state.tissue);

    var color_by_metadata;
    if (
      this.state.tissue == "ALL" &&
      !method.metadata.some(item => item == this.state.color_by_metadata)
    ) {
      color_by_metadata = "mouse.sex";
    } else if (
      value == methodOptions.FACS &&
      ["channel", "tissue"].some(item => item == this.state.color_by_metadata)
    ) {
      color_by_metadata = "plate.barcode";
    } else if (
      value == methodOptions.DROPLET &&
      ["plate.barcode", "tissue"].some(
        item => item == this.state.color_by_metadata
      )
    ) {
      color_by_metadata = "channel";
    } else {
      color_by_metadata = this.state.color_by_metadata;
    }

    var tissue_options =
      value == methodOptions.FACS ? facs_tissues : droplet_tissues;
    var tissue = this.state.tissue;
    if (!tissue_options.some(item => item == tissue)) {
      tissue = tissue_options[1];
    }

    var { color_by_gene } = this.state;
    this.setState({
      tissue_options: tissue_options,
      tissue: tissue,
      method: method,
      selectedTwo: true,
      color_by_metadata: color_by_metadata,
      color:
        this.state.color_selection == "gene" ? color_by_gene : color_by_metadata
    });
  };

  handleGeneSelection = value => {
    this.setState({
      color_selection: "gene",
      color: value,
      color_by_gene: value
    });
  };

  handleMetadataSelection = value => {
    this.setState({
      color_selection: "metadata",
      color: value,
      color_by_metadata: value
    });
  };

  handleTabSelection = value => {
    var color = this.state.color_by_gene;
    if (value.props.label == "metadata") {
      color = this.state.color_by_metadata;
    }
    this.setState({
      color_selection: value.props.label,
      color: color
    });
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <DropDownMenuLongMenu
              handleSelection={this.handleMethodSelection.bind(this)}
              mylabel={this.state.method.name}
              menuItems={methods}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <DropDownMenuLongMenu
              handleSelection={this.handleTissueSelection.bind(this)}
              mylabel={this.state.tissue}
              menuItems={this.state.tissue_options}
            />
          </div>
        );
      case 2:
        return (
          <TabsExampleSimple
            handleGeneSelection={this.handleGeneSelection.bind(this)}
            handleMetadataSelection={this.handleMetadataSelection.bind(this)}
            mylabel={this.state.color_by_metadata}
            geneSelection={this.state.color_by_gene}
            metadata_options={this.state.method.metadata}
            onChange={this.handleTabSelection.bind(this)}
            value={this.state.color_selection}
            ref={input => {
              this.tabs = input;
            }}
          />
        );
      default:
        return "who knows";
    }
  }

  getImageString = (plot_type, color, method) => {
    var method_name = method;
    if (!method) {
      method_name = this.state.method.name;
    }

    var tissue = this.state.tissue;
    if (tissue == "ALL") {
      tissue = "All";
    }

    var image_identifier =
      tissue.replace(/ /g, "_") +
      "-" +
      method_name.replace(/ /g, "_").toLowerCase() +
      "-" +
      (color ? color : this.state.color.replace(/ /g, "_"));

    return (
      IMAGE_ASSET_URL + "/images/" + image_identifier + "-" + plot_type + ".png"
    );
  };

  render() {
    const { color_selection, tissue } = this.state;

    return (
      <div>
        <header className="App-header">
          <img
            style={{ width: "190px", float: "left", paddingRight: "20px" }}
            src={process.env.PUBLIC_URL + "/Biohub_Roundel_only.png"}
          />
          <h1 className="App-title">Tabula Muris</h1>
        </header>

        <div style={{}}>
          <div
            style={{
              maxWidth: "1000px",
              width: "100%",
              margin: "auto",
              paddingLeft: "100px",
              paddingRight: "100px",
              paddingTop: "100px"
            }}
          >
            <SectionDescription
              id="abstract"
              title="Abstract"
              description={abstract}
            />
            <SectionDescription
              id="code"
              title="Code"
              description={code_description}
            />
            <SectionDescription
              id="data"
              title="Data"
              description={data_description}
            />

            <SectionDescription
              id="visualization"
              title="Visualization"
              description={visualization_description}
            />
            <br />
            <Paper style={styleTable}>
              <Table>
                <TableHeader
                  adjustForCheckbox={false}
                  displaySelectAll={false}
                  enableSelectAll={false}
                >
                  <TableRow>
                    <TableHeaderColumn
                      style={{ paddingLeft: 48, fontSize: "20px" }}
                    >
                      Method
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      style={{ paddingLeft: 48, fontSize: "20px" }}
                    >
                      Tissue
                    </TableHeaderColumn>
                    <TableHeaderColumn style={{ fontSize: "20px" }}>
                      Color by
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow selectable={false}>
                    <TableRowColumn>{this.getStepContent(0)}</TableRowColumn>
                    <TableRowColumn>{this.getStepContent(1)}</TableRowColumn>
                    <TableRowColumn>{this.getStepContent(2)}</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
            <FlatButton label="reset" onClick={this.reset} />
          </div>

          <div
            style={{
              textAlign: "center",
              paddingTop: 30,
              color: "#eee",
              margin: "auto",
              maxWidth: "1400px"
            }}
          >
            <ImageDisplay
              title={this.state.color}
              stylePaper={stylePaper}
              styleImg={styleImg}
              imgSrc={this.getImageString("tsne")}
              onErrorImageUrl={tsne_place_holder_image_url}
            />

            {tissue == "ALL" ? (
              <ImageDisplay
                title="Tissue"
                stylePaper={stylePaper}
                styleImg={styleImg}
                imgSrc={this.getImageString("tsne", "tissue")}
              />
            ) : (
              <ImageDisplay
                title="Cell Ontology Class"
                stylePaper={stylePaper}
                styleImg={styleImg}
                imgSrc={this.getImageString("tsne", "cell_ontology_class")}
                onErrorImageUrl={tsne_place_holder_image_url}
              />
            )}

            {color_selection === "gene" ? (
              <div style={{ textAlign: "left", display: "inline-block" }}>
                {tissue == "ALL" ? (
                  ""
                ) : (
                  <div
                    style={{
                      display: "inline-block",
                      paddingLeft: "100px",
                      color: "black"
                    }}
                  >
                    <div>Choose plot type</div>
                    <RadioButtonGroup
                      name="PlotType"
                      defaultSelected="not_light"
                      onChange={this.updateVlnPlotType.bind(this)}
                      defaultSelected="vln"
                      style={{ width: "211px" }}
                    >
                      <RadioButton value="vln" label="Violin Plot" />
                      <RadioButton value="baw" label="Box and Whisker Plot" />
                    </RadioButtonGroup>
                  </div>
                )}
                <ImageDisplay
                  title={this.state.color}
                  stylePaper={stylePaperVln}
                  styleImg={styleImgVln}
                  imgSrc={this.getImageString(this.state.vln_plot_type)}
                  onErrorImageUrl={violin_place_holder_image_url}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;



// WEBPACK FOOTER //
// ./src/App.js
