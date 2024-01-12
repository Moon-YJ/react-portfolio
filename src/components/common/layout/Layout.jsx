import { useCommonData } from '../../../hooks/useCommonData';
import { useScroll } from '../../../hooks/useScroll';
import { useSplitText } from '../../../hooks/useText';
import './Layout.scss';
import { useCallback, useEffect, useRef } from 'react';
import { MdArrowUpward } from 'react-icons/md';

export default function Layout({ index, title, children }) {
	const numBox = useRef(null);
	const titBox = useRef(null);
	const btn = useRef(null);
	const splitTitle = useSplitText();
	const { moveScroll, getScrollPos, Frame, refTarget } = useScroll();
	const { Open } = useCommonData();

	const handleScroll = useCallback(
		num => {
			getScrollPos() >= num ? btn.current?.classList.add('on') : btn.current?.classList.remove('on');
		},
		[getScrollPos]
	);

	useEffect(() => {
		moveScroll(0);
	}, []);

	useEffect(() => {
		Frame?.addEventListener('scroll', () => handleScroll(200));
	}, [handleScroll, Frame]);

	useEffect(() => {
		splitTitle(numBox.current, index, 1, 0.3);
		splitTitle(titBox.current, title, 0.5, 0.1);
		setTimeout(() => {
			refTarget.current?.classList.add('on');
		}, 500);
	}, [index, splitTitle, title, refTarget]);

	return (
		<main
			ref={refTarget}
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
			{!Open && (
				<button
					className='top'
					ref={btn}
					onClick={() => moveScroll(0)}>
					<span className='line'></span>
					<MdArrowUpward />
				</button>
			)}
		</main>
	);
}
