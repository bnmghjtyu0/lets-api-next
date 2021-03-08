import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Link from "next/link";
import { UserContext } from "@context/user";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <li>
          <Link ref={ref} href={to} {...linkProps}>
            <a>{primary}</a>
          </Link>
        </li>
      )),
    [to]
  );

  return (
    <ListItem button component={CustomLink}>
      <ListItemIcon>
        <DehazeIcon />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
}

export default function SwipeableTemporaryDrawer() {
  const router = useRouter();
  const classes = useStyles();
  const context = React.useContext(UserContext);

  React.useEffect(() => {
    context.getUser();
  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = async () => {
    localStorage.clear();
    context.setIsLogin(false);
    router.replace("/login");
    await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify({}),
    });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { name: "首頁", link: "/" },
          { name: "使用者列表", link: "/userlist" },
        ].map((text, index) => (
          <ListItemLink to={text.link} primary={text.name} />
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <DehazeIcon style={{ color: "#FFF" }} />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
          {context.state.isLogin && (
            <React.Fragment>
              {context.state.user.username}
              <Button onClick={handleLogout}>登出</Button>
            </React.Fragment>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
