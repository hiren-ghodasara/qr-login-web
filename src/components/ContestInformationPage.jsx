import React from "react";
import { Result, Button } from "antd";
const ContestInformationPage = (props) => {
  return (
    <div className="container">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, the server is wrong."
        extra={
          <Button type="primary" onClick={() => props.history.goBack()}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};
export default ContestInformationPage;
