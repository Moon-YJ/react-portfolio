import { useCallback, useEffect, useRef } from 'react';
import './Text.scss';
import { useScroll } from '../../../hooks/useScroll';

export default function Text() {
	const txtRef = useRef(null);
	const txtRef2 = useRef(null);
	const { getScrollPos, refTarget, Frame } = useScroll();
	const handleScroll = useCallback(() => {
		const scroll = getScrollPos(50);
		if (txtRef.current && txtRef2.current) {
			if (scroll >= 0) {
				txtRef.current.style.transform = `translateX(${-scroll / 3}px) scale(${1 + scroll / 1500})`;
				txtRef2.current.style.transform = `translateX(${scroll / 3}px) translateY(${scroll / 3}px) scale(${
					1 + scroll / 1500
				})`;
				txtRef.current.style.opacity = 0.4 - scroll / 1500;
				txtRef2.current.style.opacity = 0.4 - scroll / 1500;
			} else {
				txtRef.current.style.transform = `translateX(0)`;
				txtRef2.current.style.transform = `translateX(0)`;
				txtRef.current.style.opacity = 0.2;
				txtRef2.current.style.opacity = 0.2;
			}
		}
	}, [getScrollPos]);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return (
		<section
			className='Text scrolling'
			ref={refTarget}>
			<span
				className='txt'
				ref={txtRef}>
				Every morning one of our craftsmen offers his hands&nbsp;
			</span>
			<span
				className='txt'
				ref={txtRef2}>
				and his art to make each Henge product unique.
			</span>
		</section>
	);
}
