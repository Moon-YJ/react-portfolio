import { useSplitText } from '../../../hooks/useText';
import './Layout.scss';
import { useEffect, useRef } from 'react';

export default function Layout({ index, title, children }) {
	const box = useRef(null);
	const numBox = useRef(null);
	const titBox = useRef(null);
	const isMounted = useRef(false);
	const splitTitle = useSplitText();

	useEffect(() => {
		isMounted.current = true;
		splitTitle(numBox.current, index, 1, 0.3);
		splitTitle(titBox.current, title, 0.5, 0.1);
		setTimeout(() => {
			isMounted.current && box.current.classList.add('on');
		}, 500);

		return () => (isMounted.current = false);
	}, [index, splitTitle, title]);

	return (
		<main
			ref={box}
			className={`Layout ${title}`}>
			<div className='tit-set'>
				<p
					ref={numBox}
					className='num'>
					{index}
				</p>
				<h1
					ref={titBox}
					className='tit'>
					{title}
				</h1>
			</div>
			{children}
		</main>
	);
}
