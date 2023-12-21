import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value, delay = 500) => {
	const [Debounced, setDebounced] = useState(value);
	const blocker = useRef(null);

	clearTimeout(blocker.current);

	blocker.current = setTimeout(() => {
		setDebounced(value);
	}, delay);

	useEffect(() => {
		return () => clearTimeout(blocker.current);
	}, []);
	return Debounced;
};
