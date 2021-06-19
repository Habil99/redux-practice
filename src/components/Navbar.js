import React from 'react'
import { Button, Layout, Menu } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'

const { Header } = Layout
const style = { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }

const Navbar = () => {
    const user = useSelector(state => state.user.user)

    return (
        <Layout>
            <Header>
                <Row>
                    <Col span="4">
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link to="/">
                                    Practice 🙂
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span="20" style={style}>
                        {user !== null && user.photoURL && (
                            <div className="user-info">
                                <p>{user.displayName}</p>
                                <Avatar
                                    style={{ marginRight: '20px' }}
                                    icon={<img src={user.photoURL} alt={user.displayName} title={user.displayName} />}
                                />
                            </div>
                        )}
                        <Link to={{
                            pathname: '/cart',
                        }}>
                            <Button className="btn-nav" type="ghost" key="3" style={{ color: "#fff", fontSize: '18px' }}>
                                Cart <ShoppingCartOutlined />
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}

export default Navbar
