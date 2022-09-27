import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles((theme) => {
  return {
    container: {
      width: "100% !important",
      overflowX: "scroll",
      position: "relative",
      borderTop: "1px solid #E4E4E4 !important",
    },
    datatableContainer: {
      "& .p-multiselect.p-component.p-inputwrapper.p-column-filter": {
        width: "135px",
        height: "32px",
        alignItems: "center",
        "&:hover": {
          borderColor: "black",
          boxShadow: "none",
        },
      },
      "& .p-datatable-thead": {
        position: "sticky !important",
        top: 0,
      },
      "& .p-multiselect.p-component.p-inputwrapper.p-focus.p-inputwrapper-focus.p-column-filter":
        {
          borderColor: "#BCBCBC",
          boxShadow: "none",
        },
      "& .p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight":
        {
          color: "#32a852 !important",
          background: "#86ABB6 !important",
        },
      "& .p-checkbox .p-checkbox-box .p-highlight": {
        borderColor: "#32a852",
        background: "#86ABB6",
      },
      "& input": {
        width: "135px",
        height: "32px",
        alignItems: "center",
      },
      "& tr.p-row-odd": {
        background: "#F0F2F3 !important",
      },
      "& tr > th": {
        maxWidth: "225px !important",
      },
      "& tr > td": {
        width: "20rem",
      },
      "& .p-paginator-bottom": {
        borderTop: "1px solid #BCBCBC !important",
        width: "100% !important",
        position: "fixed !important",
        bottom: "0px !important",
        right: "0px !important",
      },
      "& .p-column-filter-menu-button": {
        background: "#f8f9fa",
        "&:hover": {
          background: "#f8f9fa",
        },
        "&:focus": {
          boxShadow: "none",
        },
      },
      "& .p-column-filter-clear-button": {
        visibility: "visible",
      },
    },
    tableColumn: {
      padding: "10px !important",
      fontSize: "14px",
      border: "0px !important",
      height: "70px !important",
      maxWidth: "250px",
    },
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
    },
    descriptiveDatatableContainer: {
      "& .p-multiselect.p-component.p-inputwrapper.p-column-filter": {
        width: "135px",
        height: "32px",
        alignItems: "center",
        "&.focus": {},
      },
      "& .p-datatable-thead": {
        position: "sticky !important",
        top: 0,
      },
      "& input": {
        width: "135px !important",
        height: "32px !important",
        alignItems: "center",
      },
      "& tr.p-row-odd": {
        background: "#F0F2F3 !important",
      },
      "& tr > th": {
        maxWidth: "225px !important",
      },
      "& tbody": {
        display: "none",
      },
      "& .p-multiselect.p-component.p-inputwrapper.p-focus.p-inputwrapper-focus.p-column-filter":
        {
          borderColor: "#BCBCBC",
          boxShadow: "none",
        },
      "& .p-multiselect:not(.p-disabled):hover": {
        borderColor: "#000000",
      },
      "& .p-column-filter-menu-button": {
        background: "#f8f9fa",
        "&:hover": {
          background: "#f8f9fa",
        },
        "&:focus": {
          boxShadow: "none",
        },
      },
    },
    scrollWrapperLeft: {
      position: "absolute",
      left: "415px",
      top: "180px",
      display: "flex",
      color: "#666666",
      alignItems: "center",
      cursor: "pointer",
      "& p": {
        color: "#666666",
        fontSize: "14px",
        fontWeight: 500,
        margin: "0px",
      },
      "& div": {
        width: "30px",
        height: "30px",
        background: "#f6f6f6",
        paddingTop: "4px",
        borderLeft: "3px solid #347989",
        marginLeft: "4px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
      },
    },
    scrollWrapperRight: {
      position: "absolute",
      right: "415px",
      top: "180px",
      display: "flex",
      color: "#666666",
      alignItems: "center",
      cursor: "pointer",
      "& p": {
        color: "#666666",
        fontSize: "14px",
        fontWeight: 500,
        margin: "0px",
      },
      "& div": {
        width: "30px",
        height: "30px",
        background: "#f6f6f6",
        paddingTop: "4px",
        borderLeft: "3px solid #347989",
        marginRight: "4px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
      },
    },
    mb2: {
      marginBottom: "20px",
    },
  };
});