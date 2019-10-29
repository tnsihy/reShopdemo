import React, { useState } from 'react'
import {
    makeStyles, createStyles, TableHead, TableRow, Paper, Table, TableCell, Container, TableBody, Button,
    Checkbox
} from '@material-ui/core'
import store from '../store'

const useStyles = makeStyles((theme) =>
    createStyles({
        title: {
            paddingBottom: theme.spacing(2)
        },
        root: {
            width: '90%',
            overflowX: 'auto'
        },
        table: {
            minWidth: 650
        },
        tabHead: {
            backgroundColor: '#409EFF'
        },
        white: {
            color: '#fff'
        },
        jine: {
            color: 'red'
        },
        countSpacing: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },
        button: {
            border: 'none',
            cursor: 'pointer'
        },
        totalmoney: {
            marginLeft: theme.spacing(80)
        },
        handleDing: {
            backgroundColor: '#409EFF',
            color: '#fff',
            marginLeft: theme.spacing(80)
        }
    })
)

// ShopCar组件
export default function ShopCar() {

    const PLUS = Symbol('PLUS');
    const DECREASE = Symbol('DECREASE');

    const [shopData, setShopData] = useState(JSON.parse(localStorage.shopData || '[]'))
    let [totalMoney, setTotalMoney] = useState(0.00)
    const classes = useStyles()
    // 订单列表
    let [orderList, setOrderList] = useState([])

    // 在购物车中操作商品的加减
    // const oprate = (oprateMethod, oprateItem) => {
    //     const preShopData = JSON.parse(localStorage.shopData)

    //     preShopData.forEach(item => {
    //         if (item.id === oprateItem.id) {
    //             if (oprateMethod === PLUS) {
    //                 item.count++
    //             } else {
    //                 if (item.count === 1) {
    //                     alert('不能再减少了')
    //                 } else {
    //                     item.count--
    //                 }
    //             }
    //         }
    //     })
    //     // 使用setState使视图更新
    //     setShopData(preShopData)
    //     // 重新把数组json.stringify 然后存进local
    //     localStorage.shopData = JSON.stringify(preShopData)
    // }

    // 在列表中删除某一项商品
    // const deleteClick = (index) => {
    //     const preShopData = JSON.parse(localStorage.shopData)
    //     preShopData.splice(index, 1)
    //     setShopData(preShopData)
    //     localStorage.shopData = JSON.stringify(preShopData)
    // }

    // 选中时对总金额进行计算 将选中的商品添加到可能成为订单的数组
    const changeCheckbox = (addItem, event) => {
        const isChecked = event.target.checked
        const addItemMoney = +(addItem.price * addItem.count).toFixed(2);
        if (isChecked) {
            setTotalMoney((+totalMoney + +addItemMoney).toFixed(2))

            orderList.push(addItem)
            setOrderList(orderList)
        } else {
            setTotalMoney((+totalMoney - +addItemMoney).toFixed(2))

            orderList.splice(orderList.indexOf(addItem), 1)
            setOrderList(orderList)
        }
    }

    // 提交订单
    const handleSubmit = () => {
        // 1.首先取出原本的订单数据 有可能有数据或者无
        const preOrderList = JSON.parse(localStorage.orderList || '[]')

        // 2.把orderList数组存储到preOrderList的数组中
        preOrderList.push(orderList)
        localStorage.orderList = JSON.stringify(preOrderList)

        // 3.提示提交成功
        alert('提交成功！')

        // 4.删除购物车(shopData)中的id等于orderList的id
        const preShopData = JSON.parse(localStorage.shopData || '[]')
        let leaveShopData = preShopData.filter(item => !orderList.some(ele => ele.id === item.id))
        localStorage.shopData = JSON.stringify(leaveShopData)
        setShopData(leaveShopData)

        // 5.清空orderList 还有money
        setOrderList([])
        setTotalMoney(0.00)

        // 6.在订单列表中遍历localStorage数据

    }

    return (
        <div>
            <span className={classes.title}>我的购物车</span>
            <Container>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tabHead}>
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                    />
                                </TableCell>
                                <TableCell align="center" width={70}>书本</TableCell>
                                <TableCell align="center" width={200}>书名信息</TableCell>
                                <TableCell align="center" width={70}>单价</TableCell>
                                <TableCell align="center" width={100}>数量</TableCell>
                                <TableCell align="center" width={70}>金额</TableCell>
                                <TableCell align="center" width={100}>操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {store.getState().carInfo.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Checkbox onChange={(event) => store.dispatch({ type: 'SELECT', event: event, value: item })} />
                                    </TableCell>
                                    <TableCell align="center"><img width="100%" src={item.img} alt={item.name} /></TableCell>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">￥{item.price}</TableCell>
                                    <TableCell align="center">
                                        <button className={classes.button} onClick={() => store.dispatch({ type: 'DOWN', value: item })}>-</button>
                                        <span className={classes.countSpacing}>{item.count}</span>
                                        <button className={classes.button} onClick={() => store.dispatch({ type: 'UP', value: item })}>+</button>
                                    </TableCell>
                                    <TableCell align="center" className={classes.jine}>￥{(item.price * item.count).toFixed(2)}</TableCell>
                                    <TableCell align="center"><Button variant="outlined" size="small" onClick={() => store.dispatch({ type: 'DELETE', value: index })}>删除</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <h3 className={classes.totalmoney}>共计<span>{totalMoney}</span>元</h3>
                <Button className={classes.handleDing} variant="outlined" onClick={() => handleSubmit()}>提交订单</Button>
            </Container>
        </div>
    )
}