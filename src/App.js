import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core'

import Navigation from './components/Navigation'
import Main from './components/Main'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex'
        }
    })
)

export default function App() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Router>
            <div className={classes.root}>
                <Navigation
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
                <Main open={open} />
            </div>
        </Router>
    )
}