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
