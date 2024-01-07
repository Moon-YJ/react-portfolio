import Anime from '../asset/anime';

export function useScroll(frame) {
	const moveScroll = pos => {
		frame && new Anime(frame, { scroll: pos });
	};

	const getScrollPos = (target, baseNum = 0) => {
		const pos = frame?.scrollTop - baseNum;
		const modifiedPos = pos - target?.offsetTop;
		return modifiedPos;
	};

	return { moveScroll, getScrollPos };
}
