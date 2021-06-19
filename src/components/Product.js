import React from 'react'
import { Button } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addToCart, toggleFavourites } from '../features/cardSlice'

const Product = ({ id, category, title, price, description, image, inTheFav, discountedPrice }) => {
    const dispatch = useDispatch()
    // const products = useSelector(state => state.product.products)

    function sliceString(string, length) {
        return string.slice(0, length) + '...'
    }

    const addToFav = (id, inTheFav) => {
        dispatch(toggleFavourites(id))
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
                    <div className="product-price">$ {inTheFav ? discountedPrice : Number(price).toFixed(2)}</div>
                    <div className="product-links">
                        <Button onClick={() => addToFav(id)} className="btn-card" danger type="ghost">
                            {inTheFav ? <HeartFilled /> : <HeartOutlined />}
                        </Button>
                        <Button
                            className="btn-card"
                            type="primary"
                            onClick={() => dispatch(addToCart(id, inTheFav))}
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
