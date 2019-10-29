import React from 'react'
import clsx from 'clsx'
import { Route, Redirect } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core'

import Store from '../pages/Store'
import ShopCar from '../pages/ShopCar'
import Order from '../pages/Order'

const useStyles = makeStyles((theme) =>
    createStyles({
        content: {
            flex: 1,
            padding: theme.spacing(1),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -240,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
    })
)
export default function Main({ open }) {
    const classes = useStyles()
    return (
        <div>
            <main className={clsx(classes.content, {
                [classes.contentShift]: open
            })}>
                <div className={classes.drawerHeader} />
                <Route path="/" exact component={(() =>
                    <Redirect to="/" />
                ), Store}></Route>
                <Route path="/shopcar" component={ShopCar}></Route>
                <Route path="/order" component={Order}></Route>
            </main>
        </div>
    )
}