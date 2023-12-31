import { useEffect, useRef } from 'react';
import './ColorTheme.scss';
import { useCookie } from '../../../hooks/useCookie';

export default function ColorTheme() {
	const { setCookie, isCookie } = useCookie();
	const input = useRef(null);
	const changeColor = () => {
		const color = input.current.value;
		setCookie('colorTheme', color, 60 * 60 * 12);
		document.body.style.setProperty('--pointColor', color);
		input.current.value = color;
	};

	const handleReset = () => {
		setCookie('theme', 'done', 0);
		const resetColor = '#fa5b5b';
		input.current.value = resetColor;
		document.body.style.setProperty('--pointColor', resetColor);
	};

	useEffect(() => {
		isCookie('theme')
			? document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0])
			: document.body.style.setProperty(
					'--pointColor',
					getComputedStyle(document.body).getPropertyValue('--pointColor')
			  );
		input.current.value = document.body.style.getPropertyValue('--pointColor');
	}, [isCookie]);

	return (
		<div className='ColorTheme'>
			<input
				type='color'
				ref={input}
				onChange={changeColor}
			/>
			<button onClick={handleReset}>reset</button>
		</div>
	);
}
