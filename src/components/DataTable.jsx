import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./DataTable.css";

import {
  deleteMultipleRows,
  deleteRow,
  fetchUsers,
  resetChanges,
  savechanges,
  undo,
  updateUser,
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

const DataTableEx = () => {
  const dispatch = useDispatch();
  // const [post, setPost] = useState([]);

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
  const changesDone = useSelector((state) => state.userStore.changesDone);
  const pastLength = useSelector((state) => state.userStore.past.length);

  // const [productDialog, setProductDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);

  const [deleteDialog, setDeleteDialog] = useState(false);
  // const [user, setProduc] = useState(emptyProduct);

  const [selectedUsers, setSelectedUsers] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        className="columns"
        key={col.field}
        field={col.field}
        header={col.header}
        editor={(options) => textEditor(options)}
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
            onClick={openNew}
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
    setDeleteDialog(false)
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

  const showDeleteDialog = () => {
    setDeleteDialog(true);
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

        <DataTable
          ref={dt}
          value={users}
          header="User Data"
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
          editMode="row"
          onRowEditComplete={onRowEditComplete}
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
          {dynamicColumns}
        </DataTable>

        <div className="bottom-actions">
          <Button
            label="Revert to start of the Day"
            icon="pi pi-refresh"
            className="p-button-help"
            onClick={() => {
              dispatch(resetChanges());
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "All changes are dicarded",
                life: 3000,
              });
            }}
            disabled={!changesDone}
          />

          <Button
            label="save"
            icon="pi pi-save"
            className="p-button-success"
            onClick={() => dispatch(savechanges())}
            disabled={!changesDone}
          />
        </div>
      </div>

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
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default DataTableEx;
