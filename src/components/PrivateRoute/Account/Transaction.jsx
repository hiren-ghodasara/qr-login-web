import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { getAllTransaction } from "../../../actions/transactionAction";

const Transaction = (props) => {
  const transactionList = useSelector((state) => state.transactionReducer.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTransaction());
  }, [dispatch]);

  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];
  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <Table rowKey="id" bordered columns={columns} dataSource={transactionList} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
