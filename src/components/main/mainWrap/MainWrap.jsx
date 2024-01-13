import { useEffect } from 'react';
import Btns from '../btns/Btns';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Vid from '../vid/Vid';
import Visual from '../visual/Visual';
import './MainWrap.scss';
import Product from '../product/Product';
import Text from '../text/Text';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Vid />
			<Product />
			<Info />
			<Text />
			<Pics />
			<Visual />
			<Btns />
		</div>
	);
}
