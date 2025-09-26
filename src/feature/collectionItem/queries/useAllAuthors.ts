import { useSuspenseQuery } from "@tanstack/react-query";
import { allAuthorsOptions } from "@/feature/collectionItem/options/allAuthorsOptions";

export const useAllAuthors = () => {
	return useSuspenseQuery(allAuthorsOptions);
};
