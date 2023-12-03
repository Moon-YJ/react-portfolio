import { useSplitText } from '../../../hooks/useText';
import './Layout.scss';
import { useEffect, useRef } from 'react';

export default function Layout({ index, title, detail = '', children }) {
	const box = useRef(null);
	const numBox = useRef(null);
	const titBox = useRef(null);
	const splitTitle = useSplitText();

	useEffect(() => {
		splitTitle(numBox.current, index, 1, 0.3);
		splitTitle(titBox.current, title, 0.5, 0.1);
		setTimeout(() => {
			box.current.classList.add('on');
		}, 300);
	}, []);

	return (
		<main ref={box} className={`Layout ${title} ${detail}`}>
			<div className='tit-set'>
				<p ref={numBox} className='num'>
					{index}
				</p>
				<h1 ref={titBox} className='tit'>
					{title}
				</h1>
			</div>
			{children}
		</main>
	);
}
