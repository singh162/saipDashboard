export default {
	insertRowData: [],
	exitsRecord: [],
	insertTable: '',
	primarykey: '',
	getBuildObject: async function(){
		switch (Select1.selectedOptionLabel) {
			case 'Violation Main':
				buildObject = await buildObject.buildMainObject(Table1.tableData);
				break;
			case 'Violation Tech':
				buildObject = await buildObject.buildTecObject(Table1.tableData);
				break;
			case 'Compaints':
				buildObject = await buildObject.buildCompaints(Table1.tableData);
				break;
			case 'Compaints Tat':
				buildObject = await buildObject.buildComplaintTat(Table1.tableData);
				break;
			case 'Content Removal':
				buildObject = await buildObject.buildContentRemoval(Table1.tableData);
				break;
			case 'Site Status':
				buildObject = await buildObject.buildSiteStatus(Table1.tableData);
				break;
			case 'Report':
				buildObject = await buildObject.buildReport(Table1.tableData);
				break;
			default:
				throw new Error('Unknown option selected');
		}
	},
	insertAllRecord: async function () {
		try {
			console.log(Table1.tableData);

			if(!Select1.selectedOptionLabel){
				showAlert("Please Select the type of upload folder","warning");
				return;
			}
			// Function to convert table data to SQL values format
			const formatDataForSQL = (data) => {
				if (data.length === 0) return { columns: '', values: '' };

				// Extract the field names from the first record
				const fieldNames = Object.keys(data[0]);

				// Create SQL column names
				const columns = fieldNames.map(field => `\`${field}\``).join(',');

				// Create SQL values rows
				const values = data.map(row => {
					return `(${fieldNames.map(field => row[field] === null ? 'NULL' : `'${row[field]}'`).join(',')})`;
				}).join(',');

				return { columns, values };
			};

			buildObject =  await this.getBuildObject(Table1.tableData);


			const { columns, values } = formatDataForSQL(Table1.tableData);

			// Construct the SQL query for bulk insert
			console.log("values",values)
			const insertQuery = `
                INSERT INTO \`${this.insertTable}\` (${columns})
                VALUES ${values};
            `;
			console.log(JSON.stringify(insertQuery));

			// Run the insert query
			await InsertAllRecordsIntoTable.run({ query: insertQuery });
			showAlert("Data inserted successfully!", 'success');
			closeModal(Modal1.name);
			this.insertRowData = [];
			Table1.setData([]);
		} catch (error) {
			console.error("Error inserting data:", error);
			closeModal(Modal1.name);
			this.insertRowData = [];
			Table1.setData([]);
			showAlert("Failed to insert data.", 'error');
		}
	},

	handleFileUpload: async function () {
		try{
			// Fetch data from FilePicker
			if(!Select1.selectedOptionLabel){
				showAlert("Please Select the type of upload folder","warning");
				resetWidget("FilePicker1", true);
				return;
			}
			const fileObject = await FilePicker1.files;
			if (fileObject && fileObject.length > 0) {
				let jsonData = fileObject[0].data;
				console.log("JSON", jsonData);
				jsonData = await buildObject.buildMainPercentage(jsonData)
				// remove empty key from object
				let cleanedData = jsonData;

				// Check for duplicate entry_ids in the JSON data itself
				let entryIdCount = {};
				for (let i = 0; i < cleanedData.length; i++) {
					let primaryKey = this.getPrimaryKey(cleanedData[i]);

					if (entryIdCount[primaryKey]) {
						entryIdCount[primaryKey]++;
					} else {
						entryIdCount[primaryKey] = 1;
					}
				}
				// If any primary key is duplicated in the JSON data, show a warning and exit
				let duplicateIds = Object.keys(entryIdCount).filter(id => entryIdCount[id] > 1);
				if (Select1.selectedOptionLabel !== 'Report' && duplicateIds.length > 0) {
					showAlert(`Duplicate record(s) found in uploaded file: ${duplicateIds.join(", ")}. Insertion aborted.`, 'warning');
					return;
				}

				// Proceed with inserting data into the appropriate table
				await this.filterData(cleanedData);

			} else {
				showAlert("No file is selected", 'warning');
			}
		}
		catch(ex){
			showAlert(ex.message,"err")
			this.insertRowData = [];
			// resetWidget("FilePicker1", true);
		}
	},

	getPrimaryKey: function (rowData) {
		// Determine the primary key field based on the dropdown selection
		const dropdownLabel = Select1.selectedOptionLabel;
		let primaryKeyField = "";
		switch (dropdownLabel) {
			case "Violation Main":
			case "Violation Tech":
				primaryKeyField = "entry_id";
				break;
			case "Compaints":
				primaryKeyField = "report_entry_data";
				break;
			case "Compaints Tat":
			case "Content Removal":
			case "Site Status":
				primaryKeyField = "id";
				break;
			case "Report":
				primaryKeyField = "report_id";
				break;
			default:
				return null;
		}
		return rowData[primaryKeyField];
	},

	filterData: async function (cleanedData) {
		const dropdownLabel = Select1.selectedOptionLabel;
		let tableName = "";
		let primaryKeyField = "";
		let where ='';
		// Determine the table name and primary key field based on dropdown label
		switch (dropdownLabel) {
			case "Violation Main":
				tableName = "violations_sites_main";
				primaryKeyField = "entry_id";
				where = ``
				break;
			case "Violation Tech":
				tableName = "violations_sites_tech";
				primaryKeyField = "entry_id";
				break;
			case "Compaints":
				tableName = "complaints";
				primaryKeyField = "report_entry_data";
				break;
			case "Compaints Tat":
				tableName = "complaints_tat";
				primaryKeyField = "id";
				break;
			case "Content Removal":
				tableName = "content_removal";
				primaryKeyField = "id";
				break;
			case "Report":
				tableName = "reports";
				primaryKeyField = "report_id";
				break;
			case "Site Status":
				tableName = "site_status";
				primaryKeyField = "id";
				break;
			default:
				showAlert("Invalid selection", 'error');
				return;
		}

		// Loop through the cleaned data and insert into the appropriate table

		if (dropdownLabel !== 'Report') {
			let primaryKeyList = '';
			for (let i = 0; i < cleanedData.length; i++) {
				primaryKeyList += this.getPrimaryKey(cleanedData[i]);
				if (i < cleanedData.length - 1) {
					primaryKeyList += ', ';
				}
			}
			where = `${primaryKeyField} IN (${primaryKeyList})`;
		} else {
			let conditions = '';
			for (let i = 0; i < cleanedData.length; i++) {
				if (cleanedData[i] && cleanedData[i].report_type) {
					switch (cleanedData[i].report_type) {
						case 'Legal Status Report':
							cleanedData[i].report_type = 'Opinion Report (Legal)';
							break;
						case 'Investigation Report':
							cleanedData[i].report_type = 'Opinion Report (Tech)';
							break;
						case 'Weekly Report':
							cleanedData[i].report_type = 'Weekly Work Log Report';
							break;
							// Add more case mappings here as needed
						default:
							// Keep the original value if no match is found
							cleanedData[i].report_type=cleanedData[i].report_type;
							break;
					}
				}
				conditions += `(report_type = '${cleanedData[i].report_type}' AND report_number = ${cleanedData[i].report_number})`;
				if (i < cleanedData.length - 1) {
					conditions += ' OR ';
				}
			}
			where = `(${conditions})`;
		}
		console.log(where);
		// Execute the query and fetch results
		let existingRecords;
		if (dropdownLabel !== 'Report') {
			existingRecords = await CheckEntryInDatabase.run({
				table: tableName,
				primaryKeyField: primaryKeyField,
				where: where
			});
		}
		else
		{
			existingRecords = await CheckEntryInDatabase.run({
				table: tableName,
				primaryKeyField: 'report_type,report_number',
				where: where
			});
		}
		console.log("existingRecords",existingRecords)

		// Adjust Database.run to your database query method

		// Create a Set for quick lookup of existing records
		// Create a Set for fast lookup of existing records
		let existingRecordSet = new Set(existingRecords.map(record => 
																												dropdownLabel === 'Report' 
																												? `${record.report_type}_${record.report_number}`
																												: record[primaryKeyField]
																											 ));

		// Process cleanedData
		let rowPushData = [];
		let exitsRecords = [];

		for (let i = 0; i < cleanedData.length; i++) {
			let primaryKeyValue = dropdownLabel === 'Report' 
			? `${cleanedData[i].report_type}_${cleanedData[i].report_number}`
			: this.getPrimaryKey(cleanedData[i]);

			if (!existingRecordSet.has(primaryKeyValue)) {
				rowPushData.push(cleanedData[i]);
			} else {
				exitsRecords.push(cleanedData[i]);
			}
		}
		if(dropdownLabel === 'Report' ){
			const customOrder = [
				'Scan Report (List)',
				'Scan Report (Data)',
				'Scan Report (Evidence)',
				'Opinion Report (Tech)',
				'Opinion Report (Legal)',
				'Opinion Summary',
				'Analytics Report',
				'Weekly Work Log Report'
			];

			// Create a mapping from report_type to its index in the custom order
			// Create a mapping from report_type to its index in the custom order
			const orderMap = customOrder.reduce((map, type, index) => {
				map[type] = index;
				return map;
			}, {});
			console.log("orderMap",orderMap);
			// Sort rowPushData based on the custom order
			rowPushData.sort((a, b) => {
				const indexA = orderMap[a.report_type] !== undefined ? orderMap[a.report_type] : Infinity;
				const indexB = orderMap[b.report_type] !== undefined ? orderMap[b.report_type] : Infinity;

				return indexA - indexB;
			});
		}
		this.exitsRecord = exitsRecords;
		console.log(rowPushData, "exitsRecords", exitsRecords);
		this.insertRowData = rowPushData;
		this.insertTable = tableName;
		this.primarykey = primaryKeyField;
	},
};
