import { parseISO } from 'date-fns';

function convertsDateEvents(events = []) {
	return events.map((event) => {
		event.start = parseISO(event.start);
		event.end = parseISO(event.end);

		return event;
	});
}

export default convertsDateEvents;
