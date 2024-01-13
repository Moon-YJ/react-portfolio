import { useEffect } from 'react';
import Btns from '../btns/Btns';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Vid from '../vid/Vid';
import Visual from '../visual/Visual';
import './MainWrap.scss';
import Product from '../product/Product';
import Text from '../text/Text';
import Email from '../../common/email/Email';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Vid />
			<Product />
			<Info />
			<Text />
			<Pics />
			<Visual />
			<Email isMain={true} />
			<Btns />
		</div>
	);
}
