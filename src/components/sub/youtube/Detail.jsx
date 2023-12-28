import './Detail.scss';
import { useParams } from 'react-router-dom';
import { customText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import { Link } from 'react-router-dom';
import { IoEye } from 'react-icons/io5';
import { BiSolidLike } from 'react-icons/bi';
import { useYoutubeDetailQuery, useYoutubeStatisticsQuery } from '../../../hooks/useYoutubeQuery';

export default function Detail() {
	const { id } = useParams();
	const customTxt = customText('shorten');

	const { data: VidInfo, isSuccess: isVids } = useYoutubeDetailQuery(id);
	const YoutubeData = VidInfo?.result;
	const { data: StatisticData, isSuccess: isStatistics } = useYoutubeStatisticsQuery(VidInfo?.statisticsURL);

	return (
		<Layout
			index={'00'}
			title={'Detail'}>
			{isVids && isStatistics && (
				<article>
					<Link to='/youtube'>
						<span className='arrow'></span>
					</Link>
					<div className='top-info'>
						<div className='date'>
							<span>
								{new Date(YoutubeData.publishedAt.split('T')[0].split('-')[1]).toLocaleString('en-US', {
									month: 'short'
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
					<div className='count-info'>
						<div className='view'>
							<IoEye />
							<span>{StatisticData.viewCount}</span>
						</div>
						<div className='like'>
							<BiSolidLike />
							<span>{StatisticData.likeCount}</span>
						</div>
					</div>
					<p className='txt'>
						{YoutubeData.description === '' ? YoutubeData.title : customTxt(YoutubeData.description, 450)}
					</p>
				</article>
			)}
		</Layout>
	);
}
