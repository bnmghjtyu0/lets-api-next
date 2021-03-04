import "./assets/css/material-dashboard-react.css";
import "../styles/globals.css";
// core components
import Header from "./components/header";
import { withSession } from "next-session";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
