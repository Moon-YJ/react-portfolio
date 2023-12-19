import { useRef } from 'react';
import { customText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useSelector } from 'react-redux';

export default function Department() {
	const path = useRef(process.env.PUBLIC_URL);
	const customTit = customText('combine');

	const membersReducer = useSelector(store => store.membersReducer.members);
	const TopData = Object.values(membersReducer)[0];
	const MemberData = Object.values(membersReducer)[1];
	const Tit = Object.keys(membersReducer)[1];
	const SubMemberData = Object.values(membersReducer)[2];
	const SubTit = Object.keys(membersReducer)[2];

	return (
		<Layout
			index={'01'}
			title={'Department'}>
			{TopData && (
				<section className='president'>
					<div className='pic'>
						<img
							src={`${path.current}/img/${TopData[0]?.pic}`}
							alt={TopData[0]?.name}
						/>
					</div>
					<div className='quotes'>"</div>
					<div className='con'>
						<div className='con-top'>
							<h2>{TopData[0]?.text}</h2>
							<p className='name'>{TopData[0]?.name}</p>
							<p className='position'>{TopData[0]?.position}</p>
						</div>
						<div className='con-btm'>
							<p>PAST</p>
							<span className='line'></span>
							<p>FUTURE</p>
						</div>
					</div>
				</section>
			)}
			<section className='team'>
				<h1 className='tit'>{Tit && customTit(Tit)}</h1>
				<div className='team-box'>
					{MemberData?.map((data, idx) => {
						return (
							<article key={data + idx}>
								<div className='info'>
									<h3>{data.name}</h3>
									<p>{data.position}</p>
								</div>
								<div className='pic'>
									<img
										src={`${path.current}/img/${data.pic}`}
										alt={data.name}
									/>
								</div>
							</article>
						);
					})}
				</div>
				<div className='team-support'>
					<h2 className='stit'>{SubTit && customTit(SubTit)}</h2>
					<div className='team-box'>
						{SubMemberData?.map((data, idx) => {
							return (
								<article key={data + idx}>
									<div className='info'>
										<h3>{data.name}</h3>
										<p>{data.position}</p>
									</div>
									<div className='pic'>
										<img
											src={`${path.current}/img/${data.pic}`}
											alt={data.name}
										/>
									</div>
								</article>
							);
						})}
					</div>
				</div>
			</section>
		</Layout>
	);
}
