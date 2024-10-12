import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import Navbar from '../components/Navbar';
import CalendarEvent from '../components/CalendarEvent.jsx';
import CalendarModal from '../components/CalendarModal.jsx';
import FabAddNew from '../components/FabAddNew.jsx';
import FabDelete from '../components/FabDelete.jsx';
import { localizer } from '../../helpers/calendarLocalizer.js';
import { getMessagesES } from '../../helpers/getMessages.js';
import useUiStore from '../../hooks/useUiStore.js';
import useAuthStore from '../../hooks/useAuthStore.js';
import useCalendarStore from '../../hooks/useCalendarStore.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function CalendarPage() {
	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'week',
	);
	const { openDateModal } = useUiStore();
	const { user } = useAuthStore();
	const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

	const eventStyleGetter = (event, start, end, isSelected) => {
		const isMyEvent = user._id === event.user._id;

		const style = {
			backgroundColor: isMyEvent ? '#347cf7' : '#465660',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white',
		};

		return { style };
	};

	const onDoubleClick = () => {
		openDateModal();
	};

	const onSelect = (event) => {
		setActiveEvent(event);
	};

	const onViewChanged = (event) => {
		localStorage.setItem('lastView', event);
		setLastView(event);
	};

	useEffect(() => {
		startLoadingEvents();
	}, []);

	return (
		<>
			<Navbar />
			<Calendar
				culture='es'
				localizer={localizer}
				events={events}
				defaultView={lastView}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 'calc(100vh - 80px)' }}
				// messages={getMessagesES()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChanged}
			/>
			<CalendarModal />
			<FabAddNew />
			<FabDelete />
		</>
	);
}

export default CalendarPage;
