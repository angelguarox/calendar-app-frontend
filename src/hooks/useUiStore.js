import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';

function useUiStore() {
	const { isDateModalOpen } = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	const openDateModal = () => {
		dispatch(onOpenDateModal());
	};

	const closeDateModal = () => {
		dispatch(onCloseDateModal());
	};

	return {
		isDateModalOpen,
		openDateModal,
		closeDateModal,
	};
}

export default useUiStore;
