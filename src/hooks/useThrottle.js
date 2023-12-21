import { useRef } from 'react';

export const useThrottle = (func, delay = 500) => {
	const blocker = useRef(null);

	return () => {
		if (blocker.current) return;
		blocker.current = setTimeout(() => {
			func();
			blocker.current = null;
		}, delay);
	};
};
