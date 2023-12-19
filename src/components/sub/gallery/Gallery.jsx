import { useEffect, useState, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { CgSearch } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { RiArrowRightDownLine } from 'react-icons/ri';
import Modal from '../../common/modal/Modal';
import { useDispatch } from 'react-redux';
import * as types from '../../../redux/action';

export default function Gallery() {
	const myId = '195472166@N07';
	const id = useRef(myId);
	const conWrap = useRef(null);
	const gap = useRef(40);
	const refNav = useRef(null);
	const isUser = useRef('');
	const refInput = useRef(null);
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const path = useRef(process.env.PUBLIC_URL);
	const [Pics, setPics] = useState([]);
	const [Loaded, setLoaded] = useState(false);
	const [Index, setIndex] = useState(0);
	const dispatch = useDispatch();

	const endLoading = () => {
		setTimeout(() => {
			if (isMounted.current) {
				setLoaded(true);
				conWrap.current && conWrap.current.classList.add('on');
			}
		}, 1200);
	};

	const setLoading = () => {
		setLoaded(false);
		conWrap.current && conWrap.current.classList.remove('on');
		endLoading();
	};

	const activeBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => {
			btn.classList.remove('on');
		});
		e && e.target.classList.add('on');
	};

	const handleRandom = e => {
		if (e.target.classList.contains('on')) return;
		setLoading();
		activeBtn(e);
		id.current = '';
		isUser.current = '';
		fetchFlickr({ type: 'random' });
		endLoading();
	};

	const handleUser = e => {
		if (e.target.classList.contains('on')) return;
		setLoading();
		activeBtn(e);
		id.current = myId;
		isUser.current = 'myId';
		fetchFlickr({ type: 'user', id: id.current });
		endLoading();
	};

	const handleImg = e => {
		const ownerId = e.target.getAttribute('alt');
		if (ownerId === myId) return;
		activeBtn();
		if (isUser.current) return;
		setLoading();
		isUser.current = ownerId;
		fetchFlickr({ type: 'user', id: ownerId });
		endLoading();
	};

	const handleOwner = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		if (e.target.innerText === myId) return;
		setLoading();
		activeBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
		endLoading();
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		isSearch.current = true;
		let searchVal = refInput.current.value.trim();
		if (!searchVal) return;
		setLoading();
		activeBtn();
		fetchFlickr({ type: 'search', keyword: refInput.current.value });
		endLoading();
		refInput.current.value = '';
	};

	const handleModal = idx => {
		dispatch({ type: types.MODAL.start, payload: true });
		setIndex(idx);
	};

	const fetchFlickr = async opt => {
		const num = 20;
		const flickr_api = process.env.REACT_APP_FLICKR_KEY;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_random = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const randomURL = `${baseURL}${method_random}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;
		let url = '';
		opt.type === 'random' && (url = randomURL);
		opt.type === 'user' && (url = userURL);
		opt.type === 'search' && (url = searchURL);

		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		isMounted.current = true;
		conWrap.current && conWrap.current.style.setProperty('--gap', gap.current + 'px');
		endLoading();
		fetchFlickr({ type: 'user', id: id.current });

		return () => (isMounted.current = false);
	}, []);

	return (
		<>
			<Layout
				index={'03'}
				title={'Gallery'}>
				<section className='intro'>
					<h2>
						<span>N</span>aive
						<br />
						<span>C</span>ollection
					</h2>
					<div className='btm'>
						<span className='arrow'>
							<RiArrowRightDownLine />
						</span>
						<div className='pic'>
							<img
								src={`${path.current}/img/gallery/pic-g.jpg`}
								alt='led lamp'
							/>
						</div>
					</div>
				</section>
				<section className='collection'>
					{!Loaded ? (
						<img
							src={`${path.current}/img/load.gif`}
							className='loading-bar'
							alt='loading img'
						/>
					) : null}
					<div className='top-area'>
						<nav
							ref={refNav}
							className='tag'>
							<span className='txt'>Sort by tags:</span>
							<div className='btn-set'>
								<button onClick={handleRandom}>Random</button>
								<button
									className='on'
									onClick={handleUser}>
									My Gallery
								</button>
							</div>
						</nav>
						<form onSubmit={handleSearch}>
							<button>
								<CgSearch />
							</button>
							<input
								ref={refInput}
								type='text'
								placeholder='Search'
							/>
							<button onClick={() => refInput.current.value && (refInput.current.value = '')}>
								<AiOutlineClose />
							</button>
						</form>
					</div>
					<div
						ref={conWrap}
						className='container-wrap'>
						<Masonry
							className={'container'}
							options={{ gutter: gap.current }}>
							{Pics.length === 0 && isSearch.current && <h3>No matching images found</h3>}
							{Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div className='pic'>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
												alt={pic.title}
												onClick={() => handleModal(idx)}
											/>
										</div>
										<h2>
											<span className='num'>{idx < 9 ? '0' + (idx + 1) : idx + 1}</span>
											{pic.title}
										</h2>
										<div className='profile'>
											<p onClick={handleOwner}>{pic.owner}</p>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt={pic.owner}
												onClick={handleImg}
												onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
										</div>
									</article>
								);
							})}
						</Masonry>
					</div>
				</section>
			</Layout>

			<Modal>
				{Pics.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
						alt={Pics[Index].id}
					/>
				)}
			</Modal>
		</>
	);
}
