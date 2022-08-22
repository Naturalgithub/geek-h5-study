import "./App.scss";

// 导入路由
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

// 蹈入组件
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import ProfileEdit from "./pages/Profile/Edit";

function App() {
  return (
    <Router>
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <Redirect to="/home"></Redirect>}
        ></Route>
        <Route path="/home" component={Layout}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/profile/edit">
          <ProfileEdit />
        </Route>
      </div>
    </Router>
  );
}

export default App;
