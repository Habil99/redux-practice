import React from 'react'
import { Button, Layout, Menu } from 'antd'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'

const { Header } = Layout
const style = { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }

const Navbar = ({ setVisible }) => {
    return (
        <Layout>
            <Header>
                <Row>
                    <Col span="4">
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                Practice 🙂
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span="20" style={style}>
                        <Button className="btn-nav" type="ghost" key="2" style={{ color: "#fff", fontSize: '18px', marginRight: '10px' }}>
                            Favouries <HeartOutlined />
                        </Button>
                        <Button className="btn-nav" type="ghost" onClick={(e) => setVisible(true)} key="3" style={{ color: "#fff", fontSize: '18px' }}>
                            Cart <ShoppingCartOutlined />
                        </Button>
                    </Col>
                </Row>
            </Header>
        </Layout>
    )
}

export default Navbar
