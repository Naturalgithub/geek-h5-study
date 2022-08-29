import "./App.scss";

// 导入路由
import { Redirect, Route, Router } from "react-router-dom";
// 单独路由管理
// 蹈入组件
import Article from "./pages/Home/components/Article";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Chat from "./pages/Profile/Chat";
import ProfileEdit from "./pages/Profile/Edit";
import Search from "./pages/Search";
import history from "./utils/history";

function App() {
  return (
    <Router history={history}>
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
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/article/:id">
          <Article></Article>;
        </Route>
        <Route path="/search">
          <Search></Search>
        </Route>
      </div>
    </Router>
  );
}

export default App;
