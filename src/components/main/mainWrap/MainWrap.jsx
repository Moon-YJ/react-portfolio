import { useEffect } from 'react';
import Btns from '../btns/Btns';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Vid from '../vid/Vid';
import Visual from '../visual/Visual';
import './MainWrap.scss';
import Product from '../product/Product';
import { useScroll } from '../../../hooks/useScroll';

export default function MainWrap() {
	const { moveScroll } = useScroll();

	useEffect(() => {
		moveScroll(0);
	}, [moveScroll]);
	return (
		<div className='MainWrap'>
			<Vid />
			<Product />
			<Visual />
			<Info />
			<Pics />
			<Btns />
		</div>
	);
}
