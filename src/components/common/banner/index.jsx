import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './banner.scss'
function Banner()
{
	let [counter,setCounter]=React.useState(1)

	let state=useSelector(stateFromStore=>stateFromStore)

	let dispatch=useDispatch()

	let currentBanner=state.banners.find(item=>item.order===state.order)

	let banners=[1,2,3,4,5]

	return <div className="slider-container">
		<div className="slider">
			<div className="flex">
				<div className="item">
					<img src={currentBanner.bannerImageUrl} alt={currentBanner.bannerImageAlt}/>
				</div>
			</div>
		</div>
		<div className="indicators">
			<button disabled={counter<2} onClick={e=>dispatch({type:"banners-active",payload:counter-1})} className="prev btn-prev">prev</button>
			<button disabled={counter>banners.length-1} onClick={e=>dispatch({type:"banners-active",payload:counter+1})} className="next btn-next">next</button>
		</div>	
		<div className="controls">	
			{banners.map(slideNumber=>
				<button onClick={e=>dispatch({type:"banners-active",payload:slideNumber})}></button>
			)}
		</div>
	</div>
}
export default Banner