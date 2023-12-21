import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { customText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Youtube() {
	const [Mounted, setMounted] = useState(true);
	const Vids = useSelector(store => store.youtube.data);
	const shortenTit = customText('shorten');
	const customDate = customText('combine');

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return (
		<Layout
			index={'02'}
			title={'Youtube'}>
			{Mounted &&
				Vids.map((vid, idx) => {
					const [date] = vid.snippet.publishedAt.split('T');
					return (
						<article key={vid.snippet.playlistId + idx}>
							<div className='pic'>
								<Link to={`/detail/${vid.id}`}>
									<img
										src={vid.snippet.thumbnails.maxres.url}
										alt=''
									/>
								</Link>
							</div>
							<div className='con'>
								<Link to={`/detail/${vid.id}`}>
									<h2 className='tit'>
										{vid.snippet.description === '' ? vid.snippet.title : shortenTit(vid.snippet.description, 80)}
									</h2>
								</Link>
								<div className='date'>
									<span>DATE</span>
									<span>{customDate(date, '.')}</span>
								</div>
							</div>
							<Link to={`/detail/${vid.id}`}>
								<span className='arrow'></span>
							</Link>
						</article>
					);
				})}
		</Layout>
	);
}
