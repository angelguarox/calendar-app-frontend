import useUiStore from '../../hooks/useUiStore';
import useCalendarStore from '../../hooks/useCalendarStore';

function FabDelete() {
	const { startDeletingEvent, hasEventSelected } = useCalendarStore();
	const { isDateModalOpen } = useUiStore();

	const handleDelete = () => {
		startDeletingEvent();
	};

	return (
		<button
			className='btn btn-danger fab-danger'
			onClick={handleDelete}
			style={{ display: hasEventSelected && !isDateModalOpen ? '' : 'none' }}
		>
			<i className='fas fa-trash-alt'></i>
		</button>
	);
}

export default FabDelete;
