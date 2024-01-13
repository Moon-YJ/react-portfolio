import { useCallback, useEffect, useRef } from 'react';
import './Product.scss';
import { useScroll } from '../../../hooks/useScroll';

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
	const ulRef = useRef(null);
	const { getScrollPos, refTarget, Frame } = useScroll();

	const handleScroll = useCallback(() => {
		const scroll = getScrollPos(-window.innerHeight / 2);
		if (scroll >= 0) {
			ulRef.current.style.opacity = 0.1 + scroll / 500;
		}
	}, [getScrollPos]);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return (
		<section
			className='Product scrolling'
			ref={refTarget}>
			<ul ref={ulRef}>
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
