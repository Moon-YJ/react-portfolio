import { useEffect, useRef, useState } from 'react';
import { customText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const path = useRef(process.env.PUBLIC_URL);
	const [TopData, setTopData] = useState(null);
	const [MemberData, setMemberData] = useState([]);
	const [Tit, setTit] = useState('');
	const [SubMemberData, setSubMemberData] = useState([]);
	const [SubTit, setSubTit] = useState('');
	const [Mounted, setMounted] = useState(true);

	const customTit = customText('combine');

	const fetchMember = async () => {
		try {
			const data = await fetch(`${path.current}/DB/department.json`);
			const json = await data.json();
			setTopData(json.president[0]);
			setMemberData(Object.values(json)[1]);
			setTit(Object.keys(json)[1]);
			setSubMemberData(Object.values(json)[2]);
			setSubTit(Object.keys(json)[2]);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMember();
		return () => setMounted(false);
	}, []);

	return (
		<Layout
			index={'01'}
			title={'Department'}>
			{Mounted && TopData && (
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
				<h1 className='tit'>{customTit(Tit)}</h1>
				<div className='team-box'>
					{Mounted &&
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
					<h2 className='stit'>{customTit(SubTit)}</h2>
					<div className='team-box'>
						{Mounted &&
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
