import { createContext, useContext, useRef, useState } from 'react';

export const CommonContext = createContext();

export function CommonProvider({ children }) {
	const [MenuToggle, setMenuToggle] = useState(false);
	const [Open, setOpen] = useState(false);
	const [Theme, setTheme] = useState('light');
	const menuEl = useRef(['department', 'youtube', 'gallery', 'community', 'member', 'contact']);

	return (
		<CommonContext.Provider value={{ MenuToggle, setMenuToggle, Open, setOpen, Theme, setTheme, menuEl }}>
			{children}
		</CommonContext.Provider>
	);
}

export function useCommonData() {
	return useContext(CommonContext);
}
