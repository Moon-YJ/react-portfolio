import { createContext, useContext, useState } from 'react';

export const CommonContext = createContext();

export function CommonProvider({ children }) {
	const [MenuToggle, setMenuToggle] = useState(false);
	const [Open, setOpen] = useState(false);
	const [Theme, setTheme] = useState('light');

	return (
		<CommonContext.Provider value={{ MenuToggle, setMenuToggle, Open, setOpen, Theme, setTheme }}>
			{children}
		</CommonContext.Provider>
	);
}

export function useCommonData() {
	return useContext(CommonContext);
}
