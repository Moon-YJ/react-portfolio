import { useEffect } from 'react';
import Btns from '../btns/Btns';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Vid from '../vid/Vid';
import Visual from '../visual/Visual';
import './MainWrap.scss';
import Product from '../product/Product';

export default function MainWrap() {
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
