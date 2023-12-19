const path = process.env.PUBLIC_URL;

export const fetchMember = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = await data.json();
	return json;
};
