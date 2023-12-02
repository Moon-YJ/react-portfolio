import { useEffect, useRef, useState } from 'react';
import { customText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const path = useRef(process.env.PUBLIC_URL);
	const [MemberData, setMemberData] = useState([]);
	const [Tit, setTit] = useState('');
	const [SubMemberData, setSubMemberData] = useState([]);
	const [SubTit, setSubTit] = useState('');

	const customTit = customText('combineTit');

	const fetchMember = async () => {
		try {
			const data = await fetch(`${path.current}/DB/department.json`);
			const json = await data.json();
			setMemberData(Object.values(json)[0]);
			setTit(Object.keys(json)[0]);
			setSubMemberData(Object.values(json)[1]);
			setSubTit(Object.keys(json)[1]);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMember();
	}, []);

	return (
		<div className='Department'>
			<Layout index={'01'} title={'Department'}>
				<section className='team'>
					<h1 className='tit'>{customTit(Tit)}</h1>
					<div className='team-box'>
						{MemberData.map((data, idx) => {
							return (
								<article key={data + idx}>
									<div className='info'>
										<h3>{data.name}</h3>
										<p>{data.position}</p>
									</div>
									<div className='pic'>
										<img src={`${path.current}/img/${data.pic}`} alt={data.name} />
									</div>
								</article>
							);
						})}
					</div>
					<div className='team-support'>
						<h2 className='stit'>{customTit(SubTit)}</h2>
						<div className='team-box'>
							{SubMemberData.map((data, idx) => {
								return (
									<article key={data + idx}>
										<div className='info'>
											<h3>{data.name}</h3>
											<p>{data.position}</p>
										</div>
										<div className='pic'>
											<img src={`${path.current}/img/${data.pic}`} alt={data.name} />
										</div>
									</article>
								);
							})}
						</div>
					</div>
				</section>
			</Layout>
		</div>
	);
}
