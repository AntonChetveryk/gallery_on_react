import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./Layout";
import Photos from "./pages/Photos";
import Albums from "./pages/Albums";
import Users from "./pages/Users";

export default class App extends React.Component {
  render() {
    return (
      <Router basename="/gallery_on_react">
        <Switch>
          <Layout>
            <Route exact path="/" component={Users} />
            <Route exact path="/albums/:userId" component={Albums} />
            <Route
              exact
              path="/albums/:userId/photos/:albumId"
              component={Photos}
            />
          </Layout>
        </Switch>
      </Router>
    );
  }
}
