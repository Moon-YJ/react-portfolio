import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { customText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';

export default function Youtube() {
	const shortenTit = customText('shorten');
	const customDate = customText('combine');

	const { data: Vids, isSuccess } = useYoutubeQuery();

	return (
		<Layout
			index={'02'}
			title={'Youtube'}>
			{isSuccess &&
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
