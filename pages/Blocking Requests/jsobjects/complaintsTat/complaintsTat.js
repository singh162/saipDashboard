export default {	
	insertBuildData:{
		session_id: null,
		complaint_date: "",
		complaint_time: "",
		complainant: "",
		complaint_code: "",
		complaint_category: "",
		received_during_work_hours: 0,
		number_of_sites: 0,
		violation_percentage: "",
		number_of_violating_sites: 0,
		complaint_sub_date: "",
		complaint_sub_time: "",
		complaint_application_number: null,
		complaint_sub_duration: "",
		complaint_resolve_date: "",
		complaint_resolve_time: "",
		complaint_resolve_duration_from_sub: "",
		complaint_resolve_duration_from_receive: ""
	},
	updateBuildData:{},
	validateData(data) {
		const errors = [];

		// Validate session_id (optional but must be a number if provided)

		// Validate complainant (required)
		if (!data.complainant || typeof data.complainant !== 'string') {
			errors.push("Complainant is required and must be a string");
		}

		// Validate complaint_code (required)
		if (!data.complaint_code || typeof data.complaint_code !== 'string') {
			errors.push("Complaint code is required and must be a string");
		}
		return errors;
	},
	buildUpdateObject() {
		const buildData = {};

		// Check if fields are visible and get values from the form data; otherwise, use source data
		buildData.session_id =Input4.text ? Input4.text : null;

		buildData.complaint_date =DatePicker1.selectedDate ?  moment(DatePicker1.selectedDate).format('YYYY-MM-DD') :  null;

		buildData.complaint_time = Complaint_Time.text ?  moment(Complaint_Time.text, 'HH:mm').format('HH:mm:ss'): null;

		buildData.complainant = Input4Copy2.text ? Input4Copy2.text:  null ;

		buildData.complaint_code =  Input4Copy3.text ? Input4Copy3.text:  null ;

		buildData.complaint_category =  Input4Copy4.text ? Input4Copy4.text:  null ;

		buildData.received_during_work_hours =  Input4Copy5.text ? Input4Copy5.text:  null ;
		buildData.number_of_sites =  Input4Copy6.text ? Input4Copy6.text:  null ;

		buildData.violation_percentage =  Input4Copy6Copy.text ? Input4Copy6Copy.text:  null ;

		buildData.number_of_violating_sites = Input4Copy6Copy1.text ? Input4Copy6Copy1.text:  null ;

		buildData.complaint_sub_date = DatePicker4.selectedDate ? moment(DatePicker4.selectedDate).format('YYYY-MM-DD') :  null;

		buildData.complaint_sub_time = Input4Copy6Copy3.text ? Input4Copy6Copy3.text:  null ;
		;

		buildData.complaint_application_number = Input4Copy7.text ? Input4Copy7.text:  null ;

		buildData.complaint_sub_duration =  Input4Copy8.text ? Input4Copy8.text:  null ;

		buildData.complaint_resolve_date  = DatePicker5.formattedDate ? moment(DatePicker5.formattedDate).format('YYYY-MM-DD') :  null;

		buildData.complaint_resolve_time = Input4Copy9.text ?  moment(Input4Copy9.text, 'HH:mm').format('HH:mm:ss'):null;

		buildData.complaint_resolve_duration_from_sub =  Input4Copy9Copy.text ? Input4Copy9Copy.text:null;

		buildData.complaint_resolve_duration_from_receive =  Input4Copy9Copy1.text ? Input4Copy9Copy1.text:null;

		return buildData;
	},
	async buildData(data) {
		const buildData = {};

		// Include valid data fields with type-specific handling
		if (data.session_id !== undefined) buildData.session_id = data.session_id;

		if (data.complaint_date) {
			buildData.complaint_date = moment(data.complaint_date).format('YYYY-MM-DD');
		}

		if (data.complaint_time) {
			buildData.complaint_time = moment(data.complaint_time, 'HH:mm').format('HH:mm:ss');
		}

		if (data.complainant) buildData.complainant = data.complainant;
		if (data.complaint_code) buildData.complaint_code = data.complaint_code;
		if (data.complaint_category) buildData.complaint_category = data.complaint_category;

		if (data.received_during_work_hours !== undefined) {
			buildData.received_during_work_hours = data.received_during_work_hours;
		}

		if (data.number_of_sites !== undefined) buildData.number_of_sites = data.number_of_sites;

		if (data.violation_percentage) buildData.violation_percentage = data.violation_percentage;

		if (data.number_of_violating_sites !== undefined) {
			buildData.number_of_violating_sites = data.number_of_violating_sites;
		}

		if (data.complaint_sub_date) {
			buildData.complaint_sub_date = moment(data.complaint_sub_date).format('YYYY-MM-DD');
		}

		if (data.complaint_sub_time) {
			buildData.complaint_sub_time = moment(data.complaint_sub_time, 'HH:mm').format('HH:mm:ss');
		}

		if (data.complaint_application_number !== undefined) {
			buildData.complaint_application_number = data.complaint_application_number;
		}

		if (data.complaint_sub_duration) buildData.complaint_sub_duration = data.complaint_sub_duration;

		if (data.complaint_resolve_date) {
			buildData.complaint_resolve_date = moment(data.complaint_resolve_date).format('YYYY-MM-DD');
		}

		if (data.complaint_resolve_time) {
			buildData.complaint_resolve_time = moment(data.complaint_resolve_time, 'HH:mm').format('HH:mm:ss');
		}

		if (data.complaint_resolve_duration_from_sub) {
			buildData.complaint_resolve_duration_from_sub = data.complaint_resolve_duration_from_sub;
		}

		if (data.complaint_resolve_duration_from_receive) {
			buildData.complaint_resolve_duration_from_receive = data.complaint_resolve_duration_from_receive;
		}

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
			this.insertBuildData = await this.buildData(data);
			await InsertQuery_CTAT.run();
			showAlert('Data inserted successfully!', 'success');
			closeModal(Insert_Modal_CTAT.name);
			await SelectQuery_CTAT.run();
			this.insertBuildData={
				session_id: null,
				complaint_date: "",
				complaint_time: "",
				complainant: "",
				complaint_code: "",
				complaint_category: "",
				received_during_work_hours: 0,
				number_of_sites: 0,
				violation_percentage: "",
				number_of_violating_sites: 0,
				complaint_sub_date: "",
				complaint_sub_time: "",
				complaint_application_number: null,
				complaint_sub_duration: "",
				complaint_resolve_date: "",
				complaint_resolve_time: "",
				complaint_resolve_duration_from_sub: "",
				complaint_resolve_duration_from_receive: ""
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

			await UpdateQuery_CTAT.run();
			showAlert('Data updated successfully!', 'success');
			await SelectQuery_CTAT.run();
			closeModal(UpdateCtatConfirmation.name);
		} catch (error) {
			showAlert('Error updating data: ' + error.message, 'error');
		}
	},
	async CorrectFileUploaded(){
		try{
			// Expected headers
			const expectedHeaders = [
				"id",
				"session_id",
				"complaint_date",
				"complaint_time",
				"complainant",
				"complaint_code",
				"complaint_category",
				"received_during_work_hours",
				"number_of_sites",
				"violation_percentage",
				"number_of_violating_sites",
				"complaint_sub_date",
				"complaint_sub_time",
				"complaint_application_number",
				"complaint_sub_duration",
				"complaint_resolve_date",
				"complaint_resolve_time",
				"complaint_resolve_duration_from_sub",
				"complaint_resolve_duration_from_receive"
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
					await SelectQuery_CTAT.run();
				}
			}
		}
		catch(ex)
		{
			showAlert("Error in File Upload","Error");
		}
	},
	// Function to handle mutilple deletion
	async deleteMutipleData(id) {
		if (!id) {
			return showAlert('Report entry data is required for deletion', 'error');
		}

		try {
			id = id.join(", ");
			console.log("asdasdasdSA",id);
			await DeleteMutipleCtat.run({id:id});
			showAlert('mutiple data deleted successfully!', 'success');
			closeModal(DeleteMutipleCtatCopy.name);
			await SelectQuery_CTAT.run();
		} catch (error) {
			showAlert('Error deleting data: ' + error.message, 'error');
		}
	},
	// Function to handle deletion
	async deleteData(id) {
		if (!id) {
			return showAlert('id is required for deletion', 'error');
		}

		try {
			DeleteQuery_CTAT.run();
			showAlert('Data deleted successfully!', 'success');
			closeModal(DeleteSingleCtat.name);
			await SelectQuery_CTAT.run();
		} catch (error) {
			showAlert('Error deleting data: ' + error.message, 'error');
		}
	},

	async blockingturnAroundRequest(action) {
		let data=insert_form_CTAT.formData;
		switch (action) {
			case 'insert':
				await this.insertData(data);
				break;
			case 'update':
				await this.updateData();
				break;
			case 'delete':
				await this.deleteData(data_table_CTAT.triggeredRow ? data_table_CTAT.triggeredRow.id : null);
				break;
			case 'deleteMutiple':
				let ids= data_table_CTAT.selectedRows ? data_table_CTAT.selectedRows .length>0 ?  data_table_CTAT.selectedRows.map(report => report.id):[]:[];
				await this.deleteMutipleData(ids);
				break;
			case 'fileUploader':
				await this.fileUploads();
				break;
			default:
				showAlert('Invalid action specified', 'error');
		}
	}
}
