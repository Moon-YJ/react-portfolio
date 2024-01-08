import './Btns.scss';
import { useEffect, useRef, useState } from 'react';
import Anime from '../../../asset/anime';

export default function Btns() {
	const [Index] = useState(0);
	const [Num, setNum] = useState(0);
	const wrap = useRef(null);
	const contents = useRef(null);
	const refBtns = useRef(null);

	const handleScroll = () => {
		const scroll = wrap.current.scrollTop;
		contents.current.forEach((_, idx) => {
			if (scroll >= contents.current[idx].offsetTop) {
				Array.from(refBtns.current.children).forEach(btn => btn.classList.remove('on'));
				refBtns.current.children[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		contents.current = document.querySelectorAll('.scrolling');
		setNum(contents.current.length);

		wrap.current.addEventListener('scroll', handleScroll);
		return () => wrap.current.removeEventListener('scroll', handleScroll);
	}, []);

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
							className={idx === Index ? 'on' : ''}
							onClick={() => {
								new Anime(wrap.current, { scroll: contents.current[idx].offsetTop }, { duration: 500 });
							}}></li>
					);
				})}
		</ul>
	);
}
