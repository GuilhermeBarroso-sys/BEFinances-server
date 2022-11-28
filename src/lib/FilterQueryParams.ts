class FilterQueryParams {
	static handle(limit? : string, offset? : string) {

		const take = parseInt(limit);
		const skip = parseInt(offset);
		return {
			take: !isNaN(take) ? take : undefined,
			skip: !isNaN(skip) ? skip : undefined
		};
	}
}


export { FilterQueryParams};