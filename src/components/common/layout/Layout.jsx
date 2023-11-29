import './Layout.scss';
import { useEffect, useRef } from 'react';

export default function Layout({ index, title, children }) {
	const box = useRef(null);

	useEffect(() => {
		box.current.classList.add('on');
	}, []);

	return (
		<main ref={box} className={`Layout ${title}`}>
			<div className='tit-set'>
				<span className='num'>{index}</span>
				<h1 className='tit'>{title}</h1>
			</div>
			{children}
		</main>
	);
}
