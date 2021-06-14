import { Modal, Card } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const { Meta } = Card

const Cart = ({ visible, setVisible }) => {
    const cartItems = useSelector(state => state.product.cartItems)
    const [products,setProducts] = useState([])

    useEffect(() => {
        let storage = window.localStorage.getItem('Cart')
        setProducts(JSON.parse(storage) || [])
        window.localStorage.clear()
    }, [cartItems])

    return (
        <Modal
            title="Shopify Cart"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
            footer={null}
        >
            <div className="cart-wrapper">
                {products.length > 0 ? products.map(product => (
                    <Card
                        key={product.id}
                        className="cart-item"
                        cover={
                            <img src={product.image} alt={product.title} style={{ width: '100%' }} />
                        }
                    >
                        <Meta
                            title={product.title.slice(0, 15) + '...'}
                            description={product.description.slice(0, 30) + '...'}
                        />
                    </Card>
                )) : <div>There is no item</div>}
            </div>
        </Modal>
    )
}

export default Cart
