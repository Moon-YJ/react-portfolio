import { useEffect, useRef, useState } from 'react';
import './ColorTheme.scss';
import { useCookie } from '../../../hooks/useCookie';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { IoColorPaletteSharp } from 'react-icons/io5';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { RxReset } from 'react-icons/rx';

export default function ColorTheme() {
	const [Chart, setChart] = useState(false);
	const input = useRef(null);
	const { setCookie, isCookie } = useCookie();

	const changeColor = () => {
		const color = input.current.value;
		setCookie('colorTheme', color, 60 * 60 * 12);
		document.body.style.setProperty('--pointColor', color);
		input.current.value = color;
	};

	const handleReset = () => {
		setCookie('colorTheme', 'done', 0);
		const resetColor = '#fa5b5b';
		input.current.value = resetColor;
		document.body.style.setProperty('--pointColor', resetColor);
		setChart(false);
	};

	useEffect(() => {
		isCookie('colorTheme')
			? document.body.style.setProperty('--pointColor', document.cookie.split('colorTheme=')[1].split(';')[0])
			: document.body.style.setProperty(
					'--pointColor',
					getComputedStyle(document.body).getPropertyValue('--pointColor')
			  );
		if (input.current) input.current.value = document.body.style.getPropertyValue('--pointColor');
	}, [isCookie]);

	return (
		<div className='ColorTheme'>
			<div
				className='btn-set'
				onClick={() => setChart(!Chart)}>
				<button>{Chart ? <IoColorPaletteSharp /> : <IoColorPaletteOutline />}</button>
				<span>{Chart ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
			</div>
			{Chart && (
				<div className='chart'>
					<input
						type='color'
						ref={input}
						onChange={changeColor}
					/>
					<RxReset onClick={handleReset} />
				</div>
			)}
		</div>
	);
}
