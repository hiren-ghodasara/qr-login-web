import React from "react";
import { Form, Input, Button } from "antd";
const FormItem = Form.Item;

const LoginForm = Form.create({
  name: "login_form",
})((props) => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.onSubmit(values);
      }
    });
  };

  const patchDummyData = () => {
    props.form.setFieldsValue({
      email: `demo2@user.com`,
      password: `123456`,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem className="mb-0">
        {getFieldDecorator("email", {
          //initialValue: "demo2@user.com",
          rules: [
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your email!" },
          ],
        })(<Input placeholder="E-mail Address" />)}
      </FormItem>
      <FormItem className="mb-0">
        {getFieldDecorator("password", {
          //initialValue: "123456",
          rules: [{ required: true, message: "Please input your Password!" }],
        })(<Input type="password" placeholder="Password" />)}
      </FormItem>
      <FormItem className="mt-3">
        <Button type="primary" htmlType="submit" block>
          Log in
        </Button>
        <Button type="primary" onClick={patchDummyData} block>
          Patch Data
        </Button>
      </FormItem>
    </Form>
  );
});

export default LoginForm;
