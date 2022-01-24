import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import ImageMenu from './menu';
import Image from './image';

interface MatchParams {
    path: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

const Goals = (props: Props) => (
    <Switch>
        <Route path={`${props.match.path}image/:id`} exact component={Image}/>
        <Route path="" exact component={ImageMenu}/>    
    </Switch>
);

export default Goals;