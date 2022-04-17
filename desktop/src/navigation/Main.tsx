import React from 'react';
import AppDrawer from './AppDrawer';
import { Route, withRouter, useHistory } from 'react-router-dom';
import StringPage from '../pages/StringPage';
import HashePage from '../pages/HashePage';
import ListPage from '../pages/ListPage';
import HomePage from '../pages/Home';
import LoginPage from './Login';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated } from '../services/AppSecurity';


const classNames = require('classnames');



export default function MainWindow() {
 
  const [auth, setAuth] = React.useState(true);

  const [showSideBar, setShowSideBar] = React.useState(true);


  const stateResult = useSelector((state: any) => state.user);

  const history = useHistory();

  const handleChange = (event: any) => {
    setAuth(event.target.checked);
  };





  const renderDrawer = () => {

    if (stateResult && stateResult.user && showSideBar) {

      const utility = {};

      const authentication = {};

      return (

        <AppDrawer
          utility={utility}
          authentication={authentication}
        />

      );


    } else return null;


  }

  const StringContext = isAuthenticated((props: any): any => {

    return (
      <StringPage
        contextKey={props.location.state}

      />
    );
  });


  const HasheContext = isAuthenticated((props: any): any => {

    return (
      <HashePage
        contextKey={props.location.state}

      />
    );
  });


  const ListContext = isAuthenticated((props: any): any => {

    return (
      <ListPage
        contextKey={props.location.state}

      />
    );
  });


  const Dashboard = isAuthenticated((props: any): any => {
    return (
      <HomePage
        users={props.users}
        fetchUsers={props.fetchUsers}
        materialChartData={props.materialCharts}
      />
    );
  }
  );

  const renderAccount = (props: any): any => {

    return (
      <LoginPage
      />
    );
  };


  return (
    <div className="flex w-screen h-screen text-gray-700">
      {renderDrawer()}
      <main className="flex flex-col flex-grow px-2">
        <Route path='/' exact={true} component={Dashboard} />
        <Route path='/StringContext' component={StringContext} />
        <Route path='/HasheContext' component={HasheContext} />
        <Route path='/ListContext' component={ListContext} />
        <Route path='/account' render={renderAccount} />
      </main>

    </div>

  )
}
