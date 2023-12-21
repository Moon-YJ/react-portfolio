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
import { useEffect, useState } from 'react';
import { fetchDepartment } from './redux/departmentSlice';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {
	const [MenuToggle, setMenuToggle] = useState(false);
	const [Dark, setDark] = useState(false);
	const dispatch = useDispatch();
	console.log(useSelector(store => store));

	useEffect(() => {
		dispatch(fetchDepartment());
		dispatch(fetchYoutube());
		dispatch(fetchFlickr({ type: 'user', id: '195294341@N02' }));
	}, [dispatch]);

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
			<Footer
				Dark={Dark}
				setDark={setDark}
			/>
		</div>
	);
}
