import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useDebounce } from '../../../hooks/useDebounce';
import { MdKeyboardArrowRight } from 'react-icons/md';

export default function Members() {
	const setHistory = useHistory();
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

	const DebouncedValue = useDebounce(Value);

	const path = useRef(process.env.PUBLIC_URL);

	const handleReset = () => {
		setValue(initValue.current);
	};

	const handleForm = e => {
		e.preventDefault();
		if (Object.keys(checkErr(Value)).length === 0) {
			alert('Your form has been submitted successfully.');
			setHistory.push('/');
		} else {
			alert('Please fill out all required fields.');
		}
	};

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
		const text = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;
		const [txt1, txt2] = value.email.split('@');
		const txt3 = txt2 && txt2.split('.');
		if (value.userid.trim().length < 5) errs.userid = 'Please enter 5 or more characters.';
		if (!txt1 || !txt2 || !txt3[0] || !txt3[1]) errs.email = 'Please enter your email correctly.';
		//prettier-ignore
		if (!text.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1) || value.pwd1.trim().length < 7) errs.pwd1 = '7+ characters, 1 number, 1 special character required.';
		//prettier-ignore
		if (value.pwd1.trim() !== value.pwd2.trim() || !value.pwd2.trim()) errs.pwd2 = 'Please ensure that both passwords match.';
		if (!value.how) errs.how = 'Please select at least one.';
		if (!value.gender) errs.gender = 'Please select at least one.';
		if (value.interest.length === 0) errs.interest = 'Please select at least one.';
		return errs;
	};

	useEffect(() => {
		setError(checkErr(DebouncedValue, 300));
	}, [DebouncedValue]);

	return (
		<div className='wrapper'>
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
							<form onSubmit={handleForm}>
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
												<td className={Error.email ? 'error' : ''}>
													<input
														type='text'
														name='email'
														onChange={handleInput}
													/>
													{Error.email && <p>{Error.email}</p>}
												</td>
											</tr>
											<tr>
												<th className='necessary'>Password</th>
												<td className={Error.pwd1 ? 'error' : ''}>
													<input
														type='password'
														name='pwd1'
														value={Value.pwd1}
														onChange={handleInput}
													/>
													{Error.pwd1 && <p>{Error.pwd1}</p>}
												</td>
											</tr>
											<tr>
												<th className='necessary'>Confirm Password</th>
												<td className={Error.pwd2 ? 'error' : ''}>
													<input
														type='password'
														name='pwd2'
														value={Value.pwd2}
														onChange={handleInput}
													/>
													{Error.pwd2 && <p>{Error.pwd2}</p>}
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
													{Error.how && <p>{Error.how}</p>}
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
														onClick={handleReset}
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
				<section className='mail'>
					<div className='mail-txt'>
						<h3>Subscribe to our newsletter</h3>
						<p>To stay up to date on new products and events of the Henge world</p>
					</div>
					<div className='mail-set'>
						<form>
							<input
								type='text'
								name='email'
							/>
							<button className='send'>
								<MdKeyboardArrowRight />
							</button>
							<label htmlFor='terms'>
								<input
									type='checkbox'
									name='terms'
									id='terms'
									defaultValue='terms'
								/>
								<span>Agree to Terms and Conditions</span>
							</label>
						</form>
					</div>
				</section>
			</Layout>
		</div>
	);
}
