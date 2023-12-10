import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { CgCheckR } from 'react-icons/cg';
import { CgCloseR } from 'react-icons/cg';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { customText } from '../../../hooks/useText';

export default function Community() {
	const customDate = customText('combine');
	const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
	const getData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};

	//const [Post, setPost] = useState(getData());
	const [CurNum, setCurNum] = useState(1);
	const [PageNum, setPageNum] = useState(0);
	const postPerPage = useRef(6);
	const indexOfLastItem = CurNum * postPerPage.current;
	const indexOfFirstItem = indexOfLastItem - postPerPage.current;
	const [PostList, setPostList] = useState(getData());
	const [CurrentPostList, setCurrentPostList] = useState(PostList.slice(indexOfFirstItem, indexOfLastItem));

	const refInput = useRef(null);
	const refText = useRef(null);
	const refEditInput = useRef(null);
	const refEditText = useRef(null);
	const totalPageNum = useRef(0);

	const resetPost = () => {
		if (!refInput.current.value.trim() || !refText.current.value.trim()) return;
		refInput.current.value = '';
		refText.current.value = '';
	};

	const submitPost = () => {
		if (!refInput.current.value.trim() || !refText.current.value.trim())
			return alert('Please fill out all required fields');
		setPostList([
			{ subject: refInput.current.value, content: refText.current.value, date: new Date(korTime) },
			...PostList,
		]);
		resetPost();
	};

	const deletePost = (delIdx) => {
		if (!window.confirm('Are you sure to delete this post?')) return;
		setPostList(PostList.filter((_, idx) => idx !== delIdx));
	};

	const editPost = (editIdx) => {
		setPostList(
			CurrentPostList.map((list, idx) => {
				list.editMode = false;
				if (idx === editIdx) list.editMode = true;
				return list;
			})
		);
	};

	const noUpdatePost = (editIdx) => {
		setPostList(
			PostList.map((list, idx) => {
				if (idx === editIdx) list.editMode = false;
				return list;
			})
		);
	};

	const confirmUpdatePost = (editIdx) => {
		if (!refEditInput.current.value.trim() || !refEditText.current.value.trim())
			return alert('Please fill out all required fields');
		setPostList(
			PostList.map((list, idx) => {
				if (idx === editIdx) {
					list.editMode = false;
					if (list.subject === refEditInput.current.value || list.content === refEditText.current.value) return list;
					else {
						list.subject = refEditInput.current.value;
						list.content = refEditText.current.value;
						list.date = new Date(korTime);
						list.enableUpdate = false;
						return list;
					}
				}
				return list;
			})
		);
	};

	useEffect(() => {
		PostList.map((list) => (list.editMode = false));
		localStorage.setItem('post', JSON.stringify(PostList));
		// 페이징 버튼
		totalPageNum.current = Math.ceil(PostList.length / postPerPage.current);
		setPageNum(totalPageNum.current);
	}, [PostList]);

	return (
		<Layout index={'04'} title={'Community'}>
			<section className='txt-area'>
				<figure>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</figure>
				<div className='txt'>
					<span className='stit'>WHAT WE DO</span>
					<span className='con'>
						We believe that we can live in a world where <span className='border-txt'>every product</span> or service
						has a good quality like us.
					</span>
				</div>
			</section>
			<section className='comment'>
				<h1 className='tit'>Feedback</h1>
				<div className='wrap-box'>
					<div className='input-box'>
						<input ref={refInput} type='text' placeholder='Subject' />
						<textarea ref={refText} cols='30' rows='5' placeholder='Share your thoughts...'></textarea>
						<div className='btn-set'>
							<button className='cancel' onClick={resetPost}>
								cancel
							</button>
							<button className='submit' onClick={submitPost}>
								submit &nbsp; &nbsp;&rarr;
							</button>
						</div>
					</div>
					<div className='show-box'>
						{CurrentPostList.map((list, idx) => {
							const getDate = () => {
								const date = JSON.stringify(list.date);
								if (date) {
									const strDate = customDate(date.split('T')[0].slice(1), '.');
									const strTime = date.split('T')[1].split('Z')[0].split('.')[0];
									return { strDate, strTime };
								} else return;
							};
							return (
								<article key={list + idx}>
									{list.editMode ? (
										// 수정
										<>
											<span className='num'>{idx < 10 ? '0' + (idx + 1) : idx + 1}</span>
											<h2>
												<input ref={refEditInput} type='text' defaultValue={list.subject} className='edit' />
											</h2>
											<p className='txt'>
												<textarea
													ref={refEditText}
													cols='30'
													rows='5'
													defaultValue={list.content}
													className='edit'></textarea>
											</p>
											<div className='con-btm'>
												<div className='date'>
													<p>{getDate().strDate}</p>
													<span className='line'></span>
													<p>{getDate().strTime}</p>
												</div>
												<div className='btn-set'>
													<button className='delete' onClick={() => noUpdatePost(idx)}>
														<CgCloseR />
													</button>
													<button className='edit' onClick={() => confirmUpdatePost(idx)}>
														<CgCheckR />
													</button>
												</div>
											</div>
										</>
									) : (
										// 출력
										<>
											<span className='num'>{idx < 10 ? '0' + (idx + 1) : idx + 1}</span>
											<h2>{list.subject}</h2>
											<p className='txt'>{list.content}</p>
											<div className='con-btm'>
												<div className='date'>
													<p>{getDate().strDate}</p>
													<span className='line'></span>
													<p>{getDate().strTime}</p>
												</div>
												<div className='btn-set'>
													<button className='delete' onClick={() => deletePost(idx)}>
														<AiOutlineDelete />
													</button>
													<button className='edit' onClick={() => editPost(idx)}>
														<FaRegEdit />
													</button>
												</div>
											</div>
										</>
									)}
								</article>
							);
						})}
						{PostList.length > 6 && (
							<div className='pagination'>
								<button className='prev' disabled={CurNum === 1}>
									<MdKeyboardDoubleArrowLeft />
								</button>
								<span className='numbers'>
									{Array(PageNum)
										.fill()
										.map((_, idx) => {
											return (
												<button
													key={idx}
													onClick={() => (idx + 1 !== CurNum ? setCurNum(idx + 1) : '')}
													className={idx + 1 === CurNum ? 'on' : ''}>
													{idx + 1}
												</button>
											);
										})}
								</span>
								<button className='next' disabled={CurNum === totalPageNum.current}>
									<MdKeyboardDoubleArrowRight />
								</button>
							</div>
						)}
					</div>
				</div>
			</section>
		</Layout>
	);
}
