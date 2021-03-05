import React, { Suspense, useState, useEffect, useMemo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/index";
import NotFound from "./components/common/NotFound";
import Footer from "./components/Footer";
import Register from "./components/Signin/Register";
import Profile from "./components/Signin/Profile";
import VerifyEmail from "./components/Signin/VerifyEmail";
import Countries from "./components/Countries";
import Login from "./components/Signin/Login";
import Signout from "./components/Signout";
import Socecocab from "./components/Socecocab";
import Spcomm from "./components/Spcomm";
import Reports from "./components/Reports";
import Meetings from "./components/Meetings";
import Negotiate from "./components/Negotiate";
import Products from "./components/Products";
import auth from "./services/authService";
import Menubar from "./components/Menubar";
import ScrollToTop from "./components/common/ScrollToTop";
import { UserContext } from "./services/UserContext";
import { ToastContainer } from "react-toastify";
import MainHeader from "./components/MainHeader/index";
import FormalMeetings from "./components/Meetings/FormalMeetings";
import UpcomingMeetings from "./components/Meetings/UpcomingMeetings";
import CreatePasscode from "./components/Settings/CreatePasscode";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Invitation from "./components/Negotiate/Invitation";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-dropdown-tree-select/dist/styles.css";

function App() {
  const [user, setUser] = useState({});
  const [reps, setReps] = useState({});

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    setUser(auth.getUser());
  }, []);
  const Loader = () => (
    <div>
      <img src="/images/logo.png" alt="logo" />
      <div>loading...</div>
    </div>
  );

  const handleSelect = eventKey => {
    setReps(eventKey);
  };

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <main style={{ background: "#f9f9f9" }}>
          <ScrollToTop />
          <UserContext.Provider value={value}>
            <MainHeader />
            <Menubar onSelect={handleSelect} />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/countries" component={Countries} />
              <Route path="/createpasscode" component={CreatePasscode} />
              <Route path="/signout" component={Signout} />
              <Route path="/socecocab" component={Socecocab} />
              <Route
                path="/spcomm"
                render={props => <Spcomm {...props} comReps={reps} />}
              />
              <Route path="/reports" component={Reports} />
              <Route path="/meetings" component={Meetings} />
              <Route
                path="/meetings/formalmeetings"
                component={FormalMeetings}
              />
              <Route path="/meetings/negotiation" component={Negotiate} />
              <Route
                path="/meetings/upcomingmeetings"
                component={UpcomingMeetings}
              />
              <ProtectedRoute path="/negotiation" component={Negotiate} />
              <Route path="/products" component={Products} />
              <Route path="/verify-email" component={VerifyEmail} />
              <Route path="/invitation" component={Invitation} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact component={Home} />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/not-found" />
            </Switch>
            <Footer />
          </UserContext.Provider>
        </main>
      </Suspense>
    </>
  );
}

export default App;
