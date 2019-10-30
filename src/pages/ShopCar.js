import React, { useState, useEffect, useCallback } from 'react'
import {
  makeStyles, createStyles, TableHead, TableRow, Paper, Table, TableCell, Container, TableBody, Button,
  Checkbox
} from '@material-ui/core'
import { ADD_SHOP, DECREASE_SHOP } from './../actionTypes/shopcar'
import { useDispatch, useSelector } from 'react-redux'
import { addShop, decreaseShop, deleteShop, checkShop } from './../actions/shopcar'
import { orderSubmit } from './../actions/order'

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

  const dispatch = useDispatch()
  // 获取reducer返回的数据store 即state
  const store = useSelector((state) => state.store)

  const computedTotalMoney = useCallback(() => {
    // 累加器 把选中的金额累加
    return store.reduce((pre, curr) => {
      if (curr.isChecked) {
        return +((pre + curr.price * curr.count).toFixed(2))
      }
      return pre
    }, 0)
  })

  const [totalMoney, setTotalMoney] = useState(computedTotalMoney())
  const classes = useStyles()


  // 在购物车中操作商品的加减
  const oprate = (oprateMethod, id) => {
    if (oprateMethod === ADD_SHOP) {
      dispatch(addShop(id))
    } else if (oprateMethod === DECREASE_SHOP) {
      dispatch(decreaseShop(id))
    }
  }

  // 删除购物车的某项商品
  const handleDelete = (id) => {
    dispatch(deleteShop(id))
  }

  // 多选框被选中
  const handleCheck = (id, event) => {
    // 多选框中本身就有checked属性
    const isChecked = event.target.checked
    dispatch(checkShop(id, isChecked))
  }

  useEffect(() => {
    // 监听computedTotalMoney
    setTotalMoney(computedTotalMoney())
  }, [computedTotalMoney])


  // 提交订单
  const handleSubmit = () => {
    dispatch(orderSubmit(store))
  }
  // // 1.首先取出原本的订单数据 有可能有数据或者无
  // const preOrderList = JSON.parse(localStorage.orderList || '[]')

  // // 2.把orderList数组存储到preOrderList的数组中
  // preOrderList.push(orderList)
  // localStorage.orderList = JSON.stringify(preOrderList)

  // // 3.提示提交成功
  // alert('提交成功！')

  // // 4.删除购物车(shopData)中的id等于orderList的id
  // const preShopData = JSON.parse(localStorage.shopData || '[]')
  // let leaveShopData = preShopData.filter(item => !orderList.some(ele => ele.id === item.id))
  // localStorage.shopData = JSON.stringify(leaveShopData)
  // setShopData(leaveShopData)

  // // 5.清空orderList 还有money
  // setOrderList([])
  // setTotalMoney(0.00)

  // 6.在订单列表中遍历localStorage数据

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
              {store.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox onChange={(event) => handleCheck(item.id, event)} />
                  </TableCell>
                  <TableCell align="center"><img width="100%" src={item.img} alt={item.name} /></TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">￥{item.price}</TableCell>
                  <TableCell align="center">
                    <button className={classes.button} onClick={() => oprate(DECREASE_SHOP, item.id)}>-</button>
                    <span className={classes.countSpacing}>{item.count}</span>
                    <button className={classes.button} onClick={() => oprate(ADD_SHOP, item.id)}>+</button>
                  </TableCell>
                  <TableCell align="center" className={classes.jine}>￥{(item.price * item.count).toFixed(2)}</TableCell>
                  <TableCell align="center"><Button variant="outlined" size="small" onClick={() => handleDelete(item.id)}>删除</Button></TableCell>
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