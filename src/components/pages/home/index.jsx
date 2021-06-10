import React,{Suspense} from 'react'
import {useSelector} from 'react-redux'


const  Banner  =React.lazy(() =>import('../../common/banner'))
const  Category  =React.lazy(() =>import('../../common/category'))

function Home()
{
	let state=useSelector(stateFromStore=>stateFromStore)

	return <div>
		{state.banners.length>0 && <Suspense fallback={<p align="center"><i className="fa fa-5x fa-spin fa-spinner"></i></p>}><Banner /></Suspense>}
		{state
			.categories
			.filter(catgeory=>catgeory.enabled)
			.map((catgeory,index) =>
				<Suspense 
				key={catgeory.id}  
				fallback={<p align="center"><i className="fa fa-5x fa-spin fa-spinner"></i></p>}>
					<Category 
					className={index%2===0?"categories active":"categories"} 

					catgeory={catgeory} 
					/>
				</Suspense>
			)}
	</div>
}
export default Home

