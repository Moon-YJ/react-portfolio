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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function App({ apiArr }) {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.dark.isDark);

	useEffect(() => {
		apiArr.forEach(func => dispatch(func()));
		// dispatch(fetchDepartment());
		// dispatch(fetchYoutube());
		// dispatch(fetchFlickr());
	}, [apiArr, dispatch]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header />
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
			<Menu />
			<Footer />
		</div>
	);
}
