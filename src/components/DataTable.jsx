import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ReactDOM from "react-dom";
import "./DataTable.css";
import { Tooltip } from "primereact/tooltip";
// import {Modal} from 'primereact'
import dark from "../assets/dark.png";
import light from "../assets/light.png";

import {
  deleteMultipleRows,
  deleteRow,
  fetchUsers,
  resetChanges,
  savechanges,
  undo,
  updateUser,
  addRow,
  addMultipleRows,
  addPrimaryRow,
  addPrimaryMultipleRows,
  updateCellEdit,
} from "../redux/usersSlice";
import { useSelector, useDispatch } from "react-redux";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import CustomModal from "./Modal";
import PlayGroundTable from "./plsygtound";
import {
  addrow,
  chnageColumnDenisity,
  moveToModifier,
} from "../redux/productsSlice";
import ModifierTable from "./ModifierTable";

const DataTableEx = () => {
  const dispatch = useDispatch();
  // const [post, setPost] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [columnSize, setColumnSize] = useState("7.14%");

  const initialColumns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
    { field: "username", header: "username" },
    { field: "email", header: "email" },
    { field: "address.street", header: "street" },
    { field: "address.suite", header: "suite" },
    { field: "address.city", header: "city" },
    { field: "address.zipcode", header: "zipcode" },
    { field: "phone", header: "phone" },
    { field: "website", header: "website" },
    { field: "company.name", header: "company-name" },
    { field: "company.catchPhrase", header: "company-pharse" },
    { field: "company.bs", header: "company-bs" },
  ];

  const [columns, setColumns] = useState(initialColumns);

  const users = useSelector((state) => state.userStore.present);
  const newTable = useSelector((state) => state.userStore.newTable);
  const oldItems = useSelector((state) => state.userStore.oldItems);
  const changesDone = useSelector((state) => state.userStore.changesDone);
  const pastLength = useSelector((state) => state.userStore.past.length);

  // const [productDialog, setProductDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [rowColor, setRowColor] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  // const [user, setProduc] = useState(emptyProduct);

  const [selectedUsers, setSelectedUsers] = useState(null);

  //images toggle
  const [highActive, setHighActive] = useState(false);
  const [defaultActive, setDefaultActive] = useState(true);
  const [lowActive, setLowActive] = useState(false);

  const noOfColumns = useSelector((state) => state.playground.columnDensity);

  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (noOfColumns === 0 || noOfColumns === null) {
      setDefaultActive(true);
      setHighActive(false);
      setLowActive(false);
    } else if (noOfColumns === 7) {
      setDefaultActive(false);
      setHighActive(true);
      setLowActive(false);
    } else if (noOfColumns === 12) {
      setDefaultActive(false);
      setHighActive(false);
      setLowActive(true);
    }
  }, [noOfColumns]);

  const chnageColumn = (val) => {
    if (val === 0 && defaultActive === false) {
      dispatch(chnageColumnDenisity(0));
    }
    if (val === 7 && highActive === false) {
      dispatch(chnageColumnDenisity(7));
    }
    if (val === 12 && lowActive === false) {
      dispatch(chnageColumnDenisity(12));
    }
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
  const isPositiveInteger = (val) => {
    let str = String(val);
    str = str.trim();
    if (!str) {
      return false;
    }
    str = str.replace(/^0+/, "") || "0";
    let n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  };

  const cellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    console.log("rowdata", rowData);
    console.log("newvalyue:", newValue);
    console.log("event:", e);
    dispatch(updateCellEdit(e));
  };

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        className="columns"
        key={col.field}
        field={col.field}
        header={col.header}
        editor={(options) => textEditor(options)}
        onCellEditComplete={cellEditComplete}
        style={{
          width: columnSize,
          padding: "1rem",
          overflow: "hidden",
          // height: "3rem",
        }}
      />
    );
  });

  const openNew = () => {
    // setProduct(emptyProduct);
    // setSubmitted(false);
    // setProductDialog(true);
  };

  const importCSV = (e) => {
    // const file = e.files[0];
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const csv = e.target.result;
    //   const data = csv.split("\n");
    //   // Prepare DataTable
    //   const cols = data[0].replace(/['"]+/g, "").split(",");
    //   data.shift();
    //   const importedData = data.map((d) => {
    //     d = d.split(",");
    //     const processedData = cols.reduce((obj, c, i) => {
    //       c =
    //         c === "Status"
    //           ? "inventoryStatus"
    //           : c === "Reviews"
    //           ? "rating"
    //           : c.toLowerCase();
    //       obj[c] = d[i].replace(/['"]+/g, "");
    //       (c === "price" || c === "rating") && (obj[c] = parseFloat(obj[c]));
    //       return obj;
    //     }, {});
    //     processedData["id"] = createId();
    //     return processedData;
    //   });
    //   const _products = [...userss, ...importedData];
    //   setPro(_products);
    // };
    // reader.readAsText(file, "UTF-8");
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };
  const leftToolbarTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="bottom-actions">
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => {
              dispatch(addrow());
            }}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={showDeleteDialog}
            disabled={!selectedUsers || !selectedUsers.length}
          />
          <Button
            label="Undo"
            icon="pi pi-undo"
            className="p-button-help"
            disabled={pastLength === 0}
            onClick={() => {
              dispatch(undo());
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Undo success",
                life: 3000,
              });
            }}
            // disabled={!selectedUsers || !selectedUsers.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode="basic"
          name="demo[]"
          auto
          url="https://primefaces.org/primereact/showcase/upload.php"
          accept=".csv"
          chooseLabel="Import"
          className="mr-2 inline-block"
          onUpload={importCSV}
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const buttonHandler = (cols) => {
    let size = 100 / cols;
    setColumnSize(`${size}%`);
  };

  const onRowEditComplete = (e) => {
    let _usres2 = [...users];
    let { newData, index } = e;
    _usres2[index] = newData;
    console.log("e:", e);
    console.log(_usres2);

    dispatch(updateUser(_usres2));
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "User Updated",
      life: 3000,
    });
  };

  const deleteRowData = () => {
    console.log(selectedUsers);
    // dispatch(deleteRow(rowData));
    if (selectedUsers.length === 1) {
      dispatch(deleteRow(selectedUsers[0]));
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "User Deleted",
        life: 3000,
      });
    } else {
      // selectedUsers.map((user) => {
      //   return dispatch(deleteRow(user));
      // });
      dispatch(deleteMultipleRows(selectedUsers));
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Users Deleted",
        life: 3000,
      });
    }
    setSelectedUsers(null);
    setDeleteDialog(false);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
        /> */}
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => deleteRowData(rowData)}
        />
      </React.Fragment>
    );
  };

  const hideDeleteProductsDialog = () => {
    setDeleteDialog(false);
  };
  const hideAddProductsDialog = () => {
    setAddDialog(false);
  };

  const showDeleteDialog = () => {
    setDeleteDialog(true);
  };
  const showAddUserDialog = () => {
    setAddDialog(true);
  };
  const addUserToTable = () => {
    if (selectedUsers.length === 1) {
      dispatch(addRow(selectedUsers[0]));
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "User added",
        life: 3000,
      });
    } else {
      dispatch(addMultipleRows(selectedUsers));
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Users added",
        life: 3000,
      });
    }
    setSelectedUsers(null);
  };
  const addUserToPrimaryTable = () => {
    if (selectedUsers.length === 1) {
      dispatch(addPrimaryRow(selectedUsers[0]));
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "User added",
        life: 3000,
      });
    } else {
      dispatch(addPrimaryMultipleRows(selectedUsers));
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Users added",
        life: 3000,
      });
    }
    setSelectedUsers(null);
  };

  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteRowData}
      />
    </React.Fragment>
  );
  const addNewItemsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideAddProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={addUserToTable}
      />
    </React.Fragment>
  );

  var resizableSpan = "";
  try {
    resizableSpan = document.getElementsByClassName("p-column-resizer");
    for (let k = 0; k < resizableSpan.length; k++) {
      resizableSpan[k].addEventListener("mouseover", function (e) {
        for (var i = 0; i < document.getElementsByTagName("tr").length; i++) {
          document.getElementsByTagName("tr")[i].childNodes[
            k
          ].style.borderRight = "2px solid #0044ff";
        }
      });
      resizableSpan[k].addEventListener("mouseout", function (e) {
        for (var i = 0; i < document.getElementsByTagName("tr").length; i++) {
          document.getElementsByTagName("tr")[i].childNodes[
            k
          ].style.borderRight = "";
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
  const rowColorHandler = (row) => {
    if (oldItems.some((y) => y.id === row.id)) {
      return false;
    } else return true;
  };
  const primaryRowColorHandler = (row) => {
    if (oldItems.some((y) => y.id === row.id)) {
      return true;
    } else return false;
  };

  return (
    <div className="data-table">
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        <div className="actions">
          <button onClick={() => buttonHandler(14)}>All</button>
          <button onClick={() => buttonHandler(1)}>1</button>
          <button onClick={() => buttonHandler(3)}>3</button>
          <button onClick={() => buttonHandler(4)}>4</button>
          <button onClick={() => buttonHandler(5)}>5</button>
          <button onClick={() => buttonHandler(6)}>6</button>
          <button onClick={() => buttonHandler(7)}>7</button>
        </div>
      </div>

      <div className="images">
        <div
          className="high"
          onClick={() => {
            chnageColumn(7);
          }}
        >
          <label htmlFor="">High</label>
          {highActive ? <img src={light} alt="" /> : <img src={dark} alt="" />}
        </div>
        <div
          className="default"
          onClick={() => {
            chnageColumn(0);
          }}
        >
          <label htmlFor="">Default</label>
          {defaultActive ? (
            <img src={light} alt="" />
          ) : (
            <img src={dark} alt="" />
          )}
        </div>
        <div
          className="low"
          onClick={() => {
            chnageColumn(12);
          }}
        >
          <label htmlFor="">Low</label>
          {lowActive ? <img src={light} alt="" /> : <img src={dark} alt="" />}
        </div>
      </div>

      {/* playgrounf */}
      <div className="playground">
        <PlayGroundTable columnWidth={columnSize} />

        <div className="bottom-actions">
          <Button
            // label='Revert to start of the Day'
            icon="pi pi-arrow-down"
            id="arrow"
            className="p-button-help"
            onClick={() => {
              dispatch(moveToModifier());
              
            }}
          />
          <Button
            // label='Revert to start of the Day'
            icon="pi pi-arrow-up"
            id="arrow"
            className="p-button-help"
          />
        </div>
      </div>
      <div className="modifier">
        <ModifierTable columnWidth={columnSize} />
      </div>

      {/* <DataTable
        resizableColumns
        columnResizeMode="fit"
        ref={dt}
        value={users}
        rowClassName={(e) => (primaryRowColorHandler(e) ? "green" : null)}
        header="User Data 1"
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        scrollDirection="both"
        scrollable
        scrollHeight="500px"
        paginator
        rows={5}
        globalFilter={globalFilter}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        // editMode="row"
        editMode="cell"
        selectionMode="checkbox"
        // onRowEditComplete={onRowEditComplete}
        selection={selectedUsers}
        onSelectionChange={(e) => setSelectedUsers(e.value)}
      >
        <Column
          selectionMode="multiple"
          style={{ width: "3rem" }}
          exportable={false}
        ></Column>
        <Column
          rowEditor
          style={{ width: "6rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
        {/* <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column> */}
      {/* {dynamicColumns} */}
      {/* </DataTable> */}

      {/* <div className="bottom-actions">
        <Button
          // label='Revert to start of the Day'
          icon="pi pi-arrow-down"
          id="arrow"
          className="p-button-help"
          onClick={addUserToTable}
        />
        <Button
          // label='Revert to start of the Day'
          icon="pi pi-arrow-up"
          id="arrow"
          className="p-button-help"
          onClick={addUserToPrimaryTable}
        />

        <Button
          label="View"
          id="view"
          icon="pi pi-save"
          className="p-button-success"
          onClick={() => setIsOpen(true)}
        />
      </div> */}

      {/* {ReactDOM.createPortal(
        isOpen && (
          <CustomModal setIsOpen={setIsOpen}>
            <DataTable
              resizableColumns
              columnResizeMode="fit"
              ref={dt}
              value={users}
              header="User Data3"
              dataKey="id"
              responsiveLayout="scroll"
              showGridlines
              scrollDirection="both"
              scrollable
              scrollHeight="500px"
              paginator
              rows={5}
              globalFilter={globalFilter}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              // editMode="row"
              editMode="cell"
              // onRowEditComplete={onRowEditComplete}
              selection={selectedUsers}
              onSelectionChange={(e) => setSelectedUsers(e.value)}
            >
              <Column
                selectionMode="multiple"
                style={{ width: "3rem" }}
                exportable={false}
              ></Column>
              <Column
                rowEditor
                style={{ width: "6rem" }}
                bodyStyle={{ textAlign: "center" }}
              ></Column>
              {/* <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column> */}
      {/* {dynamicColumns} */}
      {/* </DataTable> */}
      {/* // </CustomModal> */}
      {/* ), */}
      {/* // document.getElementById("root") */}
      {/* // )}  */}
      <Dialog
        visible={deleteDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {selectedUsers && (
            <span>Are you sure you want to add the selected products?</span>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={addDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={addNewItemsDialogFooter}
        onHide={hideAddProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {selectedUsers && (
            <span>Are you sure you want to add the selected products?</span>
          )}
        </div>
      </Dialog>

      {/* <DataTable
        resizableColumns
        columnResizeMode="fit"
        ref={dt}
        value={newTable}
        rowClassName={(e) => (rowColorHandler(e) ? "red" : null)}
        header="User Data2"
        dataKey="id"
        responsiveLayout="scroll"
        showGridlines
        scrollDirection="both"
        scrollable
        scrollHeight="500px"
        paginator
        rows={5}
        globalFilter={globalFilter}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        editMode="cell"
        // onRowEditComplete={onRowEditComplete}
        selection={selectedUsers}
        onSelectionChange={(e) => setSelectedUsers(e.value)}
      >
        <Column
          selectionMode="multiple"
          style={{ width: "3rem" }}
          exportable={false}
        ></Column>
        <Column
          rowEditor
          style={{ width: "6rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
        {/* <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column> */}
      {/* {dynamicColumns} */}
      {/* </DataTable> */}
      <Tooltip
        target=".red"
        content="Element recently added"
        mouseTrack
        mouseTrackLeft={10}
      />
      <Tooltip
        target=".p-selectable-row"
        content="Element recently added"
        mouseTrack
        mouseTrackLeft={10}
      />
    </div>
  );
};

export default DataTableEx;
