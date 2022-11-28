import { parse } from "date-fns";

export function convertStringToDate(dateString : string) {
	return parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
}