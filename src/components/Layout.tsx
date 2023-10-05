import { Outlet } from "react-router-dom";
import Header from "./Header";
import classes from "./Layout.module.css";

function Layout() {
  return (
    <div className={classes.main_container}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
