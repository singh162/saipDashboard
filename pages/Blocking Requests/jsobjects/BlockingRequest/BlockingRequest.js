export default {	
	insertBuildData:{
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
	},
	updateBuildData:{},
	validateData(data) {
		const errors = [];

		// Validate reporter (required)
		if (!data.reporter || typeof data.reporter !== 'string') {
			errors.push("Reporter is required and must be a string");
		}

		// Validate number_of_sites (optional but must be a number if provided)
		if (data.number_of_sites !== undefined && (isNaN(data.number_of_sites) || typeof data.number_of_sites !== 'number')) {
			errors.push("Number of sites must be a valid number");
		}

		// Validate type_of_material (required)
		if (!data.type_of_material || typeof data.type_of_material !== 'string') {
			errors.push("Type of material is required and must be a string");
		}

		// Validate report_number (required)
		if (!data.report_number || typeof data.report_number !== 'string') {
			errors.push("Report number is required and must be a string");
		}

		// Validate date (required)
		if (!data.date || isNaN(new Date(data.date).getTime())) {
			errors.push("Date is required and must be a valid datetime");
		}

		// Validate employee (optional but must be a string if provided)
		if (data.employee && typeof data.employee !== 'string') {
			errors.push("Employee must be a string if provided");
		}

		// Return errors array, empty if no errors
		return errors;
	},
	buildUpdateObject() {
		const buildData = {};

		// Check if fields have values; if not, set them to null
		buildData.reporter = Input1Copy1.text ? Input1Copy1.text : null;
		buildData.number_of_sites = Input1Copy2.text ? Input1Copy2.text : null;
		buildData.type_of_material = Input1Copy4.text ? Input1Copy4.text : null;
		buildData.report_number = Input1Copy5.text ? Input1Copy5.text : null;
		buildData.incoming_number = Input1Copy6.text ? Input1Copy6.text : null;

		buildData.date = DatePicker2.selectedDate
			? moment(DatePicker2.selectedDate).format('YYYY-MM-DD HH:mm:ss') 
		: null;

		buildData.non_working_sites = Input1.text ? Input1.text : null;
		buildData.blocked_sites = Input1Copy7.text ? Input1Copy7.text : null;
		buildData.not_violating = Input1Copy8Copy.text ? Input1Copy8Copy.text : null;
		buildData.submitted_for_blocking = Input1Copy8Copy1.text ? Input1Copy8Copy1.text : null;

		buildData.blocking_letter_request_number = Input1Copy8.text ? Input1Copy8.text : null;
		buildData.site_inspection_date = DatePicker2Copy.selectedDate 
			? moment(DatePicker2Copy.selectedDate).format('YYYY-MM-DD HH:mm:ss') 
		: null;

		buildData.employee = Input1Copy8Copy3.text ? Input1Copy8Copy3.text : null;
		buildData.blocking_letter_request_number = Input1Copy8.text ? Input1Copy8.text : null;
		buildData.notes = Input1Copy8Copy4.text ? Input1Copy8Copy4.text : null;

		return buildData;
	},

	async buildObject(data) {
		const buildData = {};

		// Only include valid data fields
		if (data.reporter) buildData.reporter = data.reporter;
		if (data.number_of_sites !== undefined) buildData.number_of_sites = data.number_of_sites;
		if (data.type_of_material) buildData.type_of_material = data.type_of_material;
		if (data.report_number) buildData.report_number = data.report_number;
		if (data.incoming_number) buildData.incoming_number = data.incoming_number;

		// Format 'date' and 'site_inspection_date' using moment.js
		if (data.date) {
			buildData.date = moment(data.date).format('YYYY-MM-DD HH:mm:ss');
		}

		if (data.site_inspection_date) {
			buildData.site_inspection_date = moment(data.site_inspection_date).format('YYYY-MM-DD HH:mm:ss');
		}

		// Other fields
		if (data.non_working_sites !== undefined) buildData.non_working_sites = data.non_working_sites;
		if (data.blocked_sites !== undefined) buildData.blocked_sites = data.blocked_sites;
		if (data.not_violating !== undefined) buildData.not_violating = data.not_violating;
		if (data.submitted_for_blocking !== undefined) buildData.submitted_for_blocking = data.submitted_for_blocking;
		if (data.blocking_letter_request_number) buildData.blocking_letter_request_number = data.blocking_letter_request_number;
		if (data.employee) buildData.employee = data.employee;
		if (data.notes) buildData.notes = data.notes;

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
			await InsertQueryComplaints.run();
			showAlert('Data inserted successfully!', 'success');
			closeModal(Insert_Modal_Complaints.name);
			await SelectQueryComplaints.run();
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

			await UpdateQueryComplaints.run();
			showAlert('Data updated successfully!', 'success');
			await SelectQueryComplaints.run();
			resetWidget(updateBlockingConfirmation.name);
			closeModal(updateBlockingConfirmation.name)
		} catch (error) {
			showAlert('Error updating data: ' + error.message, 'error');
		}
	},

	// Function to handle mutilple deletion
	async deleteMutipleData(report_entry_data) {
		if (!report_entry_data) {
			return showAlert('Report entry data is required for deletion', 'error');
		}

		try {
			console.log("report_entry_data",report_entry_data);
			report_entry_data = report_entry_data.join(", ");
			await DeleteMutipleQueryComplaints.run({id:report_entry_data});
			showAlert('Data deleted successfully!', 'success');
			closeModal(DeleteMutipleBlockingRequest.name);
			await SelectQueryComplaints.run();
		} catch (error) {
			showAlert('Error deleting data: ' + error.message, 'error');
		}
	},
	// Function to handle deletion
	async deleteData(report_entry_data) {
		if (!report_entry_data) {
			return showAlert('Report entry data is required for deletion', 'error');
		}

		try {
			DeleteQueryComplaints.run();
			showAlert('Data deleted successfully!', 'success');
			closeModal(DeleteSingeBlockingConfirmatio.name);
			await SelectQueryComplaints.run();


		} catch (error) {
			showAlert('Error deleting data: ' + error.message, 'error');
		}
	},
	async buildCompaints(rows) {
		// Define a list of fields with datetime type

		// Define a list of fields with datetime type
		const integerFields = [
			'non_working_sites',
			'number_of_sites',
			'blocked_sites',
			'not_violating',
			'submitted_for_blocking'
		];
		const datetimeFields =[
			'date',
			'site_inspection_date'
		]

		// Iterate through each object in the array
		rows.forEach(row => {
			// Iterate through each field in the object
			Object.keys(row).forEach(key => {
				if (datetimeFields.includes(key)) {
					try {
						if(row[key]){
							row[key] = moment(row[key]).format('YYYY-MM-DD HH:mm:ss');
						}
						else
						{
							row[key] = null;
						}
					} catch (error) {
						console.error(`Error formatting date field ${key}:`, error);
						row[key] = row[key]; // retain original value in case of error
					}
				}
				else if(integerFields.includes(key))
				{
					row[key] = row[key] === '' ? null : row[key];
				}
				else {
					if(row[key] === '' || row[key] === 'N/A'){
						row[key] = null;
					}
				}
				if(row[key]){
					if(typeof row[key] === 'string'){
						row[key] = row[key].replace(/'/g, "''");
						row[key] = row[key].replace(/\\/g, '');
					}
				}
			});
		});

		console.log("rows",rows);
		return rows;
	},
	async CorrectFileUploaded(){
		try{
			// Expected headers
			const expectedHeaders = [
				'report_entry_data',
				'reporter',
				'number_of_sites',
				'type_of_material',
				'report_number',
				'incoming_number',
				'date',
				'non_working_sites',
				'blocked_sites',
				'not_violating',
				'submitted_for_blocking',
				'blocking_letter_request_number',
				'site_inspection_date',
				'employee',
				'notes'
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
					await UploadFileFunction.uploadFile('Compaints');
					showAlert("Data inserted successfully!", 'success');
					resetWidget(FilePicker1,true);
					await SelectQueryComplaints.run();
				}
			}
		}
		catch(ex)
		{
			showAlert("Error in File Upload","Error");
		}
	},
	async blockingRequest(action) {
		let data=insert_form_Complaints.formData;
		switch (action) {
			case 'insert':
				await this.insertData(data);
				break;
			case 'update':
				await this.updateData();
				break;
			case 'delete':
				await this.deleteData(data_table_Complaints.triggeredRow ? data_table_Complaints.triggeredRow.report_entry_data : null);
				break;
			case 'deleteMutiple':
				let ids= data_table_Complaints.selectedRows ? data_table_Complaints.selectedRows .length>0 ?  data_table_Complaints.selectedRows.map(report => report.report_entry_data):[]:[];
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
