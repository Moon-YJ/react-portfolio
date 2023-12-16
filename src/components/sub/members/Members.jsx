import { useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
	const path = useRef(process.env.PUBLIC_URL);
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
											<td>
												<input
													type='text'
													name='userid'
												/>
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
												/>
											</td>
										</tr>
										<tr>
											<th className='necessary'>Confirm Password</th>
											<td>
												<input
													type='password'
													name='pwd2'
												/>
											</td>
										</tr>
										<tr>
											<th>How you discovered Henge</th>
											<td>
												<select name='how'>
													<option value=''>Choose one from the options.</option>
													<option value='elementary-school'>Magazine</option>
													<option value='middle-school'>Internet surfing</option>
													<option value='high-school'>Billboard</option>
													<option value='college'>By friends</option>
												</select>
											</td>
										</tr>
										<tr>
											<th>Gender</th>
											<td>
												<input
													type='radio'
													defaultValue='female'
													id='female'
													name='gender'
												/>
												<label htmlFor='female'>Female</label>

												<input
													type='radio'
													defaultValue='male'
													id='male'
													name='gender'
												/>
												<label htmlFor='male'>Male</label>
												<p className='err-txt'>error phrase here</p>
											</td>
										</tr>
										<tr>
											<th>Interest</th>
											<td>
												<input
													type='checkbox'
													name='interest'
													id='lighting'
													defaultValue='Lighting'
												/>
												<label htmlFor='lighting'>Lighting</label>
												<input
													type='checkbox'
													name='interest'
													id='cabinets'
													defaultValue='cabinets'
												/>
												<label htmlFor='cabinets'>Cabinets</label>
												<input
													type='checkbox'
													name='interest'
													id='tables'
													defaultValue='tables'
												/>
												<label htmlFor='tables'>Tables</label>
												<input
													type='checkbox'
													name='interest'
													id='armchairs'
													defaultValue='armchairs'
												/>
												<label htmlFor='armchairs'>Armchairs</label>
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
