import { getCollection } from "astro:content";

export async function GET() {
	const specializations = await getCollection("specializations");

	const gridData = specializations.map((specialization) => ({
		name: specialization.data.name,
		category: specialization.data.category,
		identity: specialization.data.identity,
		levels: specialization.data.levels,
		description: specialization.data.description,
	}));

	return new Response(JSON.stringify(gridData));
}
