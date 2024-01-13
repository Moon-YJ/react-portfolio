import './Pics.scss';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { useCommonData } from '../../../hooks/useCommonData';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { customText } from '../../../hooks/useText';
import { IoPlayCircleOutline } from 'react-icons/io5';
import Modal from '../../common/modal/Modal';
import { useScroll } from '../../../hooks/useScroll';

export default function Pics() {
	const { data: Vids, isSuccess } = useYoutubeQuery();
	const { setOpen } = useCommonData();
	const [Index, setIndex] = useState(0);
	const { getScrollPos, refTarget, Frame } = useScroll();
	const shortenTit = customText('shorten');
	const customDate = customText('combine');

	const handleModal = idx => {
		setIndex(idx);
		setOpen(true);
	};

	const handleScroll = useCallback(() => {
		const scroll = getScrollPos(-window.innerHeight / 3);
		if (scroll >= 0) {
			refTarget.current.classList.add('on');
		} else {
			refTarget.current.classList.remove('on');
		}
	}, [getScrollPos, refTarget]);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return (
		<>
			<section
				className='Pics scrolling'
				ref={refTarget}>
				<div className='tit-set'>
					<h1 className='tit'>Latest Contents</h1>
					<div className='detail'>
						<Link to='/youtube'>Discover</Link>
					</div>
				</div>
				<div className='content'>
					{isSuccess &&
						Vids.map((vid, idx) => {
							const [date] = vid.snippet.publishedAt.split('T');
							if (idx >= 4) return null;
							return (
								<article
									key={vid.snippet.playlistId + idx}
									onClick={() => handleModal(idx)}>
									<div className='pic'>
										<img
											src={vid.snippet.thumbnails.maxres.url}
											alt=''
										/>
									</div>
									<div className='con'>
										<h2 className='tit'>{shortenTit(vid.snippet.title, 14)}</h2>
										<div className='date'>
											<span>DATE</span>
											<span>{customDate(date, '.')}</span>
										</div>
									</div>
									<div className='play'>
										<IoPlayCircleOutline />
									</div>
								</article>
							);
						})}
				</div>
			</section>
			<Modal>
				{isSuccess && Vids.length !== 0 && (
					<div className='video'>
						<iframe
							title={Vids[Index].snippet.title}
							src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
							frameBorder={0}></iframe>
					</div>
				)}
			</Modal>
		</>
	);
}
