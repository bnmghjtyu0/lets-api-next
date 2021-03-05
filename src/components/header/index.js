import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// core components
import Drawer from "../drawer";
import headerStyle from "./headerStyle";
import { primaryColor } from "../../assets/css/main";

function Header({ ...props }) {
  const { classes } = props;
  return (
    <AppBar style={{ backgroundColor: primaryColor }}>
      <Toolbar className={classes.container}>
        <Drawer />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(headerStyle)(Header);
