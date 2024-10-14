export default {
	// Separate function for validation checks
	validateRightHolderProfile: () => {

		storeValue("rightHolderEmail", Table1.triggeredRow.email);
		let isUpdate = true;

		const id = Table1.triggeredRow.id;
		const rightHolderUserId = Table1.triggeredRow.rightHolderUserId;
		const fullName = Input2.text;
		const company_name = Input12.text;
		const rightHolderName = Input3.text;
		const email = Input4.text;
		const phoneNumber = Input5.text;
		const address = Input6.text;
		const city = Input7.text;
		const state = Input8.text;
		const country = Select2Copy.selectedOptionLabel;
		const acknowledgement = Checkbox1Copy.isChecked;
		const digitalSignature = Input11.text;
		const status = Select1.selectedOptionLabel;
		const statusReason = Input13.text;

		// Validating required fields
		if (!id) {
			showAlert("ID is required to update the record", "error");
			isUpdate = false;
		}

		if (!rightHolderUserId) {
			showAlert("Right Holder User ID is required", "error");
			isUpdate = false;
		}
		if (!fullName) {
			showAlert("Full Name is required", "error");
			isUpdate = false;
		}
		if (!company_name) {
			showAlert("Company Name is required", "error");
			isUpdate = false;
		}
		if (!rightHolderName) {
			showAlert("Right Holder Name is required", "error");
			isUpdate = false;
		}
		if (!email) {
			showAlert("Email is required", "error");
			isUpdate = false;
		}
		if (!phoneNumber) {
			showAlert("Phone Number is required", "error");
			isUpdate = false;
		}
		if (!address) {
			showAlert("Address is required", "error");
			isUpdate = false;
		}
		if (!city) {
			showAlert("City is required", "error");
			isUpdate = false;
		}
		if (!state) {
			showAlert("State is required", "error");
			isUpdate = false;
		}
		if (!country) {
			showAlert("Country is required", "error");
			isUpdate = false;
		}
		if (!acknowledgement) {
			showAlert("Acknowledgement is required", "error");
			isUpdate = false;
		}
		if (!digitalSignature) {
			showAlert("Digital Signature is required", "error");
			isUpdate = false;
		}
		if (!status) {
			showAlert("Status is required", "error");
			isUpdate = false;
		}
		if(status === "Rejected" && !statusReason){
			showAlert("Reason For Status is required", "error");
			isUpdate = false;
		}
		// Return whether validation passed or failed
		if(isUpdate){
			showModal(Modal4.name);
		}
	},

	// Main function to update the Right Holder profile
	updateRightHolderProfile: async () => {
		try {
			storeValue("rightHolderNameEmail", Input3.text);
			storeValue("RegisterationInfo", Select1.selectedOptionLabel);

			const id = Table1.triggeredRow.id;
			const rightHolderUserId = Table1.triggeredRow.rightHolderUserId;
			const fullName = Input2.text;
			const company_name = Input12.text;
			const rightHolderName = Input3.text;
			const email = Input4.text;
			const phoneNumber = Input5.text;
			const address = Input6.text;
			const city = Input7.text;
			const state = Input8.text;
			const country = Select2Copy.selectedOptionLabel;
			const acknowledgement = Checkbox1Copy.isChecked;
			const digitalSignature = Input11.text;
			const status = Select1.selectedOptionLabel;
			const statusReason = Input13.text;
			const document = FilePicker1.files.length > 0 ? FilePicker1.files[0].data : Table1.triggeredRow.document;

			// If all fields are valid, proceed with the update
			const queryResponse = await UpdateRightHolderProfile.run({
				id: id,
				rightHolderUserId: rightHolderUserId,
				fullName: fullName,
				company_name: company_name,
				rightHolderName: rightHolderName,
				email: email,
				phoneNumber: phoneNumber,
				address: address,
				city: city,
				state: state,
				country: country,
				acknowledgement: acknowledgement,
				Status: status,
				reasonStatus :statusReason ? statusReason : null,
				digitalSignature: digitalSignature,
				document: document,
			});

			if (queryResponse) {
				showAlert("Update successful", "success");
				await RightHolderInfo.run();
				closeModal(Modal4.name);
				console.log("tyestemail", Table1.triggeredRow.Status, Select1.selectedOptionLabel);
				if (appsmith.store.initialStatus !== Select1.selectedOptionLabel && Select1.selectedOptionLabel !== "Under Review") {
					await SendEmail.run();
					showAlert("Email has been sent to the right holder", "success");
				}
			} else {
				showAlert("Update failed", "error");
			}

		} catch (error) {
			showAlert("An error occurred: " + error.message, "error");
		}
	},
};
