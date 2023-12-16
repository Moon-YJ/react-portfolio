import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
	const initValue = useRef({
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		how: '',
		gender: '',
		interest: []
	});
	const [Value, setValue] = useState(initValue.current);
	const [Error, setError] = useState({});

	const path = useRef(process.env.PUBLIC_URL);

	const handleInput = e => {
		const { name, value } = e.target;
		setValue({ ...Value, [name]: value });
	};

	const handleChk = e => {
		let chkArr = [];
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		inputs.forEach(input => {
			input.checked && chkArr.push(input.defaultValue);
		});
		setValue({ ...Value, [name]: chkArr });
	};

	const checkErr = value => {
		let errs = {};
		if (value.userid.trim().length < 5) errs.userid = 'Please enter 5 or more characters.';
		if (!value.how) errs.how = 'Please select at least one.';
		if (!value.gender) errs.gender = 'Please select at least one.';
		if (value.interest.length === 0) errs.interest = 'Please select at least one.';
		return errs;
	};

	useEffect(() => {
		setError(checkErr(Value));
	}, [Value]);

	return (
		<Layout
			index={'05'}
			title={'Member'}>
			<section className='join'>
				<h2 className='stit'>
					Via della Spiga 34
					<br />
					20121 Milano (MI) - Italy
				</h2>
				<div className='info-set'>
					<div className='info'>
						<p className='num'>15+</p>
						<p className='txt'>Partners</p>
					</div>
					<div className='info'>
						<p className='num'>10K</p>
						<p className='txt'>Clients</p>
					</div>
					<div className='info'>
						<p className='num'>1200</p>
						<p className='txt'>Products</p>
					</div>
				</div>
				<div className='join-set'>
					<div className='pic'>
						<img
							src={`${path.current}/img/member/join.jpg`}
							alt='living room'
						/>
					</div>
					<div className='form'>
						<h3>Be member of Henge</h3>
						<p>Please be a member of us and save up to 15% with FREE magazine shipping every month.</p>
						<form>
							<fieldset>
								<legend className='h'>Sign up form</legend>
								<table>
									<tbody>
										<tr>
											<th className='necessary'>Your ID</th>
											<td className={Error.userid ? 'error' : ''}>
												<input
													type='text'
													name='userid'
													value={Value.userid}
													onChange={handleInput}
												/>
												{Error.userid && <p>{Error.userid}</p>}
											</td>
										</tr>
										<tr>
											<th>Email</th>
											<td>
												<input
													type='text'
													name='email'
												/>
											</td>
										</tr>
										<tr>
											<th className='necessary'>Password</th>
											<td>
												<input
													type='password'
													name='pwd1'
													value={Value.pwd1}
													onChange={handleInput}
												/>
											</td>
										</tr>
										<tr>
											<th className='necessary'>Confirm Password</th>
											<td>
												<input
													type='password'
													name='pwd2'
													value={Value.pwd2}
													onChange={handleInput}
												/>
											</td>
										</tr>
										<tr>
											<th>How you discovered Henge</th>
											<td className={Error.how ? 'error' : ''}>
												<select
													name='how'
													onChange={handleInput}>
													<option value=''>Choose one from the options.</option>
													<option value='elementary-school'>Magazine</option>
													<option value='middle-school'>Internet surfing</option>
													<option value='high-school'>Billboard</option>
													<option value='college'>By friends</option>
												</select>
												{Error.select && <p>{Error.select}</p>}
											</td>
										</tr>
										<tr>
											<th>Gender</th>
											<td className={Error.gender ? 'error' : ''}>
												<input
													type='radio'
													defaultValue='female'
													id='female'
													name='gender'
													onChange={handleInput}
												/>
												<label htmlFor='female'>Female</label>

												<input
													type='radio'
													defaultValue='male'
													id='male'
													name='gender'
													onChange={handleInput}
												/>
												<label htmlFor='male'>Male</label>
												{Error.gender && <p>{Error.gender}</p>}
											</td>
										</tr>
										<tr>
											<th>Interest</th>
											<td className={Error.interest ? 'error' : ''}>
												<input
													type='checkbox'
													name='interest'
													id='lighting'
													defaultValue='lighting'
													onChange={handleChk}
												/>
												<label htmlFor='lighting'>Lighting</label>
												<input
													type='checkbox'
													name='interest'
													id='cabinets'
													defaultValue='cabinets'
													onChange={handleChk}
												/>
												<label htmlFor='cabinets'>Cabinets</label>
												<input
													type='checkbox'
													name='interest'
													id='tables'
													defaultValue='tables'
													onChange={handleChk}
												/>
												<label htmlFor='tables'>Tables</label>
												<input
													type='checkbox'
													name='interest'
													id='armchairs'
													defaultValue='armchairs'
													onChange={handleChk}
												/>
												<label htmlFor='armchairs'>Armchairs</label>
												{Error.interest && <p>{Error.interest}</p>}
											</td>
										</tr>
										<tr>
											<td>
												<input
													type='reset'
													value='Cancel'
												/>
												<input
													type='submit'
													value='Submit'
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</fieldset>
						</form>
					</div>
				</div>
			</section>
		</Layout>
	);
}
