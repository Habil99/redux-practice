import React from 'react'
import { Button } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cardSlice'

const Product = ({ id, category, title, price, description, image }) => {
    const dispatch = useDispatch()

    function sliceString(string, length) {
        return string.slice(0, length) + '...'
    }

    return (
        <div className="product-card">
            <div className="badge">Hot</div>
            <div className="product-tumb">
                <img src={image} alt={title} />
            </div>
            <div className="product-details">
                <span className="product-catagory">{category}</span>
                <h4>{sliceString(title, 40)}</h4>
                <p>{sliceString(description, 80)}</p>
                <div className="product-bottom-details">
                    <div className="product-price">${price}</div>
                    <div className="product-links">
                        <Button className="btn-card" danger type="ghost"><HeartOutlined /></Button>
                        <Button
                            className="btn-card"
                            type="primary"
                            onClick={() => dispatch(addToCart(id))}
                        >
                            <i className="fa fa-shopping-cart"></i>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
