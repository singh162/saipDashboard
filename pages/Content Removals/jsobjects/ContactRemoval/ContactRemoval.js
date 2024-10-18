export default {
	insertBuildData: {
		number_of_cases: "",
		request_number: "",
		request_date: "",
		basket_cases: "",
		amazon_cases: "",
		on_sale_cases: "",
		open_market_cases: "",
		used_and_new_cases: "",
		noon_cases: "",
		site_cases: "",
		contact_date_amazon: "",
		contact_date_on_sale: "",
		contact_date_used_and_new: "",
		contact_date_basket: "",
		contact_date_noon: "",
		contact_date_open_market: "",
		inquired_owners_number_of_cases: "",
		inquired_owners_date: "",
		blocked_number_of_cases: "",
		blocked_date: "",
		blocked_letter_number: "",
		violation_unproven_number_of_sites: "",
		duplicate_number_of_cases: ""
	},
	updateBuildData:{},

	validateData(data) {
		const errors = [];

		// Validate 'request_number' (required)
		console.log("request_number",typeof data.request_number);
		if (!data.request_number || typeof data.request_number !== 'string') {
			errors.push("Request number is required and must be a string");
		}

		// Validate 'request_date' (required)
		if (!data.request_date || isNaN(new Date(data.request_date).getTime())) {
			errors.push("Request date is required and must be a valid date");
		}
		// // Validate 'number_of_cases' (optional, must be an integer if provided)
		// if (data.number_of_cases && !Number.isInteger(data.number_of_cases)) {
		// errors.push("Number of cases must be an integer");
		// }
		// 
		// // Validate other date fields (optional, must be valid dates if provided)
		// const dateFields = [
		// 'contact_date_amazon', 'contact_date_on_sale', 'contact_date_used_and_new',
		// 'contact_date_basket', 'contact_date_noon', 'contact_date_open_market',
		// 'inquired_owners_date', 'blocked_date'
		// ];
		// 
		// dateFields.forEach(field => {
		// if (data[field] && isNaN(new Date(data[field]).getTime())) {
		// errors.push(`${field} must be a valid date`);
		// }
		// });

		// Return errors array, empty if no errors
		return errors;
	},

	buildObject(data) {
		const buildData = {};

		buildData.number_of_cases = data.number_of_cases || null;
		buildData.request_number = data.request_number || null;
		buildData.request_date = data.request_date ? moment(data.request_date).format('YYYY-MM-DD') : null;
		buildData.basket_cases = data.basket_cases || null;
		buildData.amazon_cases = data.amazon_cases || null;
		buildData.on_sale_cases = data.on_sale_cases || null;
		buildData.open_market_cases = data.open_market_cases || null;
		buildData.used_and_new_cases = data.used_and_new_cases || null;
		buildData.noon_cases = data.noon_cases || null;
		buildData.site_cases = data.site_cases || null;
		buildData.contact_date_amazon = data.contact_date_amazon ? moment(data.contact_date_amazon).format('YYYY-MM-DD') : null;
		buildData.contact_date_on_sale = data.contact_date_on_sale ? moment(data.contact_date_on_sale).format('YYYY-MM-DD') : null;
		buildData.contact_date_used_and_new = data.contact_date_used_and_new ? moment(data.contact_date_used_and_new).format('YYYY-MM-DD') : null;
		buildData.contact_date_basket = data.contact_date_basket ? moment(data.contact_date_basket).format('YYYY-MM-DD') : null;
		buildData.contact_date_noon = data.contact_date_noon ? moment(data.contact_date_noon).format('YYYY-MM-DD') : null;
		buildData.contact_date_open_market = data.contact_date_open_market ? moment(data.contact_date_open_market).format('YYYY-MM-DD') : null;
		buildData.inquired_owners_number_of_cases = data.inquired_owners_number_of_cases || null;
		buildData.inquired_owners_date = data.inquired_owners_date ? moment(data.inquired_owners_date).format('YYYY-MM-DD') : null;
		buildData.blocked_number_of_cases = data.blocked_number_of_cases || null;
		buildData.blocked_date = data.blocked_date ? moment(data.blocked_date).format('YYYY-MM-DD') : null;
		buildData.blocked_letter_number = data.blocked_letter_number || null;
		buildData.violation_unproven_number_of_sites = data.violation_unproven_number_of_sites || null;
		buildData.duplicate_number_of_cases = data.duplicate_number_of_cases || null;

		return buildData;
	},
	async buildUpdateObject(){
		try{
			const buildData = {};

			buildData.number_of_cases = No_of_Cases.text || null;
			buildData.request_number = request_number.text || null;
			buildData.request_date = request_date.selectedDate ? moment(request_date.selectedDate).format('YYYY-MM-DD') : null;
			buildData.basket_cases = basket_cases.text || null;
			buildData.amazon_cases = amazon_cases.text || null;
			buildData.on_sale_cases = on_sale_cases.text || null;
			buildData.open_market_cases = open_market_cases.text || null;
			buildData.used_and_new_cases = used_and_new_cases.text || null;
			buildData.noon_cases = noon_cases.text || null;
			buildData.site_cases = site_cases.text || null;
			buildData.contact_date_amazon = contact_date_amazon.selectedDate ? moment(contact_date_amazon.selectedDate).format('YYYY-MM-DD') : null;
			buildData.contact_date_on_sale = contact_date_on_sale.selectedDate ? moment(contact_date_on_sale.selectedDate).format('YYYY-MM-DD') : null;
			buildData.contact_date_used_and_new = contact_date_used_and_new.selectedDate ? moment(contact_date_used_and_new.selectedDate).format('YYYY-MM-DD') : null;
			buildData.contact_date_basket = contact_date_basket.selectedDate ? moment(contact_date_basket.selectedDate).format('YYYY-MM-DD') : null;
			buildData.contact_date_noon = contact_date_noon.selectedDate ? moment(contact_date_noon.selectedDate).format('YYYY-MM-DD') : null;
			buildData.contact_date_open_market = contact_date_open_market.selectedDate ? moment(contact_date_open_market.selectedDate).format('YYYY-MM-DD') : null;
			buildData.inquired_owners_number_of_cases = inquired_owner_number_of_cases.text || null;
			buildData.inquired_owners_date = inquired_owners_date.selectedDate ? moment(inquired_owners_date.selectedDate).format('YYYY-MM-DD') : null;
			buildData.blocked_number_of_cases = blocked_number_of_cases.text || null;
			buildData.blocked_date = blocked_date.selectedDate ? moment(blocked_date.selectedDate).format('YYYY-MM-DD') : null;
			buildData.blocked_letter_number = blocked_letter_number.text || null;
			buildData.violation_unproven_number_of_sites = violation_unproven_number.text || null;
			buildData.duplicate_number_of_cases = Dupliacte_number_of_cases.text || null;
			return buildData;
		}
		catch(ex)
		{
			showAlert("Error in Updating the data","error");
		}
	},
	async insertData(data) {
		// Validate the data before insertion
		const errors = this.validateData(data);
		if (errors.length > 0) {
			return showAlert(`Validation Errors: ${errors.join(", ")}`, 'error');
		}

		try {
			this.insertBuildData = this.buildObject(data);
			await InsertQueryContentRemoval.run();
			showAlert('Data inserted successfully!', 'success');
			await SelectQueryContentRemoval.run();
			closeModal(Insert_Modal.name);
			// Reset insertBuildData
			this.insertBuildData = {
				number_of_cases: "",
				request_number: "",
				request_date: "",
				basket_cases: "",
				amazon_cases: "",
				on_sale_cases: "",
				open_market_cases: "",
				used_and_new_cases: "",
				noon_cases: "",
				site_cases: "",
				contact_date_amazon: "",
				contact_date_on_sale: "",
				contact_date_used_and_new: "",
				contact_date_basket: "",
				contact_date_noon: "",
				contact_date_open_market: "",
				inquired_owners_number_of_cases: "",
				inquired_owners_date: "",
				blocked_number_of_cases: "",
				blocked_date: "",
				blocked_letter_number: "",
				violation_unproven_number_of_sites: "",
				duplicate_number_of_cases: ""
			};
		} catch (error) {
			showAlert('Error inserting data: ' + error.message, 'error');
		}
	},

	async updateData() {
		this.updateBuildData = await this.buildUpdateObject();
		console.log("	this.updateBuildData",	this.updateBuildData);
		const errors = this.validateData(this.updateBuildData);
		if (errors.length > 0) {
			return showAlert(`Validation Errors: ${errors.join(", ")}`, 'error');
		}

		try {
			await UpdateQueryContentRemoval.run();
			showAlert('Data updated successfully!', 'success');
			await SelectQueryContentRemoval.run();
			closeModal(UpdateQueryContentRemoval.name);
			closeModal(UpdateContentRemovalConferm.name);
		} catch (error) {
			showAlert('Error updating data: ' + error.message, 'error');
		}
	},
	// Function to handle mutilple deletion
	async deleteMutipleData(idPass) {
		if (!idPass) {
			return showAlert('id is required for deletion', 'error');
		}

		try {
			idPass = idPass.join(", ");
			await DeleteMutipleContentRemoval.run({id:idPass});
			showAlert('Data deleted successfully!', 'success');
			closeModal(DeleteMutipleConfirmation.name);
			await SelectQueryContentRemoval.run();
		} catch (error) {
			showAlert('Error deleting data: ' + error.message, 'error');
		}
	},

	async deleteData(id) {
		if (!id) {
			return showAlert('ID is required for deletion', 'error');
		}

		try {
			await DeleteQuery.run({ id });
			showAlert('Data deleted successfully!', 'success');
			await SelectQueryContentRemoval.run();
			closeModal("")
		} catch (error) {
			showAlert('Error deleting data: ' + error.message, 'error');
		}
	},
	buildContentRemoval: function(rows){
		const intFields = [
			'id',
			'number_of_cases',
			'basket_cases',
			'amazon_cases',
			'on_sale_cases',
			'open_market_cases',
			'used_and_new_cases',
			'noon_cases',
			'site_cases',
			'inquired_owners_number_of_cases',
			'blocked_number_of_cases',
			'violation_unproven_number_of_sites',
			'duplicate_number_of_cases'
		];

		const dateFields = [
			'request_date',
			'contact_date_amazon',
			'contact_date_on_sale',
			'contact_date_used_and_new',
			'contact_date_basket',
			'contact_date_noon',
			'contact_date_open_market',
			'inquired_owners_date',
			'blocked_date'
		];

		// Iterate through each object in the array
		rows.forEach(row => {
			// Iterate through each field in the object
			Object.keys(row).forEach(key => {
				if (dateFields.includes(key)) {
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
				else if(intFields.includes(key))
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
	async CorrectFileUploaded() {
		try {
			// Expected headers for Content Removal
			const expectedHeaders = [
				'id',
				'number_of_cases',
				'request_number',
				'request_date',
				'basket_cases',
				'amazon_cases',
				'on_sale_cases',
				'open_market_cases',
				'used_and_new_cases',
				'noon_cases',
				'site_cases',
				'contact_date_amazon',
				'contact_date_on_sale',
				'contact_date_used_and_new',
				'contact_date_basket',
				'contact_date_noon',
				'contact_date_open_market',
				'inquired_owners_number_of_cases',
				'inquired_owners_date',
				'blocked_number_of_cases',
				'blocked_date',
				'blocked_letter_number',
				'violation_unproven_number_of_sites',
				'duplicate_number_of_cases'
			];

			// Get the uploaded file data from FilePicker
			const uploadedFile = FilePicker1.files[0]; // Replace FilePicker1 with your actual FilePicker widget name

			if (!uploadedFile) {
				showAlert("No file uploaded!", "error");
				return false;
			}

			try {
				console.log("uploadedFile", uploadedFile.data);
				const fileHeaders = Object.keys(uploadedFile.data[0]); // Retrieves the header keys from the first object
				console.log("fileHeaders", fileHeaders);

				// Check if file headers match the expected headers
				const isHeadersValid = expectedHeaders.every(header => fileHeaders.includes(header));

				if (isHeadersValid) {
					showAlert("Headers are valid!", "success");
				} else {
					showAlert("Headers do not match! Please Upload Correct Content Removal File", "error");
				}

				return isHeadersValid;
			} catch (error) {
				showAlert("Error reading the file!", "error");
				return false;
			}
		} catch (ex) {
			showAlert("Error in File Uploading", "error");
		}
	},

	async fileUploads() {
		try {
			if (FilePicker1.files && FilePicker1.files.length === 0) {
				showAlert("Please Upload the Insert File", "warning");
			} else {
				if (await this.CorrectFileUploaded()) {
					// Call the upload function specifically for content removal
					await UploadFileFunction.uploadFile('Content Removal'); // Ensure the correct function name is used
					showAlert("Data inserted successfully!", 'success');
					resetWidget(FilePicker1, true);
					await SelectQueryContentRemoval.run(); // Ensure this runs the correct query for content removal
				}
			}
		} catch (ex) {
			showAlert("Error in File Upload", "Error");
		}
	},
	async contentRemoval(action) {
		let data = insert_form.formData;
		switch (action) {
			case 'insert':
				await this.insertData(data)
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
