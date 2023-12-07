import './Detail.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { customText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);
	const fetchYoutube = async () => {
		const api_key = 'AIzaSyB81cXmxoWdzbYs8QZUlN_LQskZFT_Xqoo';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	};
	const customTxt = customText('shorten');
	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout index={'00'} title={'Detail'}>
			{YoutubeData && (
				<article>
					<Link to='/youtube'>
						<FaArrowLeft className='arrow' />
					</Link>
					<div className='top-info'>
						<div className='date'>
							<span>
								{new Date(YoutubeData.publishedAt.split('T')[0].split('-')[1]).toLocaleString('en-US', {
									month: 'short',
								})}
							</span>
							<span>{YoutubeData.publishedAt.split('T')[0].split('-')[2]}</span>
							<span>. {YoutubeData.publishedAt.split('T')[0].split('-')[0]}</span>
						</div>
						<div className='con'>
							<h2 className='tit'>{YoutubeData.title}</h2>
							<div className='info'>
								<p>{YoutubeData.videoOwnerChannelTitle}</p>
								<p>{YoutubeData.publishedAt.split('T')[1].split('Z')[0]}</p>
							</div>
						</div>
					</div>
					<div className='video'>
						<iframe
							title={YoutubeData.title}
							src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`}
							frameBorder={0}></iframe>
					</div>
					<p className='txt'>
						{YoutubeData.description === '' ? YoutubeData.title : customTxt(YoutubeData.description, 450)}
					</p>
				</article>
			)}
		</Layout>
	);
}
