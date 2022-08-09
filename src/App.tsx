import './App.scss'

// 导入路由
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

// 蹈入组件
import Layout from './pages/Layout'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <div className="app">
        <Route exact
          path="/"
          render={() => <Redirect to="/home"></Redirect>}>
          <Layout></Layout>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
      </div>
    </Router>
  )
}

export default App