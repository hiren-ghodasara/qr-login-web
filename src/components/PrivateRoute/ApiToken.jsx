import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Tag } from "antd";
import { getAllApiTokens, revokeToken } from "../../actions/userAction";

const ApiToken = (props) => {
  const tokens = useSelector((state) => state.user.tokens);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllApiTokens());
  }, []);
  const deleteToken = (token) => {
    console.log("token", token);
    dispatch(revokeToken(token.id));
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => deleteToken(record)} type="link">
          Delete
        </Button>
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
