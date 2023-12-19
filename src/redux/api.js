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

export const fetchFlickr = async opt => {
	const num = 20;
	const flickr_api = process.env.REACT_APP_FLICKR_KEY;
	const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
	const method_random = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const randomURL = `${baseURL}${method_random}`;
	const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
	const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;
	let url = '';
	opt.type === 'random' && (url = randomURL);
	opt.type === 'user' && (url = userURL);
	opt.type === 'search' && (url = searchURL);

	const data = await fetch(url);
	const json = await data.json();
	return json;
};
