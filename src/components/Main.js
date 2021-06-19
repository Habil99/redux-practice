import React from 'react'
import { useEffect, useState } from 'react'
import Product from './Product'
import Cart from './Cart'
import { Card, Col, Row, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, sortByDesc } from '../features/cardSlice'

const { Option, OptGroup } = Select

const Main = () => {
    const status = useSelector(state => state.product.status)
    const products = useSelector(state => state.product.products)
    const error = useSelector(state => state.product.error)
    const [selectValue, setSelectValue] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getProducts())
        }
    }, [status, dispatch, products])

    let content;

    if (status === 'loading') {
        content = new Array(6).fill(null).map((_, index) => (
            <Card style={{ height: '300px' }} loading key={index} />
        ))
    } else if (status === 'failed') {
        content = <div>{error}</div>
    } else if (status === 'succeeded') {
        content = products.map(({ id, category, title, price, description, image, inTheFav, discountedPrice }) => (
            <Product
                key={id}
                id={id}
                category={category}
                title={title}
                price={price}
                inTheFav={inTheFav}
                discountedPrice={discountedPrice}
                description={description} image={image}
            />
        ))
    }

    const sortProducts = (e) => {
        setSelectValue(e)
        dispatch(sortByDesc(selectValue))
    }
    return (
        <div>
            <Row>
                <Col span="24">
                    <Select defaultValue="asc" style={{ width: 240, margin: "40px 0 0 70px" }} onChange={sortProducts}>
                        <OptGroup label="price">
                            <Option value="asc">asc</Option>
                            <Option value="desc">desc</Option>
                        </OptGroup>
                    </Select>
                </Col>
            </Row>
            <div className="wrapper">
                {content}
            </div>
            {/* {status === 'succeeded' &&
                <Row>
                    <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 10px' }} span="24">
                        <Button
                            // onClick={() => dispatch(getProducts(10))}
                            style={{ background: '#2c3d55', color: '#fff', padding: '0 35px', height: 'auto' }}
                            type="primary"
                        >
                            Load more...
                        </Button>
                    </Col>
                </Row>} */}
        </div>
    )
}

export default Main
