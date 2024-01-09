import { useEffect } from 'react';
import Btns from '../btns/Btns';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Vid from '../vid/Vid';
import Visual from '../visual/Visual';
import './MainWrap.scss';
import { useCommonData } from '../../../hooks/useCommonData';

export default function MainWrap() {
	const { setTheme } = useCommonData();

	useEffect(() => {
		setTheme('dark');
		localStorage.setItem('darkTheme', 'dark');
	}, [setTheme]);

	return (
		<div className='MainWrap'>
			<Vid />
			<Visual />
			<Info />
			<Pics />
			<Btns />
		</div>
	);
}
