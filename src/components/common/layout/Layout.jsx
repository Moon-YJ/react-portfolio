import { useScroll } from '../../../hooks/useScroll';
import { useSplitText } from '../../../hooks/useText';
import './Layout.scss';
import { useCallback, useEffect, useRef } from 'react';
import { MdArrowUpward } from 'react-icons/md';
import { useCommonData } from '../../../hooks/useCommonData';

export default function Layout({ index, title, children }) {
	const { Frame } = useCommonData();
	const box = useRef(null);
	const numBox = useRef(null);
	const titBox = useRef(null);
	const btn = useRef(null);
	const splitTitle = useSplitText();
	const { moveScroll, getScrollPos } = useScroll(Frame);

	const handleScroll = useCallback(
		num => {
			getScrollPos(box.current, 0) >= num ? btn.current?.classList.add('on') : btn.current?.classList.remove('on');
		},
		[getScrollPos]
	);

	useEffect(() => {
		moveScroll(0);
		Frame?.addEventListener('scroll', () => handleScroll(200));
	}, [moveScroll, handleScroll, Frame]);

	useEffect(() => {
		splitTitle(numBox.current, index, 1, 0.3);
		splitTitle(titBox.current, title, 0.5, 0.1);
		setTimeout(() => {
			box.current?.classList.add('on');
		}, 500);
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
			<button
				className='top'
				ref={btn}
				onClick={() => moveScroll(0)}>
				<span className='line'></span>
				<MdArrowUpward />
			</button>
		</main>
	);
}
