import Layout from './components/Layout'
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from './components/Main'
import Cart from './components/Cart'
import Details from './components/Details';
import Login from './components/Login';
import { useSelector } from 'react-redux';

const App = () => {
  const user = useSelector(state => state.user.user)

  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact children={<Main />} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/product/details/:productId" exact component={Details} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Layout>
      {user === null && <Redirect to="/login" />}
    </>
  )
}

export default App
