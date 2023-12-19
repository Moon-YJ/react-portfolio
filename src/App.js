import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useMedia } from './hooks/useMedia';
import Detail from './components/sub/youtube/Detail';
import Menu from './components/common/menu/Menu';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function App() {
	const [MenuToggle, setMenuToggle] = useState(false);
	const [Dark, setDark] = useState(false);
	const path = useRef(process.env.PUBLIC_URL);
	const dispatch = useDispatch();

	const fetchMember = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: 'SET_MEMBERS', payload: json });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pId = process.env.REACT_APP_YOUTUBE_pID;
		const num = 7;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pId}&maxResults=${num}`;
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: 'SET_YOUTUBE', payload: json.items });
		} catch (err) {
			dispatch({ type: 'SET_YOUTUBE_ERR', payload: err });
		}
	}, [dispatch]);

	useEffect(() => {
		fetchMember();
		fetchYoutube();
	}, [fetchMember, fetchYoutube]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header
				MenuToggle={MenuToggle}
				setMenuToggle={setMenuToggle}
				Dark={Dark}
				setDark={setDark}
			/>
			<Route
				exact
				path='/'
				component={MainWrap}
			/>
			<Route
				path='/department'
				component={Department}
			/>
			<Route
				path='/gallery'
				component={Gallery}
			/>
			<Route
				path='/community'
				component={Community}
			/>
			<Route
				path='/member'
				component={Members}
			/>
			<Route
				path='/contact'
				component={Contact}
			/>
			<Route
				path='/youtube'
				component={Youtube}
			/>
			<Route
				path='/detail/:id'
				component={Detail}
			/>
			<Menu
				setMenuToggle={setMenuToggle}
				MenuToggle={MenuToggle}
				Dark={Dark}
				setDark={setDark}
			/>
			<Footer setDark={setDark} />
		</div>
	);
}
