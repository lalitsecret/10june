import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {_get} from '../../../utils'
import './cart.scss'
function Cart() {

	let state=useSelector(stateFromStore=>stateFromStore)
	let dispatch=useDispatch()
	let {toggleCart}=state

	let {user,cart,products}=state
	let mycart=cart.map(cartItem=>({...products.find(product=>product.id===cartItem.pid) ,...cartItem } ))
	// uid here is user id who is viewing the cart now
	// no cart items if you are not loggedin 
	const subtotal=cartArray=>{
		if(cartArray.length>0)
		{
			return cartArray.map(cartItme=>cartItme.qty*cartItme.price).reduce((sum,next) =>sum+next)
		}
		else
		{
			return 0
		}
	}

	const setQty =(id,qty) =>{
		
		_get("qty/"+id+"/"+qty)
		.then(d=>d.responseMessage)
		.then(d=>dispatch({type:"cart",payload:d}))
	}
	const removeFromCart=(id) =>{
		_get("remove/"+id)
		.then(d=>d.responseMessage)
		.then(d=>dispatch({type:"cart",payload:d}))
	}
	return <div className={toggleCart?"cart-box active":"cart-box"}>
		<div className="cart">
				<div className="header">
					<div className="item">
						<big>My Cart {mycart.length>0&&<span>({mycart.length} items)</span>}</big>
					</div>
					<div className="item" onClick={e=>dispatch({type:"cart-close"})}>
						X
					</div>

				</div>
				<div className="body">
				{mycart.length>0
					?
					<div>
						<div className="scroll">
							{mycart.map(cartItem=>
								<div key={cartItem.id} className="line">
									<div className="left">
										<div className="image">
											<img width="80" src={cartItem.imageURL} alt="" />
										</div>
										<div className="desc">
											<strong>{cartItem.name}</strong>
											<br />
											<div className="actions">
												<div><button  onClick={e=>setQty(cartItem.cid,cartItem.qty+1)}>+</button></div>
												<div><span>{cartItem.qty}</span></div>
												<div><button disabled={cartItem.qty<2} onClick={e=>setQty(cartItem.cid,cartItem.qty-1)}>-</button></div>
												<div><span> Rs.{cartItem.price}</span></div>
											</div>
										</div>
									</div>
									<div className="right">
										<strong>Rs.{cartItem.qty*cartItem.price}</strong>
										<button onClick={e=>removeFromCart(cartItem.cid)}><i className="fa fa-trash-o"></i></button>
									</div>
								</div>

							)}
						</div>
						<div className="note">
							<img align="middle" width="40" src="/static/images/lowest-price.png" alt="" />
							You wont find it cheaper anywhere
						</div>
					</div>
					:
					<div className="noitems">
						<div>
							<h3>No Items in cart</h3>
							<p>your favourite items are just a click away</p>
						</div>
					</div>
					}
				</div>

				<div className="footer">
					{mycart.length>0?<div>
						<small>Promo Code can be apllied on payment page</small>
						<div className="btn">
							<span>Proceed to Checkout</span>
							<span>Rs. {subtotal(mycart)}</span>
						</div>
					</div>
					:<div align="center" className="btn">
						<div></div>
						<div>Start Shipping</div>
						<div></div>
					</div>}
				</div>
			</div>
	</div>
}
export default Cart