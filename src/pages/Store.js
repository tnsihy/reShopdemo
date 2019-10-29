import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Paper, Button } from '@material-ui/core'

import { booksInfo } from '../static/booksInfo'
import store from '../store'

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

    // const handleAddCar = (addItem) => {

    //     // 判断购物车local里面有没有加入该商品,通过id进行比较
    //     const addItemId = addItem.id
    //     const preShopData = JSON.parse(localStorage.shopData || '[]')
    //     const findItem = preShopData.find(item => (item.id === addItemId))

    //     // 有该商品数量+1
    //     if (findItem) {
    //         preShopData.forEach(item => {
    //             if (item.id === addItemId) {
    //                 item.count++
    //             }
    //         })
    //     } else {

    //         // 没有该商品，则存进去local，并且初始化数量为1
    //         // Object.assign(target,...sources) 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
    //         const copyAddItem = Object.assign({}, addItem, {
    //             count: 1
    //         })
    //         preShopData.push(copyAddItem)
    //     }

    //     // 更新localStorage.shopData
    //     localStorage.shopData = JSON.stringify(preShopData)
    // }

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
                                    } onClick={() => {store.dispatch({type:'ADD_CAR',value:item})}}>加入购物车</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}