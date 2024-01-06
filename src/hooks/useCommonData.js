import { createContext, useContext, useEffect, useState } from 'react';

export const CommonContext = createContext();

export function CommonProvider({ children }) {
	const [MenuToggle, setMenuToggle] = useState(false);
	const [Open, setOpen] = useState(false);
	const [Theme, setTheme] = useState('light');
	const [Frame, setFrame] = useState(null);

	return (
		<CommonContext.Provider value={{ MenuToggle, setMenuToggle, Open, setOpen, Theme, setTheme, Frame, setFrame }}>
			{children}
		</CommonContext.Provider>
	);
}

export function useCommonData() {
	return useContext(CommonContext);
}
