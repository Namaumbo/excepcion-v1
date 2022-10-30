import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, Button, Segment, Icon } from "semantic-ui-react";
import ExceptionalLogo from "../Asserts/Logo.png";
import "./parentNav.css";

export default class ParentNav extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { icon }) => this.setState({ activeItem: icon });

  render() {
    const { activeItem } = this.state;
    return (
      <>
        <Segment secondary>
          <>
            <Menu secondary style={{ height: "80px" }}>
              <Link
                to="/blogs"
                style={{
                  textDecoration: "none",
                  marginTop: "1em",
                  fontSize: "18px",
                }}
              >
                <Menu.Item
                  active={activeItem === "bars"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="search"></Icon>
                </Menu.Item>
              </Link>

              <Link to="/song-list/" style={{
                  textDecoration: "none",
                  marginTop: "1em",
                  fontSize: "18px",
                }}>
                <Menu.Item
                  icon="list"
                  active={activeItem === "search"}
                  onClick={this.handleItemClick}
                />
              </Link>
              <Menu.Item
                active={activeItem === "button"}
                onClick={this.handleItemClick}
              >
                <Button color="orange" compact size="mini">
                  <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </Button>
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item />
                <Link to="/login">
                  <img
                    src={ExceptionalLogo}
                    alt="ExceptionalLogo"
                    width="300px"
                    height="300px"
                    className="logo"
                    style={{ marginTop: "-120px" }}
                  />
                </Link>
              </Menu.Menu>
            </Menu>
          </>
        </Segment>
        <Outlet />
      </>
    );
  }
}
