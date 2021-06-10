import React from 'react'
import './product.scss'
function Product(props)
{
	let {product}=props
	return <div  className="item">
					<big>{product.name}</big>
					<br/>
					<img src={product.imageURL} alt=""/>
					<div className="desc">{product.description.slice(0,80)}</div>
					<div className="buy">
						<h4>MRP: {product.price}</h4>
						<button onClick={e=>props.addtocart(product)}>Buy Now</button>
					</div>
				</div>
}
export default Product