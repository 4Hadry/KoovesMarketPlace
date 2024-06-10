import { useState } from "react";
import TableHOC from "../components/admin/TableHOC";
// import { Column } from "react-table";
import { Link } from "react-router-dom";

const column = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const [rows, setRows] = useState([
    {
      _id: "wnfkwnfenf",
      amount: 4000,
      quantity: 2,
      discount: 200,
      status: <span className="red">Processing</span>,
      action: <Link to={`/order/wqqeqeq`}>View</Link>,
    },
  ]);

  const Table = TableHOC(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  );
};

export default Orders;
