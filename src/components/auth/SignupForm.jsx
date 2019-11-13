import React from "react";
import { Form, Input, Button } from "antd";
import faker from "faker";
const FormItem = Form.Item;

const SignUpForm = Form.create({
  name: "signup_form"
})(props => {
  const { getFieldDecorator } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.onSubmit(values);
      }
    });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const patchDummyData = () => {
    props.form.setFieldsValue({
      first_name: faker.name.firstName(),
      last_name: faker.name.firstName(),
      email: faker.internet.email(),
      password: `12345`,
      password_confirmation: `12345`
    });
  };
  console.log("in", new Date());
  return (
    <Form onSubmit={handleSubmit}>
      <FormItem className="mb-0">
        {getFieldDecorator("first_name", {
          rules: [{ required: true, message: "First Name is required!" }]
        })(<Input placeholder="First Name" />)}
      </FormItem>
      <FormItem className="mb-0">
        {getFieldDecorator("last_name", {
          rules: [{ required: true, message: "Last Name is required!" }]
        })(<Input placeholder="Last Name" />)}
      </FormItem>
      <FormItem className="mb-0">
        {getFieldDecorator("email", {
          rules: [
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Email is required!" }
          ]
        })(<Input placeholder="Email" />)}
      </FormItem>
      <FormItem className="mb-0">
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Password is required!" }]
        })(<Input type="password" placeholder="Password" />)}
      </FormItem>
      <FormItem className="mb-0">
        {getFieldDecorator("password_confirmation", {
          rules: [
            { required: true, message: "Password Confirmation is required!" },
            { validator: compareToFirstPassword }
          ]
        })(<Input type="password" placeholder="Password Confirmation" />)}
      </FormItem>
      <FormItem className="mt-3">
        <Button type="primary" htmlType="submit" block>
          Sign Up
        </Button>
        <Button type="primary" onClick={patchDummyData} block>
          Patch Data
        </Button>
      </FormItem>
    </Form>
  );
});

export default SignUpForm;
