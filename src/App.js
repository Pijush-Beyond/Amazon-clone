import React from 'react';
import './App.css';
import Header from './comonents/Header/js/Header';
import Home from './comonents/Home/js/Home';
import 'react-router-dom';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Checkout from './comonents/Checkout/js/Checkout';
import { ClassStateContext, ClassStateProvider, saveForLaterContext, whishListContext, /*StateProvider*/ } from './comonents/API/StateProvider';
// import { intialState, reducer } from './comonents/API/Reduer';
import { contextvalue, saveForLaterList, wishList } from "./comonents/API/Context";
import Login from './comonents/Login/Js/Login';

function App() {
  return ( 
    <div className="App" >
      <ClassStateProvider initialState = {contextvalue} context = {ClassStateContext} >
        <ClassStateProvider initialState={saveForLaterList} context={saveForLaterContext}>
          <ClassStateProvider initialState={wishList} context={whishListContext}>
            <Router>
              <Switch>
                <Route path='/login'>
                  <Login/>
                </Route>
                <Route to='/'>
                  <Header />
                  <Switch>
                    <Route path='/checkout'>
                      <Checkout />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </Route>
              </Switch>
            </Router>
          </ClassStateProvider>
        </ClassStateProvider>
      </ClassStateProvider>
    </div>
  );
}

export default App;