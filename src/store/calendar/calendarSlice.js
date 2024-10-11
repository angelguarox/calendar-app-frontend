import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tmpEvent = {
	_id: new Date().getTime(),
	title: 'Cumple del jefe',
	notes: 'Comprar el pastel',
	start: new Date(),
	end: addHours(new Date(), 2),
	bgColor: '#fafafa',
	user: {
		_id: 'abc123',
		name: 'angelguarox',
	},
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		events: [tmpEvent],
		activeEvent: null,
	},
	reducers: {
		onSetActiveEvent: (state, { payload }) => {
			state.activeEvent = payload;
		},
		onAddNewEvent: (state, { payload }) => {
			state.events.push(payload);
			state.activeEvent = null;
		},
		onUpdateEvent: (state, { payload }) => {
			state.events = state.events.map((event) => {
				if (event._id === payload._id) {
					return payload;
				}
				return event;
			});
		},
		onDeleteEvent: (state) => {
			if (state.activeEvent) {
				state.events = state.events.filter(
					(event) => event._id !== state.activeEvent._id,
				);
				state.activeEvent = null;
			}
		},
	},
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
	calendarSlice.actions;
