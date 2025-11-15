import React from "react";
import { Route } from "wouter";
import MainView from "./components/main-view/MainView";
import { ProtectedRoute } from "./components/admin-panel/ProtectedRoute.jsx";
import { AdminLogIn, AdminMain } from "./components/admin-panel/index.js";

const App = () => {
  return (
    <div>
      <Route path="/admin/logIn" component={AdminLogIn} />
      <Route path="/admin/main">
        <ProtectedRoute>
          <AdminMain></AdminMain>
        </ProtectedRoute>
      </Route>
      <Route path="/" component={MainView} />
    </div>
  );
};

export default App;
