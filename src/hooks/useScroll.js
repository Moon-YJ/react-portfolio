import { useEffect, useRef, useState } from 'react';
import Anime from '../asset/anime';

export function useScroll() {
	const [Frame, setFrame] = useState(null);
	const refTarget = useRef(null);

	const moveScroll = pos => {
		Frame && new Anime(Frame, { scroll: pos });
	};

	const getScrollPos = (baseNum = 0) => {
		const pos = Frame?.scrollTop - baseNum;
		const modifiedPos = pos - refTarget.current?.offsetTop;
		return modifiedPos;
	};

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, [setFrame]);

	return { moveScroll, getScrollPos, Frame, refTarget };
}
