import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const pId = process.env.REACT_APP_YOUTUBE_pID;
	const num = 7;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pId}&maxResults=${num}`;
	const data = await fetch(baseURL);
	const json = await data.json();
	return json.items;
};

export const useYoutubeQuery = () => {
	return useQuery(['fetchYoutube'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 20,
		staleTime: 1000 * 60 * 60 * 20,
		retry: 4
	});
};
