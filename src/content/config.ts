import { z, defineCollection } from "astro:content";

const specializations = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		category: z.string(),
		identity: z.string(),
		levels: z.array(z.number()),
		description: z.string(),
	}),
});

export const collections = {
	specializations,
};
