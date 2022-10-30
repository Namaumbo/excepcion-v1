import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Form, Button, Input } from "semantic-ui-react";
import ExceptionalLogo from "../Asserts/Logo.png";
import "./login.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [color , setColor ]= useState("green")
  const [message , setMessage] = useState("Login")

  function aunthenticate() {
    setLoading(true);
    setTimeout(()=>{
        setLoading(false)
        setColor("red")
        setMessage("Not Aunthenticated")
    },2000)
  }

  return (
    <>
      <div style={{ height: "100vh", display: "flex" }}>
        <div className="login-page1">
          <img
            src={ExceptionalLogo}
            alt="ExceptionalLogo"
            width="600px"
            height="600px"
            className="logo"
          />
        </div>
        <div className="login-page2">
          <h2>Hello Again,</h2>
          <div>
            <Form>
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="User name"
                placeholder="excepcion"
              ></Form.Field>
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="Password"
                placeholder="password"
              ></Form.Field>

              {/* <Link to="admin"> */}
                {" "}
                <Button
                  type="submit"
                  color={color}
                  fluid
                  loading={loading}
                  onClick={aunthenticate}
                >
                  {message}
                </Button>
              {/* </Link> */}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
