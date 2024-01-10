import { useRef } from 'react';
import './Product.scss';

export default function Product() {
	const path = useRef(process.env.PUBLIC_URL);
	const arr = useRef([
		'Lighting',
		'Bookshelves',
		'Cabinets',
		'Tables',
		'Coffee Tables',
		'Sofas and Armchairs',
		'Chairs',
		'Bar & Kitchen',
		'Accessories'
	]);
	return (
		<section className='Product scrolling'>
			<ul>
				{arr.current.map((el, idx) => {
					return (
						<li key={el + idx}>
							<h2>{el}</h2>
							<div className='pic'>
								<img
									src={`${path.current}/img/main/product/${el}.jpg`}
									alt='product'
								/>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
