import './Btns.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import Anime from '../../../asset/anime';
import { useThrottle } from '../../../hooks/useThrottle';
import { useScroll } from '../../../hooks/useScroll';

export default function Btns() {
	const [Num, setNum] = useState(0);
	const contents = useRef(null);
	const refBtns = useRef(null);
	const baseLine = useRef(-window.innerHeight / 2);
	const isMotion = useRef(false);
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

	const handleBtn = idx => {
		if (isMotion.current) return;
		isMotion.current = true;
		new Anime(Frame, { scroll: contents.current[idx].offsetTop }, { callback: () => (isMotion.current = false) });
	};

	useEffect(() => {
		contents.current = document.querySelectorAll('.scrolling');
		setNum(contents.current.length);

		Frame?.addEventListener('scroll', throttledScroll);
		window.addEventListener('resize', throttledResize);
		return () => {
			Frame?.removeEventListener('scroll', throttledScroll);
			window.removeEventListener('resize', throttledResize);
		};
	}, [throttledScroll, Frame, throttledResize]);

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
