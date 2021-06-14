import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from './features/cardSlice'
import Product from './components/Product'
import { LoadingOutlined } from '@ant-design/icons'
import Layout from './components/Layout'
import Cart from './components/Cart'
import LazyLoad from 'react-lazyload'
import { Card } from 'antd'

const App = () => {
  const [visible, setVisible] = useState(false)

  const status = useSelector(state => state.product.status)
  const products = useSelector(state => state.product.products)
  const error = useSelector(state => state.product.error)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts())
    }
  }, [status, dispatch, products])


  let content;

  if (status === 'loading') {
    content = <div style={{ fontSize: '24px' }}>Loading... <LoadingOutlined /></div>
  } else if (status === 'failed') {
    content = <div>{error}</div>
  } else if (status === 'succeeded') {
    content = products.map(({ id, category, title, price, description, image }) => (
      <LazyLoad key={id} height={250} scroll={true} offset={1500} placeholder={<Card loading />} >
        <Product
          id={id}
          category={category}
          title={title}
          price={price}
          description={description} image={image}
        />
      </LazyLoad>
    ))
  }

  return (
    <Layout setVisible={setVisible}>
      <div className="wrapper">
        {content}
        <Cart visible={visible} setVisible={setVisible} />
      </div>
    </Layout>
  )
}

export default App
