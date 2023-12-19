const path = process.env.PUBLIC_URL;

export const fetchMember = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = await data.json();
	return json;
};

export const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const pId = process.env.REACT_APP_YOUTUBE_pID;
	const num = 7;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pId}&maxResults=${num}`;
	const data = await fetch(baseURL);
	const json = await data.json();
	return json;
};
