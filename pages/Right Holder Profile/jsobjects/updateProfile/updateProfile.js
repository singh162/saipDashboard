export default {
	updateRightHolderProfile: async () => {
		try {
			let isUpdate = true; // Flag to check if we should proceed with the update
			// Extracting values from widgets
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
			const document = FilePicker1.files.length > 0 ? FilePicker1.files[0].data : Table1.triggeredRow.document;

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
			if(!status){
				showAlert("Status is required", "error");
				isUpdate = false;
			}

			// If the validation failed, stop the update process
			if (isUpdate) {
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
					Status:status,
					digitalSignature: digitalSignature,
					document: document,
				});

				if (queryResponse) {
					showAlert("Update successful", "success");
					await RightHolderInfo.run();
					closeModal(Modal4.name);
					console.log("tyestemail",Table1.triggeredRow.Status,	Select1.selectedOptionLabel);
					if(appsmith.store.intialStatus !== Select1.selectedOptionLabel && Select1.selectedOptionLabel!=="InProgress"){

						await SendEmail.run();
						showAlert("Email has been sent to the right holder","info");
					}
				} else {
					showAlert("Update failed", "error");
				}
			}
		} catch (error) {
			showAlert("An error occurred: " + error.message, "error");
		}
	},
};
