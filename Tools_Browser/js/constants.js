import React from "react";
import DescriptionPoints from "./components/descriptionpoints";
import ImageDisplay from "./components/imagedisplay";

const natureURL = "https://www.nature.com/articles/s41586-018-0590-4";

const tsne_place_holder_image_url =
  process.env.PUBLIC_URL + "images/static/" + "place_holder_image.png";

const violin_place_holder_image_url =
  process.env.PUBLIC_URL + "images/static/" + "place_holder_image_violin.png";

const abstract = (
  <div>
    <p>
      Tabula Muris is a compendium of single cell transcriptome data from the
      model organism Mus musculus, containing nearly 100,000 cells from 20
      organs and tissues. The data allow for direct and controlled comparison of
      gene expression in cell types shared between tissues, such as immune cells
      from distinct anatomical locations. They also allow for a comparison of
      two distinct technical approaches:
    </p>
    <DescriptionPoints
      description_points={[
        "microfluidic droplet-based 3’-end counting: provides a survey of thousands of cells per organ at relatively low coverage",
        "FACS-based full length transcript analysis: provides higher sensitivity and coverage."
      ]}
    />

    <p>
      We hope this rich collection of annotated cells will be a useful resource
      for:
    </p>
    <DescriptionPoints
      description_points={[
        "Defining gene expression in previously poorly-characterized cell populations.",
        "Validating findings in future targeted single-cell studies.",
        "Developing of methods for integrating datasets (eg between the FACS and droplet experiments), characterizing batch effects, and quantifying the variation of gene expression in a many cell types between organs and animals."
      ]}
    />

    <p>
      The peer reviewed article describing the analysis and findings is
      available on{" "}
      <a href={natureURL} target="_blank">
        Nature.
      </a>
    </p>
  </div>
);

const facs_tissues = [
  "ALL",
  "Aorta",
  "Bladder",
  "Brain_Myeloid",
  "Brain Non-Myeloid",
  "Diaphragm",
  "Fat",
  "Heart",
  "Kidney",
  "Large Intestine",
  "Limb Muscle",
  "Liver",
  "Lung",
  "Mammary Gland",
  "Marrow",
  "Pancreas",
  "Skin",
  "Spleen",
  "Thymus",
  "Tongue",
  "Trachea"
];

const droplet_tissues = [
  "ALL",
  "Bladder",
  "Heart and Aorta",
  "Kidney",
  "Limb Muscle",
  "Liver",
  "Lung",
  "Mammary Gland",
  "Marrow",
  "Spleen",
  "Thymus",
  "Tongue",
  "Trachea"
];

const methods = ["FACS", "droplet"];
const metadata = ["mouse.id", "mouse.sex", "free annotation"];

const all_tissue_metadata_facs = ["mouse.id", "mouse.sex"];

const all_tissue_metadata_droplet = ["mouse.id", "mouse.sex", "channel"];

const code_description = (
  <div>
    The code used to annotate cells, produce all figures in the paper, and the
    plots below is available on{" "}
    <a target="_blank" href="https://github.com/czbiohub/tabula-muris">
      github
    </a>
    .
  </div>
);

const data_description = (
  <div>
    Data for this project are accessible through{" "}
    <a
      target="_blank"
      href="https://figshare.com/projects/Tabula_Muris_Transcriptomic_characterization_of_20_organs_and_tissues_from_Mus_musculus_at_single_cell_resolution/27733"
    >
      Figshare
    </a>
    . These include:
    <DescriptionPoints
      description_points={[
        "Gene count tables derived from SMART-Seq2 RNAseq libraries prepared from individually FACS sorted cells. This includes 53,760 cells from 20 tissues from 8 mice.",
        "Gene count files derived from cells prepared using the 10x Genomics platform and processed with CellRanger. This contains sequence data collected from 422,803 droplet libraries, 55,656 of which passed a QC cutoff of 500 genes and 1000 UMI.",
        "Metadata for single cells (mouse id, sex, FACS setting, etc), along with annotations for the cells.",
        <div>
          Robject files for easy loading with the{" "}
          <a href="https://github.com/satijalab/seurat" target="_blank">
            Seurat
          </a>{" "}
          package, including annotations and clustering for cells from each
          tissue, prepared from microfluidic droplet-based sequencing libraries
          or libraries from FACS-sorted cells.
        </div>,
        "tSNE plots with the expression of the top 10 genes for each tissue projected onto the plot."
      ]}
    />
  </div>
);

const visualization_description =
  "Experts in the biology of each organ used a combination of unbiased clustering and marker gene expression to identify cell types in every organ, giving a granular description of cellular diversity across each mouse. Gene expression for each cell type in each organ can be visualized using interactive plots below.";

export {
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
};



// WEBPACK FOOTER //
// ./src/constants.js
