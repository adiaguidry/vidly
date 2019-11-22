import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class Register extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("password"),
    name: Joi.string()
      .required()
      .label("name")
  };

  doSubmit = () => {
    // Calls the server and redirects the user
    console.log("Submitted");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "Password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("register")}
      </form>
    );
  }
}

export default Register;
