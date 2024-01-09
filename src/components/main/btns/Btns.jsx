import './Btns.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import Anime from '../../../asset/anime';
import { useThrottle } from '../../../hooks/useThrottle';
import { useScroll } from '../../../hooks/useScroll';

export default function Btns(opt) {
	const defaultOpt = useRef({ applyClass: '.scrolling', base: -window.innerHeight / 2, isWheel: false });
	const renewOpt = useRef({ ...defaultOpt.current, ...opt });
	const [Num, setNum] = useState(0);
	const contents = useRef(null);
	const refBtns = useRef(null);
	const baseLine = useRef(renewOpt.current.base);
	const isMotion = useRef(false);
	const isAutoWheel = useRef(renewOpt.current.isWheel);
	const { Frame } = useScroll();

	const handleScroll = () => {
		const scroll = Frame.scrollTop;
		contents.current.forEach((_, idx) => {
			if (scroll >= contents.current[idx].offsetTop + baseLine.current && refBtns.current) {
				Array.from(refBtns.current.children).forEach(btn => btn.classList.remove('on'));
				refBtns.current.children[idx].classList.add('on');
			}
		});
	};
	const throttledScroll = useThrottle(handleScroll);

	const handleResize = useCallback(() => {
		const btnsArr = Array.from(refBtns.current.children);
		const activeEl = refBtns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);
		Frame.scrollTop = contents.current[activeIndex].offsetTop;
	}, [Frame]);
	const throttledResize = useThrottle(handleResize, 200);

	const handleBtn = useCallback(
		idx => {
			if (isMotion.current) return;
			isMotion.current = true;
			new Anime(Frame, { scroll: contents.current[idx].offsetTop }, { callback: () => (isMotion.current = false) });
		},
		[Frame]
	);

	const handleWheel = useCallback(
		e => {
			const btnArr = Array.from(refBtns.current.children);
			const activeEl = refBtns.current.querySelector('li.on');
			const activeIndex = btnArr.indexOf(activeEl);
			if (e.deltaY > 0 && activeIndex !== Num - 1) Frame.scrollTop = handleBtn(activeIndex + 1);
			else if (e.deltaY < 0 && activeIndex !== 0) Frame.scrollTop = handleBtn(activeIndex - 1);
		},
		[Frame, Num, handleBtn]
	);

	useEffect(() => {
		contents.current = document.querySelectorAll(renewOpt.current.applyClass);
		setNum(contents.current.length);
		Frame?.addEventListener('scroll', throttledScroll);
		isAutoWheel.current && Frame?.addEventListener('mousewheel', handleWheel);
		window.addEventListener('resize', throttledResize);

		return () => {
			Frame?.removeEventListener('scroll', throttledScroll);
			Frame?.removeEventListener('mousewheel', handleWheel);
			window.removeEventListener('resize', throttledResize);
		};
	}, [throttledScroll, Frame, throttledResize, handleWheel]);

	return (
		<ul
			className='Btns'
			ref={refBtns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === 0 ? 'on' : ''}
							onClick={() => handleBtn(idx)}></li>
					);
				})}
		</ul>
	);
}
