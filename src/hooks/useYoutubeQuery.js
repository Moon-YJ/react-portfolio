import { useQuery } from '@tanstack/react-query';

const api_key = process.env.REACT_APP_YOUTUBE_API;

const fetchYoutube = async () => {
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

// const fetchYoutubeDetail = async ({ queryKey }) => {
//   let vidId = '';
// 	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${queryKey[1]}`;
// 	try {
// 		const data = await fetch(baseURL);
// 		const json = await data.json();
// 		vidId = json.items[0].snippet.resourceId.videoId;
// 		const statisticsURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${vidId}&key=${api_key}`;
//     return json.items[0].snippet;
// 		try {
// 			const data = await fetch(statisticsURL);
// 			const json = await data.json();
// 			return json.items[0].statistics;
// 		} catch (err) {
// 			throw err;
// 		}
// 	} catch (err) {
// 		throw err;
// 	}
// };

// export const useYoutubeDetailQuery = id => {
// 	return useQuery(['fetchYoutube', id], fetchYoutubeDetail, {
// 		refetchOnMount: false,
// 		refetchOnWindowFocus: false,
// 		cacheTime: 1000 * 60 * 60 * 20,
// 		staleTime: 1000 * 60 * 60 * 20,
// 		retry: 4
// 	});
// };
