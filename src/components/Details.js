import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Button, Col, Row, Typography, Card } from 'antd'
import axios from 'axios'
import { HeartOutlined } from '@ant-design/icons'

const { Title } = Typography

const Details = () => {
    const products = useSelector(state => state.product.products)
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    let { productId } = useParams()

    useEffect(() => {
        setLoading(true)
        axios(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                setProduct(response.data)
                setLoading(false)
            })

    }, [products, productId])

    return (
        <>
            {loading ? <Card loading style={{ width: '100%', height: '350px' }} /> :
                <Row className="product-details">
                    <Col span="10">
                        <img className="img-fluid" src={product.image} alt={product.title} />
                    </Col>
                    <Col span="14">
                        <Title level={2} className="product-detail-title">{product.title}</Title>
                        <Title level={4}>Description</Title>
                        <p className="product-detail-description">
                            {product.description}
                        </p>
                        <Row justify="space-between">
                            <Col span="12" style={{ display: 'flex', alignItems: 'center' }}>
                                <Title level={4}>Category:</Title>
                                <p className="product-detail-description">
                                    {product.category}
                                </p>
                            </Col>
                            <Col span="12" style={{ display: 'flex', alignItems: 'center' }}>
                                <Title level={4}>Price:</Title>
                                <p className="product-detail-description">
                                    $ {product.price}
                                </p>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '40px' }}>
                            <Col span="6">
                                <Button className="btn-add-cart" style={{ width: '100%' }} type="primary">
                                    Add To Cart <i className="fa fa-shopping-cart"></i>
                                </Button>
                            </Col>
                            <Col offset={1} span="6">
                                <Button style={{ width: '100%' }} danger type="ghost">
                                    Add To Favourites <HeartOutlined />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
        </>
    )
}

export default Details
