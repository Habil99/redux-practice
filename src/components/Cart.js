import { Modal, Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const { Meta } = Card

const Cart = () => {
    const products = useSelector(state => state.product.products)
    const [addedProducts, setAddedProducts] = useState([])

    useEffect(() => {
        // let cartProducts = JSON.parse(localStorage['products']) || []
        // setAddedProducts(cartProducts)
        // console.log('cartProducts', cartProducts, 'addedProducts', addedProducts )
        setAddedProducts(products.filter(product => product.inTheCart === true))
    }, [products])

    return (
        <div className="cart-wrapper">
            {addedProducts.length > 0 ? addedProducts.sort((a, b) => a.count < b.count).map(product => (
                <Link key={product.id} to={`product/details/${product.id}`}>
                    <Card
                        className="cart-item"
                        cover={
                            <img src={product.image} alt={product.title} style={{ width: '100%' }} />
                        }
                    >
                        <Meta
                            title={product.title.slice(0, 15) + '...'}
                            description={product.description.slice(0, 30) + '...'}
                        />
                        <div className='card-body'>
                            <p className='product-price'>$ {parseInt(product.totalPrice).toFixed(2)}</p>
                            <p className='badge'>{product.count}</p>
                        </div>
                    </Card>
                </Link>
            )) : <div>There is no item</div>}
        </div>
    )
}

export default withRouter(Cart)
