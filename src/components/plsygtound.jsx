// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useStyles } from "./style";
import { playGroundConstants } from "./data";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { addrow, getResponse, onRowEdit, selectedProductChange } from "../redux/productsSlice";
// import Table from 'react-bootstrap/Table';

const PlayGroundTable = ({ columnWidth, addRow }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tableRef = useRef();

  // const [products, setProducts] = useState<any[string]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(20);
  // const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const products = useSelector(
    (state) => state.playground.currentData.defaultData
  );
  const selectedColumns = useSelector(
    (state) => state.playground.currentData.selectedData
  );
  const [colWidth, setColWidth] = useState("90px");

  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    console.log("call get response");
    dispatch(getResponse());
    // setProducts(playGroundConstants.tableData.defaultData);
    // setSelectedColumns(playGroundConstants.tableData.selectedData);
  }, [dispatch]);

  useEffect(() => {
    setColWidth(columnWidth);
  }, [columnWidth]);

  useEffect(() => {
    if (addRow) {
      console.log("Adding new Row");
      const res =dispatch(addrow());
      // console.log(res)
      // setSelectedProducts(products[products.length])
    }
  }, [addRow, dispatch]);

  useEffect(() => {
    console.log(selectedProducts);
    dispatch(selectedProductChange(selectedProducts))
  }, [selectedProducts]);

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={playGroundConstants.tableData.statuses}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => options.editorCallback(e.value)}
        itemTemplate={(option) => {
          return (
            <span
              className={`product-badge status-${option.value.toLowerCase()}`}
            >
              {option.label}
            </span>
          );
        }}
      />
    );
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const dynamicColumns = selectedColumns?.map((col, i) => {
    if (col.isType === "0") {
      return (
        <Column
          id={`header ${col.field}`}
          key={col.field}
          field={col.field}
          header={col.header}
          // colSpan="2"
          editor={(options) => statusEditor(options)}
          onCellEditComplete={``}
          filter
          style={{
            minWidth: colWidth,

            height: "56px",
            fontSize: "12px",
            background: "#FFFFFF",
          }}
          showFilterMenu={false}
          filterPlaceholder="All"
          filterField={col.field}
        />
      );
    } else if (col.isType === "1") {
      return (
        <Column
          id={`header ${col.field}`}
          key={col.field}
          field={col.field}
          header={col.header}
          editor={(options) => textEditor(options)}
          filter
          style={{
            "min-width": colWidth,

            height: "56px",
            fontSize: "12px",
            background: "#E1EAED",
          }}
          showFilterMenu={false}
          filterPlaceholder="All"
          filterField={col.field}
        />
      );
    } else {
      return (
        <Column
          id={`header ${col.field}`}
          key={col.field}
          field={col.field}
          header={col.header}
          filter
          style={{
            "min-width": colWidth,

            height: "56px",
            fontSize: "12px",
            background: "#96BAC2",
          }}
          showFilterMenu={false}
          filterPlaceholder="All"
          filterField={col.field}
        />
      );
    }
  });

  const getWidthOfDataTable = () => {
    // console.log(selectedColumns)
    let tableWidth = selectedColumns?.length;
    if (window.innerWidth <= 600) {
      tableWidth = tableWidth * 41;
    } else if (window.innerWidth > 1500) {
      tableWidth = tableWidth * 15;
    } else if (window.innerWidth > 1200) {
      tableWidth = tableWidth * 19;
    } else if (window.innerWidth > 992) {
      tableWidth = tableWidth * 33;
    } else if (window.innerWidth > 768) {
      tableWidth = tableWidth * 35;
    } else if (window.innerWidth > 600) {
      tableWidth = tableWidth * 38;
    }
    // return tableWidth > 100 ? `${tableWidth}%` : '100%'
    return `${tableWidth}%`;
  };

  return (
    <div>
      <div className={classes.container} id="tableContainer" ref={tableRef}>
        <DataTable
          id="dataTable"
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => {
            // console.log(e.value)
            setSelectedProducts(e.value);
            // dispatch(selectedProductChange(e.val))
          }}
          editMode="cell row"
          className="editable-cells-table"
          stripedRows
          first={first}
          rows={rows}
          onPage={onCustomPage}
          resizableColumns
          columnResizeMode="expand"
          responsiveLayout="scroll"
          emptyMessage="Loading Data"
          size="medium"
          scrollHeight="calc(100vh - 340px)"
          style={{ width: getWidthOfDataTable() }}
          className={classes.datatableContainer}
          showGridlines
         
        >
          {/* {columns.map(({ field, header }) => {
            return (
              <Column
                key={field}
                field={field}
                header={header}
                style={{ width: "25%" }}
                body={field === "price" && priceBodyTemplate}
                editor={(options) => cellEditor(options)}
                onCellEditComplete={onCellEditComplete}
              />
            );
          })} */}
          <Column
            selectionMode="multiple"
            style={{ width: "2rem", fontSize: "12px" }}
            exportable={false}
          ></Column>
          {dynamicColumns}
        </DataTable>
      </div>
    </div>
  );
};

export default PlayGroundTable;
