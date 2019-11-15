import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Popconfirm, Button, message } from "antd";
import { getAllApiTokens, revokeToken } from "../../../actions/apiTokenAction";

const ApiToken = (props) => {
  const tokens = useSelector((state) => state.apiTokenReducer.tokens);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllApiTokens());
  }, [dispatch]);
  const deleteToken = (token) => {
    console.log("token", token);
    dispatch(revokeToken(token.id)).then((res) => {
      message.success("Click on Yes");
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Expires At",
      dataIndex: "expires_at",
      key: "expires_at",
    },
    {
      title: "Revoke",
      key: "action",
      render: (text, record) => (
        <Popconfirm title="Are you sure delete this task?" onConfirm={() => deleteToken(record)} okText="Yes" cancelText="No">
          <Button type="link">Revoke</Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <Table rowKey="id" bordered columns={columns} dataSource={tokens} />
        </div>
      </div>
    </div>
  );
};

export default ApiToken;
