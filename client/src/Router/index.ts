import React from 'react';
import Login from '../Pages/Login'
import Registration from '../Pages/Registration'
import MainPage from '../Pages/MainPage'
import MyMusic from '../Pages/MyMusic'


export interface iRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum routeNames {
    LOGIN = '/login',
    REGISTRY = '/registration',
    MAIN = '/',
    MYMUSIC = '/my'
}

export const publicRoutes :iRoute[] = [
    { path: routeNames.LOGIN, exact: true, component: Login },
    { path: routeNames.REGISTRY, exact: true, component: Registration },

]

export const privateRoutes :iRoute[] = [
    { path: routeNames.MAIN, exact: true, component: MainPage },
    { path: routeNames.MYMUSIC, exact: true, component: MyMusic },
]