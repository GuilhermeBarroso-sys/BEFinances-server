import { format } from "date-fns";

export function convertDateToString(date : Date) {
	return format(date, 'yyyy-MM-dd HH:mm:ss');
}