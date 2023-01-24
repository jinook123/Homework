import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SideNavOuterToolbar as SideNavBarLayout } from './layouts';
import Home from 'pages/home/components/Home';

export default function Content() {
    
    return (
        <SideNavBarLayout title={'환영합니다.'}>
            <Switch>
                <Route exact key={'/home'} path={'/home'} component={Home} />
                
                <Redirect to={'/home'} />
            </Switch>
        </SideNavBarLayout>
    );
}
