import React from 'react'
import './category.scss'
function Category(props)
{
	let catgeory=props.catgeory
	let className=props.className
	return <div className={className}>
			<div className="left">
				<img src={catgeory.imageUrl} alt={catgeory.description}/>
			</div>
			<div className="right">
				<h1>{catgeory.name}</h1>
				<p>{catgeory.description}</p>
				<button>explore {catgeory.name}</button>
			</div>
	</div>
}
export default Category