import "./assets/css/material-dashboard-react.css";
import "../styles/globals.css";
// core components
import Header from "./components/header";
import { withSession } from "next-session";
export const getServerSideProps = withSession(async function ({ req, res }) {
  console.log('1231')
  // Get the user's session based on the request
  const user = req.session.get("user");

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
});

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
