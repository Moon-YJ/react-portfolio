import './Btns.scss';
import { useEffect, useRef, useState } from 'react';
import Anime from '../../../asset/anime';
import { useThrottle } from '../../../hooks/useThrottle';
import { useScroll } from '../../../hooks/useScroll';

export default function Btns() {
	const [Num, setNum] = useState(0);
	const contents = useRef(null);
	const refBtns = useRef(null);
	const baseLine = useRef(-window.innerHeight / 2);
	const { Frame } = useScroll();

	const handleScroll = () => {
		const scroll = Frame.scrollTop;
		contents.current.forEach((_, idx) => {
			if (scroll >= contents.current[idx].offsetTop + baseLine.current) {
				Array.from(refBtns.current.children).forEach(btn => btn.classList.remove('on'));
				refBtns.current.children[idx].classList.add('on');
			}
		});
	};
	const throttledScroll = useThrottle(handleScroll);

	useEffect(() => {
		contents.current = document.querySelectorAll('.scrolling');
		setNum(contents.current.length);

		Frame?.addEventListener('scroll', throttledScroll);
		return () => Frame?.removeEventListener('scroll', throttledScroll);
	}, [throttledScroll, Frame]);

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
							onClick={() => {
								new Anime(Frame, { scroll: contents.current[idx].offsetTop }, { duration: 500 });
							}}></li>
					);
				})}
		</ul>
	);
}
