import { Switch, Route, Redirect} from 'react-router-dom'
import React from 'react'
import { privateRoutes, publicRoutes, routeNames } from '../../Router';
import {useTypedSelector} from '../../Hooks/useTypedSelector'
import Player from '../Player/Player';
import Navbar from '../Navbar/Navbar';


const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth)

    return (
        isAuth 
        ?
        <>
            <Navbar/>
            <Switch>
                { privateRoutes.map(route => <Route {...route}/>) }
                <Redirect to={routeNames.MAIN}/>   
            </Switch>
            <Player/>
        </>
        :
        <Switch>
            { publicRoutes.map(route => <Route {...route}/>) }   
            <Redirect to={routeNames.LOGIN}/>   

        </Switch>

    )
}

export default AppRouter
