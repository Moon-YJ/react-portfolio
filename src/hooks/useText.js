export function useSplitText() {
	return (ref, txt, speed = 0, interval = 0) => {
		let count = 0;
		let tags = '';
		for (let letter of txt) {
			count++;
			tags += `<span style='transition-duration:${speed}s; transition-delay:${
				interval * count
			}s; display: inline-block;'>${letter}</span>`;
		}
		ref.innerHTML = tags;
	};
}

export function customText(type) {
	const setUpperTxt = (txt) => {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	};

	if (type === 'combineTit') {
		return (txt, spc = ' ') => {
			return txt
				.split(/-|_|\+/)
				.map((el) => setUpperTxt(el))
				.join(spc);
		};
	}
}
