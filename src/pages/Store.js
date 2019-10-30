import React from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Paper, Button } from '@material-ui/core'

import { booksInfo } from '../static/booksInfo'
import { addCar } from './../actions/store'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        book: {
            paddingLeft: theme.spacing(1)
        },
        button: {
            backgroundColor: '#409EFF',
            color: '#fff'
        },
        title: {
            paddingBottom: theme.spacing(2)
        }
    })
)


export default function Store() {

    const classes = useStyles()
    const dispatch = useDispatch()

    const handleAddCar = (addItem) => {
        // 触发action
        dispatch(addCar(addItem))
    }

    return (
        <Grid container className={classes.root}>
            <span className={classes.title}>书城选购</span>
            <Grid container item xs={12} spacing={4}>
                {booksInfo.map((item) => (
                    <Grid key={item.id} item xs={4}>
                        <Paper>
                            <Grid container item xs={12}>
                                <Grid item xs={6}>
                                    <img src={item.img} alt="" />
                                </Grid>
                                <Grid item xs={6} className={classes.book}>
                                    <h3>{item.name}</h3>
                                    <h2 style={{ color: 'red' }}>￥{item.price}</h2>
                                    <h4>库存（数量）:{item.count}</h4>
                                    <Button className={classes.button} variant="contained" size="small" startIcon={
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon-gouwuche"></use>
                                        </svg>
                                    } onClick={() => handleAddCar(item)}>加入购物车</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}