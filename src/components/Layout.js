import React from 'react'
import Navbar from './Navbar'
import { Layout as Wrapper } from 'antd'

const { Content } = Wrapper

const Layout = ({ children, setVisible }) => {
    return (
        <div>
            <Navbar setVisible={setVisible} />
            <Content>
                {children}
            </Content>
        </div>
    )
}

export default Layout
