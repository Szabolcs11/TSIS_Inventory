import React from "react";

function Records({ filteredItems }) {
  // console.log("a");
  return filteredItems.map((i) => {
    return (
      <div className="list_row" key={i.id}>
        <div className="row_name">{i.id}</div>
        <div className="row_id">{i.InventoryID}</div>
        <div className="row_name">{i.Name}</div>
        <div className="row_type">{i.Quantity}</div>
        <div className="row_room">{i.Classroom}</div>
      </div>
    );
  });
}

export default Records;
