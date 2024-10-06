export default {
	primarykey: '',
	insertRowData: [],
	insertTable: '',
	getBuildObject: async function(fileType,insertObject){
		let buildObject;
		console.log("BuildfileType",fileType);
		switch (fileType) {
			case 'Compaints':
				buildObject = await BuildObjectFileUpload.buildCompaints(insertObject);
				break;
			case 'Compaints Tat':
				buildObject = await BuildObjectFileUpload.buildComplaintTat(insertObject);
				break;
			case 'Site Status':
				buildObject = await BuildObjectFileUpload.buildSiteStatus(insertObject);
				break;
			default:
				throw new Error('Unknown option selected');
		}
		return buildObject;
	},
	async uploadFile (uploadFileType) {
		try{
			const fileObject = await FilePicker1.files;
			let jsonData = fileObject[0].data;
			let cleanedData = jsonData;

			// Check for duplicate entry_ids in the JSON data itself
			let entryIdCount = {};
			for (let i = 0; i < cleanedData.length; i++) {
				let primaryKey = this.getPrimaryKey(cleanedData[i],uploadFileType);

				if (entryIdCount[primaryKey]) {
					entryIdCount[primaryKey]++;
				} else {
					entryIdCount[primaryKey] = 1;
				}
			}
			// If any primary key is duplicated in the JSON data, show a warning and exit
			let duplicateIds = Object.keys(entryIdCount).filter(id => entryIdCount[id] > 1);
			if (duplicateIds.length > 0) {
				showAlert(`Duplicate record(s) found in uploaded file: ${duplicateIds.join(", ")}. Insertion aborted.`, 'warning');
				return '';
			};

			// Proceed with inserting data into the appropriate table
			await this.filterData(cleanedData,uploadFileType);
			return;
		}
		catch(ex){
			showAlert(ex.message,"err")
			throw ex;
		}
	},
	getPrimaryKey: function (rowData,uploadFileType) {
		// Determine the primary key field based on the dropdown selection
		const dropdownLabel = uploadFileType;
		let primaryKeyField = "";
		switch (dropdownLabel) {
			case "Compaints":
				primaryKeyField = "report_entry_data";
				break;
			case "Compaints Tat":
			case "Site Status":
				primaryKeyField = "id";
				break;
			default:
				return null;
		}
		return rowData[primaryKeyField];
	},

	filterData: async function (cleanedData,uploadFileType) {
		try{
			const dropdownLabel = uploadFileType;
			let tableName = "";
			let primaryKeyField = "";
			let where ='';
			// Determine the table name and primary key field based on dropdown label
			switch (dropdownLabel) {
				case "Compaints":
					tableName = "complaints";
					primaryKeyField = "report_entry_data";
					break;
				case "Compaints Tat":
					tableName = "complaints_tat";
					primaryKeyField = "id";
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
			let primaryKeyList = '';
			for (let i = 0; i < cleanedData.length; i++) {
				primaryKeyList += this.getPrimaryKey(cleanedData[i]);
				if (i < cleanedData.length - 1) {
					primaryKeyList += ', ';
				}
			}
			where = `${primaryKeyField} IN (${primaryKeyList})`;
			// Execute the query and fetch results
			let existingRecords;
			if (dropdownLabel !== 'Report') {
				existingRecords = await CheckEntryInDatabase.run({
					table: tableName,
					primaryKeyField: primaryKeyField,
					where: where
				});
			}
			console.log("existingRecords",existingRecords)

			// Adjust Database.run to your database query method

			// Create a Set for quick lookup of existing records
			// Create a Set for fast lookup of existing records
			let existingRecordSet = new Set(existingRecords.map(record => 
																													record[primaryKeyField]
																												 ));

			// Process cleanedData
			let rowPushData = [];
			let exitsRecords = [];

			for (let i = 0; i < cleanedData.length; i++) {
				let primaryKeyValue = this.getPrimaryKey(cleanedData[i]);
				if (!existingRecordSet.has(primaryKeyValue)) {
					rowPushData.push(cleanedData[i]);
				} else {
					exitsRecords.push(cleanedData[i]);
				}
			}

			this.insertRowData = rowPushData;
			this.insertTable = tableName;
			this.primarykey = primaryKeyField;
			console.log("insertRowData",this.insertRowData );
			console.log("insertTable",this.insertTable );
			await this.insertAllRecord(uploadFileType);
			return;
		}
		catch(ex){
			throw ex;
		}
	},
	insertAllRecord: async function (uploadFileType) {
		try {
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

			let buildObjectArray =  await this.getBuildObject(uploadFileType,this.insertRowData);


			const { columns, values } = formatDataForSQL(buildObjectArray);

			// Construct the SQL query for bulk insert
			console.log("values",values)
			const insertQuery = `
                INSERT INTO \`${this.insertTable}\` (${columns})
                VALUES ${values};
            `;
			console.log(JSON.stringify(insertQuery));

			// Run the insert query
			await InsertFileRecordsIntoTable.run({ query: insertQuery });
			this.insertRowData = [];
			return ;
		} catch (error) {
			console.error("Error inserting data:", error);
			this.insertRowData = [];
			showAlert("Failed to insert data.", 'error');
			throw error;
		}
	},
}