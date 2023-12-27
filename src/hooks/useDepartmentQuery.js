import { useQuery } from '@tanstack/react-query';

const fetchDepartment = async () => {
	try {
		const data = await fetch(`${process.env.PUBLIC_URL}/DB/department.json`);
		const json = await data.json();
		return json;
	} catch (err) {
		throw err;
	}
};

export const useDepartmentQuery = () => {
	return useQuery(['fetchDepartment'], fetchDepartment, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 20,
		staleTime: 1000 * 60 * 60 * 20,
		retry: 4
	});
};
