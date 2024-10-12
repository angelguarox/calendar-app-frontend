import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store/calendar/calendarSlice';
import convertsDateEvents from '../helpers/convertsDateEvents';
import Swal from 'sweetalert2';

function useCalendarStore() {
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async (calendarEvent) => {
		try {
			if (calendarEvent._id) {
				await calendarApi.put(`/events/${calendarEvent._id}`, calendarEvent);
				dispatch(onUpdateEvent({ ...calendarEvent, user }));
				return;
			}

			const { data } = await calendarApi.post('/events', calendarEvent);
			dispatch(onAddNewEvent({ ...calendarEvent, _id: data.data._id, user }));
		} catch (error) {
			console.error(error);
			Swal.fire(`Can't save`, error.response.data.msg, 'error');
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`/events/${activeEvent._id}`);
			dispatch(onDeleteEvent());
		} catch (error) {
			console.error(error);
			Swal.fire(`Can't delete`, error.response.data.msg, 'error');
		}
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events');
			const events = convertsDateEvents(data.data);
			dispatch(onLoadEvents(events));
		} catch (error) {
			console.error(error);
			Swal.fire('Upload not be executed', error.response.data.msg, 'error');
		}
	};

	return {
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	};
}

export default useCalendarStore;
