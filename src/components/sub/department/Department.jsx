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
					<h1>{customTit(Tit)}</h1>
					{MemberData.map((data, idx) => {
						return (
							<article key={data + idx}>
								<h3>{data.name}</h3>
								<p>{data.position}</p>
								<div className='pic'>
									<img src={`${path.current}/img/${data.pic}`} alt={data.name} />
								</div>
							</article>
						);
					})}
					<div className='support-box'>
						<h2>{SubTit}</h2>
						{SubMemberData.map((data, idx) => {
							return (
								<article key={data + idx}>
									<h3>{data.name}</h3>
									<p>{data.position}</p>
									<div className='pic'>
										<img src={`${path.current}/img/${data.pic}`} alt={data.name} />
									</div>
								</article>
							);
						})}
					</div>
				</section>
			</Layout>
		</div>
	);
}
