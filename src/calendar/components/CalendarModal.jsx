import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import useUiStore from '../../hooks/useUiStore';
import useCalendarStore from '../../hooks/useCalendarStore';

registerLocale('es', es);

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

function CalendarModal() {
	const { isDateModalOpen, closeDateModal } = useUiStore();
	const { activeEvent, startSavingEvent } = useCalendarStore();
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [formValues, setFormValues] = useState({
		title: '',
		notes: '',
		start: new Date(),
		end: addHours(new Date(), 2),
	});

	const tittleClass = useMemo(() => {
		if (!formSubmitted) return '';
		return formValues.title.length > 0 ? '' : 'is-invalid';
	}, [formValues.title, formSubmitted]);

	useEffect(() => {
		if (activeEvent !== null) {
			setFormValues({ ...activeEvent });
		}
	}, [activeEvent]);

	const onCloseModal = () => {
		closeDateModal();
	};

	const onInputChanged = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const onDateChanged = (event, changing) => {
		setFormValues({
			...formValues,
			[changing]: event,
		});
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setFormSubmitted(true);
		const diff = differenceInSeconds(formValues.end, formValues.start);

		if (isNaN(diff) || diff <= 0) {
			Swal.fire('Incorrect dates', 'Review the dates entered', 'error');
			return;
		}
		if (formValues.title.length <= 0) {
			Swal.fire('Title must contain text', 'Enter a title', 'error');
			return;
		}
		await startSavingEvent(formValues);
		closeDateModal();
		setFormSubmitted(false);
	};

	return (
		<Modal
			isOpen={isDateModalOpen}
			onRequestClose={onCloseModal}
			style={customStyles}
			className='modal'
			overlayClassName='modal-fondo'
			closeTimeoutMS={200}
		>
			<h1> Nuevo evento </h1>
			<hr />
			<form className='container' onSubmit={onSubmit}>
				<div className='form-row d-flex align-item-center justify-content-center'>
					<div className='form-group mr-2 mb-0'>
						<label>Fecha y hora inicio</label>
						<div className='form-group'>
							<DatePicker
								className='form-control'
								selected={formValues.start}
								onChange={(event) => onDateChanged(event, 'start')}
								dateFormat='Pp'
								showTimeSelect
								locale='es'
								timeCaption='Hora'
							/>
						</div>
					</div>

					<div className='form-group ml-2 mb-0'>
						<label>Fecha y hora fin</label>
						<div className='form-group'>
							<DatePicker
								className='form-control'
								selected={formValues.end}
								onChange={(event) => onDateChanged(event, 'end')}
								dateFormat='Pp'
								showTimeSelect
								locale='es'
								timeCaption='Hora'
								minDate={formValues.start}
							/>
						</div>
					</div>
				</div>

				<hr className='mt-0' />

				<div className='form-group mb-2'>
					<label>Titulo y notas</label>
					<input
						type='text'
						className={`form-control ${tittleClass}`}
						placeholder='Título del evento'
						name='title'
						autoComplete='off'
						value={formValues.title}
						onChange={onInputChanged}
					/>
					<small id='emailHelp' className='form-text text-muted'>
						Una descripción corta
					</small>
				</div>

				<div className='form-group mb-2'>
					<textarea
						type='text'
						className='form-control'
						placeholder='Notas'
						rows='5'
						name='notes'
						value={formValues.notes}
						onChange={onInputChanged}
					></textarea>
					<small id='emailHelp' className='form-text text-muted'>
						Información adicional
					</small>
				</div>

				<button type='submit' className='btn btn-outline-primary btn-block'>
					<i className='far fa-save'></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
}

export default CalendarModal;
