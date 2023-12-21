import { useEffect, useState, useRef, useCallback } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { CgSearch } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { RiArrowRightDownLine } from 'react-icons/ri';
import Modal from '../../common/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen } from '../../../redux/modalSlice';
import { fetchFlickr } from '../../../redux/flickrSlice';
import { customText } from '../../../hooks/useText';

export default function Gallery() {
	const myId = '195472166@N07';
	const id = useRef(myId);
	const conWrap = useRef(null);
	const gap = useRef(40);
	const refNav = useRef(null);
	const isUser = useRef('');
	const refInput = useRef(null);
	const isSearch = useRef(false);
	const path = useRef(process.env.PUBLIC_URL);
	const [Loaded, setLoaded] = useState(false);
	const [Index, setIndex] = useState(0);
	const [Mounted, setMounted] = useState(true);
	const dispatch = useDispatch();
	const Pics = useSelector(store => store.flickr.data);
	const shortenTxt = customText('shorten');

	const endLoading = useCallback(() => {
		setTimeout(() => {
			if (Mounted) {
				setLoaded(true);
				conWrap.current?.classList.add('on');
			}
		}, 1200);
	}, [Mounted]);

	const setLoading = () => {
		setLoaded(false);
		conWrap.current?.classList.remove('on');
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
		dispatch(fetchFlickr({ type: 'random' }));
		endLoading();
	};

	const handleUser = e => {
		if (e.target.classList.contains('on')) return;
		setLoading();
		activeBtn(e);
		id.current = myId;
		isUser.current = 'myId';
		dispatch(fetchFlickr({ type: 'user', id: id.current }));
		endLoading();
	};

	const handleImg = e => {
		const ownerId = e.target.getAttribute('alt');
		if (ownerId === myId) return;
		activeBtn();
		if (isUser.current) return;
		setLoading();
		isUser.current = ownerId;
		dispatch(fetchFlickr({ type: 'user', id: ownerId }));
		endLoading();
	};

	const handleOwner = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		if (e.target.innerText === myId) return;
		setLoading();
		activeBtn();
		dispatch(fetchFlickr({ type: 'user', id: e.target.innerText }));
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
		dispatch(fetchFlickr({ type: 'search', keyword: refInput.current.value }));
		endLoading();
		refInput.current.value = '';
	};

	const handleModal = idx => {
		dispatch(modalOpen());
		setIndex(idx);
	};

	useEffect(() => {
		conWrap.current?.style.setProperty('--gap', gap.current + 'px');
		endLoading();

		return () => setMounted(false);
	}, [endLoading]);

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
							<button
								onClick={() => {
									refInput.current.value && (refInput.current.value = '');
								}}>
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
							{Mounted &&
								Pics.map((pic, idx) => {
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
												{shortenTxt(pic.title, 25)}
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
