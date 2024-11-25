export default {
	ValidateTitles () {
		let isValidate = true;
		const statusReason = Input16.text;

		try {
			// Check if a status is selected
			if(Select3.selectedOptionValue === '') {
				showAlert("Please select at least one status", 'warning');
				isValidate = false;
			}

			// Check if 'Rejected' is selected and validate the status reason if necessary
			if(Select3.selectedOptionLabel === 'Rejected') {
				if(Select4.selectedOptionLabel === 'Others') {
					if(!statusReason) {
						showAlert("Reason For Status is required", "error");
						isValidate = false;
					}
				} else if(Select4.selectedOptionLabel !== 'Others' && Select4.selectedOptionLabel === '') {
					showAlert("Reason For Status is required", "error");
					isValidate = false;
				}
			}

			// If validation passes, show the modal
			if(isValidate) {
				showModal(Modal13.name);
			}

		} catch (error) {
			// Handle any unexpected errors
			console.error("Validation Error: ", error);
			showAlert("An unexpected error occurred during validation. Please try again.", "error");
		}
	}
}
