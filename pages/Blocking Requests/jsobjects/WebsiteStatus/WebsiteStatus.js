export default {
	insertBuildData: {
		reporter: "",
		report_code: "",
		report_date: "",
		site_status: "",
		website_url: ""
	},
	updateBuildData:{},

	validateData(data) {
		const errors = [];

		// Validate reporter (optional but must be a string if provided)
		if (data.reporter && typeof data.reporter !== 'string') {
			errors.push("Reporter must be a string if provided");
		}

		// Validate report_code (optional but must be a string if provided)
		if (data.report_code && typeof data.report_code !== 'string') {
			errors.push("Report code must be a string if provided");
		}

		// Validate report_date (required)
		if (!data.report_date || isNaN(new Date(data.report_date).getTime())) {
			errors.push("Report date is required and must be a valid date");
		}

		// Validate site_status (optional but must be a string if provided)
		if (data.site_status && typeof data.site_status !== 'string') {
			errors.push("Site status must be a string if provided");
		}

		// Validate website_url (optional but must be a string if provided)
		if (data.website_url && typeof data.website_url !== 'string') {
			errors.push("Website URL must be a string if provided");
		}

		// Return errors array, empty if no errors
		return errors;
	},

	buildUpdateObject() {
		const buildData = {};

		// Check if fields are visible and get values from the form data; otherwise, use source data
		buildData.reporter = Input2.text;

		buildData.report_code = Input2Copy.text;

		buildData.report_date =  moment(DatePicker3.selectedDate).format('YYYY-MM-DD HH:mm:ss');

		buildData.site_status =Input2Copy2.text;

		buildData.website_url = Input3.text;

		return buildData;
	},

	async buildObject(data) {
		const buildData = {};

		// Only include valid data fields
		if (data.reporter) buildData.reporter = data.reporter;
		if (data.report_code) buildData.report_code = data.report_code;

		// Format 'report_date' using moment.js
		if (data.report_date) {
			buildData.report_date = moment(data.report_date).format('YYYY-MM-DD HH:mm:ss');
		}

		if (data.site_status) buildData.site_status = data.site_status;
		if (data.website_url) buildData.website_url = data.website_url;

		return buildData;
	},

	// Function to handle insertion
	async insertData(data) {
		// Validate the data before insertion
		const errors = this.validateData(data);
		if (errors.length > 0) {
			return showAlert(`Validation Errors: ${errors.join(", ")}`, 'error');
		}

		try {
			this.insertBuildData = await this.buildObject(data);
			console.log(this.insertBuildData);
			await InsertQuerySiteStatus.run();
			showAlert('Data inserted successfully!', 'success');
			closeModal(Insert_Modal.name);
			this.insertBuildData={
				reporter: "",
				number_of_sites: 0,
				type_of_material: "",
				report_number: "",
				incoming_number: "",
				date: "",
				non_working_sites: 0,
				blocked_sites: 0,
				not_violating: 0,
				submitted_for_blocking: 0,
				blocking_letter_request_number: "",
				site_inspection_date: "",
				employee: "",
				notes: ""
			}
			await SelectQuerySiteStatus.run();
		} catch (error) {
			showAlert('Error inserting data: ' + error.message, 'error');
		}
	},

	// Function to handle update
	async updateData() {
		this.updateBuildData = await this.buildUpdateObject();
		// Validate the data before updating
		const errors = this.validateData(this.updateBuildData);
		if (errors.length > 0) {
			return showAlert(`Validation Errors: ${errors.join(", ")}`, 'error');
		}

		try {
			await UpdateQuerySiteStatus.run();
			showAlert('Data updated successfully!', 'success');
			await SelectQuerySiteStatus.run();
			resetWidget(UpdateWebisteStatus.name);
			closeModal(UpdateWebisteStatus.name);
			closeModal(updateWebisteStatusConfirmatio.name);

		} catch (error) {
			showAlert('Error updating data: ' + error.message, 'error');
		}
	},
	// Function to handle mutilple deletion
	async deleteMutipleData(id) {
		if (!id) {
			return showAlert('Report entry data is required for deletion', 'error');
		}

		try {
			id = id.join(", ");
			await DeleteMutipleQueryWebiste.run({id:id});
			showAlert('mutiple data deleted successfully!', 'success');
			closeModal(DeleteMutipleSiteConfirmation.name);
			await SelectQuerySiteStatus.run();
		} catch (error) {
			showAlert('Error deleting data: ' + error.message, 'error');
		}
	},
	// Function to handle deletion
	async deleteData(id) {
		if (!id) {
			return showAlert('ID is required for deletion', 'error');
		}

		try {
			// Set the ID for deletion
			await DeleteQuerySiteStatus.run();
			showAlert('Data deleted successfully!', 'success');
			closeModal(DeleteSingeWebisteConfirmat.name);
			await SelectQuerySiteStatus.run();
		} catch (error) {
			showAlert('Error deleting data: ' + error.message, 'error');
		}
	},
	async CorrectFileUploaded(){
		try{
			// Expected headers
			const expectedHeaders = [
				"id",
				"reporter",
				"report_code",
				"report_date",
				"site_status",
				"website_url"
			];

			// Get the uploaded file data from FilePicker
			const uploadedFile = FilePicker1.files[0]; // Replace FilePicker1 with your actual FilePicker widget name

			if (!uploadedFile) {
				showAlert("No file uploaded!", "error");
				return false;
			}

			try {
				console.log("uploadedFile",uploadedFile.data);
				const fileHeaders = Object.keys(uploadedFile.data[0]); // Retrieves the header keys from the first object
				console.log("fileHeaders",fileHeaders);

				// Check if file headers match the expected headers
				const isHeadersValid = expectedHeaders.every(header => fileHeaders.includes(header));

				if (isHeadersValid) {
					showAlert("Headers are valid!", "success");
				} else {
					showAlert("Headers do not match!, Please Upload Correct Complaints File", "error");
				}

				return isHeadersValid;
			} catch (error) {
				showAlert("Error reading the file!", "error");
				return false;
			}
		}
		catch(ex){
			showAlert("Error in File Uploading","error");
		}
	},
	async fileUploads(){
		try{
			if(FilePicker1.files && FilePicker1.files.length === 0){
				showAlert("Please Upload the Insert File", "warning");
			}
			else{
				if(await this.CorrectFileUploaded()){
					await UploadFileFunction.uploadFile('Site Status');
					showAlert("Data inserted successfully!", 'success');
					resetWidget(FilePicker1,true);
					await SelectQuerySiteStatus.run();
				}
			}
		}
		catch(ex)
		{
			showAlert("Error in File Upload","Error");
		}
	},
	async siteStatusRequest(action) {
		let data = insert_form.formData;
		switch (action) {
			case 'insert':
				await this.insertData(data);
				break;
			case 'update':
				await this.updateData();
				break;
			case 'delete':
				await this.deleteData(data_table.triggeredRow ? data_table.triggeredRow.id : null);
				break;
			case 'deleteMutiple':
				let ids= data_table.selectedRows ? data_table.selectedRows .length>0 ?  data_table.selectedRows.map(report => report.id):[]:[];
				await this.deleteMutipleData(ids);
				break;
			case 'fileUploader':
				await this.fileUploads();
				break;
			default:
				showAlert('Invalid action specified', 'error');
		}
	}
};
