import React from 'react'
import {
    makeStyles,
    createStyles,
    Container,
    Typography,
    TableHead,
    TableRow,
    Table,
    TableCell,
    TableBody
} from '@material-ui/core'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0, 3),
        },
        title: {
            paddingBottom: theme.spacing(2)
        },
        orderTable: {
            margin: theme.spacing(2),
            border: '1px solid #409EFF',
            borderBottom: 'none'
        },
        total: {
            marginLeft: theme.spacing(70)
        }
    })
)

export default function Order() {
    const classes = useStyles()
    const order = useSelector((state) => state.order)

    let randomNumber = 0
    let totalMoney = order.reduce((prev, cur) => +((prev + cur.price * cur.count).toFixed(2)), 0)
    if (order) {
        for (let i = 0; i < 6; i++) {
            randomNumber += Math.floor(Math.random() * 10)
        }
    }
    let orderNumber = new Date().getTime() + randomNumber


    return (
        <div className={classes.root}>
            <span className={classes.title}>我的订单</span>
            <Container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={100} align="center">书本</TableCell>
                            <TableCell width={300} align="center">书名信息</TableCell>
                            <TableCell width={100} align="center">单价</TableCell>
                            <TableCell width={100} align="center">数量</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                {
                    order.map((i, index) => (
                        <div key={i + index}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={100} align="center"><img src={i.img} alt="" width="100" /></TableCell>
                                        <TableCell width={300} align="center">{i.name}</TableCell>
                                        <TableCell width={100} align="center">￥{i.price}</TableCell>
                                        <TableCell width={100} align="center">{i.count}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    ))
                }
                <Typography>&nbsp;订单编号是:{orderNumber}</Typography>
                <Typography className={classes.total}>总价是：
                    <span style={{ color: 'red' }}>￥{totalMoney}</span>
                </Typography>
            </Container>
        </div>
    )
}