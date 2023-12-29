import { useQuery } from '@tanstack/react-query';

//const commonURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=I3ehVbjL4FE&key=${process.env.REACT_APP_YOUTUBE_API}`;

const fetchYoutubeStatistics = async ({ queryKey: [_, url] }) => {
	try {
		const data = await fetch(url);
		const json = await data.json();
		return json.items[0].statistics;
	} catch (err) {
		throw err;
	}
};

export const useYoutubeStatisticsQuery = url => {
	return useQuery(['fetchYoutubeStatistics', url], fetchYoutubeStatistics, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 20,
		staleTime: 1000 * 60 * 60 * 20,
		retry: 4
		//placeholderData: commonURL
	});
};
