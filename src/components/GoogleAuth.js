import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signOut, signIn } from "../actions";

const GoogleAuth = ({ isSignedIn, signIn, signOut }) => {
  useEffect(() => {
    window.onload = function () {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            clientId:
              "683349960011-79ddlkpqu4t0645dtmr70161si1f7joa.apps.googleusercontent.com",
            scope: "email",
          })
          .then(() => {
            const auth = window.gapi.auth2.getAuthInstance();
            auth.isSignedIn.listen((isSignedIn) =>
              onAuthChange(isSignedIn, auth.currentUser.get().ya)
            );
            onAuthChange(auth.isSignedIn, auth.currentUser.get().ya);
          });
      });
    };
  }, []);

  const onAuthChange = (isSignedIn, userId) => {
    if (isSignedIn) signIn(userId);
    else signOut();
  };

  const onSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  if (isSignedIn === null) return null;

  if (isSignedIn)
    return (
      <button className="ui red google button" onClick={onSignOutClick}>
        <i className="google icon"></i>
        Sign Out
      </button>
    );

  return (
    <button className="ui red google button" onClick={onSignInClick}>
      <i className="google icon"></i>
      Sign In with Google
    </button>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
