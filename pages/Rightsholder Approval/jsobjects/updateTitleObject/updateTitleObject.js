export default {
	async updateTitle () {
		let status = Select3.selectedOptionLabel;
		let statusReason = Input16.text;

		try {
			// Handle status and reason logic
			if(Select3.selectedOptionValue === "Rejected") {
				if(Select3.selectedOptionLabel === "Others") {
					statusReason = Input16.text;
				} else {
					statusReason = Select3.selectedOptionLabel + " " + Input16.text;
				}
			}

			// Prepare the update object
			let updateObject = {
				id: Table1Copy.triggeredRow.id,
				Status: status,
				rejectedReason: status === 'Rejected' ? statusReason : '',
				updated_at: moment().format("YYYY-MM-DD HH:mm:ss") // Format the date using Moment.js
			};
			console.log(updateObject);
			storeValue("TitleStatus",status);
			storeValue("TitleReason",statusReason);
			// Run the update query
			await updateTiles.run(updateObject);

			// Show success alert
			showAlert("Title updated successfully!", "success");

			// Trigger the server-side filter update
			await getTitlesServerFilters.run();

			// Close the modal			resetWidget("Modal13")
			resetWidget("Modal13")
			closeModal(Modal13.name);

		} catch (error) {
			// Handle any errors during the process
			console.error("Error updating title: ", error);
			showAlert("An error occurred while updating the title. Please try again.", "error");
		}
	}
}
