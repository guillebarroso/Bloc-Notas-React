import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Admin from './components/Admin';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Reset from './components/Reset';
import {auth} from './firebase'



const App = () => {

  const [firebaseuser, setFirebaseuser] = React.useState(false)

  React.useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if (user) {
        setFirebaseuser(user)
      } else {
        setFirebaseuser(null)
      }
    })
  }, [])


  return ( firebaseuser !== false && (
    <Router>
      <div className="container">
        <Navbar firebaseuser={firebaseuser}/>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/reset">
            <Reset/>
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/" exact>
            <Inicio/>
          </Route>
        </Switch>
        
      </div>
    </Router>
  )
  );
};

export default App;
