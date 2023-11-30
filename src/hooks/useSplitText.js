export function useSplitText() {
	return (ref, txt, speed = 0.1) => {
		let count = 0;
		let tags = '';
		for (let letter of txt) {
			count++;
			tags += `<span style='transition-delay:${count * speed}s'>${letter}</span>`;
		}
		ref.innerHTML = tags;
	};
}
