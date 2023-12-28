import { useQuery } from '@tanstack/react-query';

const fetchFlickr = async ({ queryKey: [_, opt] }) => {
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
	return json.photos.photo;
};

export const useFlickrQuery = opt => {
	return useQuery(['fetchFlickr', opt], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
