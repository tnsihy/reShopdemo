import React from 'react'
import clsx from 'clsx'
import { leftNav } from '../static/navInfo'

import {
    AppBar, Typography, Toolbar, IconButton,
    Drawer, List, ListItem, ListItemText,
    Divider, ListItemIcon, useTheme,
    makeStyles, createStyles
} from '@material-ui/core'

import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles((theme) =>
    createStyles({
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: '#409EFF'
        },
        appBarShift: {
            width: `calc(100% - 240px)`,
            marginLeft: 240,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
            color: '#fff'
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: 240,
            flexShrink: 0,
        },
        drawerPaper: {
            width: 240,
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

export default function Navigation({ open, handleDrawerOpen, handleDrawerClose }) {

    const theme = useTheme()
    const classes = useStyles()

    return (
        <div>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">购物书城</Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                open={open}
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction = 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {leftNav.map((item) => (
                        <ListItem key={item.id} button component={Link} to={item.to}>
                            <ListItemIcon>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-` + item.icon}></use>
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary={item.nav} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}