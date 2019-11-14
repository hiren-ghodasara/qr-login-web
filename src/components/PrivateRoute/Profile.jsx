import React, { Component } from "react";
import { Form, Input, Button } from "antd";

class ProfileForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container py-5">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="row">
            <div className="col-sm-6 mb-6">
              <Form.Item label="First Name">
                {getFieldDecorator("first_name", {
                  rules: [{ required: true, message: "Please input your first name!" }],
                })(<Input size="large" placeholder="First Name" />)}
              </Form.Item>
            </div>
            <div className="col-sm-6 mb-6">
              <Form.Item label="Last Name">
                {getFieldDecorator("last_name", {
                  rules: [{ required: true, message: "Please input your last name!" }],
                })(<Input size="large" placeholder="Last Name" />)}
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Profile = Form.create({ name: "profile_edit" })(ProfileForm);
export default Profile;
