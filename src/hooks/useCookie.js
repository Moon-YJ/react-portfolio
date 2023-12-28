export function useCookie() {
	const setCookie = (name, value, time) => {
		let now = new Date();
		let dueDate = now.getTime() + 1000 * time;
		now.setTime(dueDate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	};

	const isCookie = cookieInfo => {
		if (document.cookie.indexOf(cookieInfo) >= 0) return true;
		else return false;
	};

	return { setCookie, isCookie };
}
