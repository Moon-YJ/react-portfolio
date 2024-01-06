import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import { Route, Switch } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useMedia } from './hooks/useMedia';
import Detail from './components/sub/youtube/Detail';
import Menu from './components/common/menu/Menu';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useCommonData } from './hooks/useCommonData';
import CookieModal from './components/common/cookieModal/CookieModal';

export default function App() {
	const queryClient = new QueryClient();
	const { Theme } = useCommonData();

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`wrap ${Theme === 'dark' ? 'dark' : ''} ${useMedia()}`}>
				<Switch>
					<Route
						exact
						path='/'>
						<Header type={'main'} />
						<MainWrap />
					</Route>
					<Route path='/'>
						<Header />
					</Route>
				</Switch>
				{/* <Header />
				<Route
					exact
					path='/'
					component={MainWrap}
				/> */}
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
				<Footer />
				<Menu />
				<CookieModal
					wid={370}
					hgt={435}
					titTxt={'We use Cookies'}
					infoTxt={'This website uses cookies to ensure you get the best experience on our website'}
					btnTxt={'Accept'}
				/>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
