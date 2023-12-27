import { useRef } from 'react';
import { customText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useDepartmentQuery } from '../../../hooks/useDepartmentQuery';

export default function Department() {
	const path = useRef(process.env.PUBLIC_URL);

	const customTit = customText('combine');

	const { data: departmentData, isSuccess } = useDepartmentQuery();
	const TopData = departmentData?.president[0];
	const MemberData = departmentData?.team;
	const Tit = departmentData && Object.keys(departmentData)[1];
	const SubMemberData = departmentData && Object.values(departmentData)[2];
	const SubTit = departmentData && Object.keys(departmentData)[2];

	return (
		<Layout
			index={'01'}
			title={'Department'}>
			{isSuccess && TopData && (
				<section className='president'>
					<div className='pic'>
						<img
							src={`${path.current}/img/${TopData.pic}`}
							alt={TopData.name}
						/>
					</div>
					<div className='quotes'>"</div>
					<div className='con'>
						<div className='con-top'>
							<h2>
								The Uprock team actively participates in our company development and ideas that we want to implement. In
								some segments of our business, they think two or three steps ahead of us.
							</h2>
							<p className='name'>{TopData.name}</p>
							<p className='position'>{TopData.position}</p>
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
				<h1 className='tit'>{isSuccess && customTit(Tit)}</h1>
				<div className='team-box'>
					{isSuccess &&
						MemberData.map((data, idx) => {
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
					<h2 className='stit'>{isSuccess && customTit(SubTit)}</h2>
					<div className='team-box'>
						{isSuccess &&
							SubMemberData.map((data, idx) => {
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
