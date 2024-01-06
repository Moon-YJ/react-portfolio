export function useScroll(frame, sec = 0.3) {
	const moveScroll = pos => {
		frame.style.transition = `${sec}s`;
		if (frame) frame.scrollTop = pos;
	};

	const getScrollPos = (target, baseNum = 0) => {
		const pos = frame?.scrollTop - baseNum;
		const modifiedPos = pos - target?.offsetTop;
		return modifiedPos;
	};

	return { moveScroll, getScrollPos };
}
