import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

import Images from '../../views/images';
import ImageUpload from '../../views/imageUpload';

function Layout() {

  const [isSideBarOpen, toggleSideBar] = React.useState(false);

  return (
    <>
        <Header toggleDrawer={toggleSideBar}/>
        <Sidebar isOpen={isSideBarOpen} toggleDrawer={toggleSideBar}/>
        <Switch>
          <Route
            path='/upload'
            component={ImageUpload}
            key={'upload'}
          />
          <Route
            path=''
            component={Images}
            key={'images'}
          />
        </Switch>
    </>
  );
}

export default Layout;
