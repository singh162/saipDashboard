export default {
	whereFilter: "",
	filterArray: [
		{ name: "", code: "" }
	],
	async filtersObject() {
		try {
			let field = Select4CopyCopy1.selectedOptionValue;
			let condition = Select4CopyCopyCopy.selectedOptionLabel;
			let value = Input16CopyCopy.text;


			// Generate the filter condition
			let where = await this.applyCondition(field, condition, value);
			console.log("where", where);
			this.whereFilter = ` and ${where}`;

			// Fetch data with the updated filter

			await countTitles.run();
			await getTitlesServerFilters.run();
			// Reset widgets and close modal
			closeModal(Modal15Copy.name);
		} catch (error) {
			console.error("Error in filtersObject:", error);
			showAlert("An error occurred while applying filters. Please try again.", "error");
		}
	},

	async clearFilter() {
		try {
			this.whereFilter = '';
			console.log("test123");
			// Fetch data without filters
			await countTitles.run();
			await getTitlesServerFilters.run();
			// Reset widgets
			resetWidget("Select4CopyCopy1", true);
			resetWidget("Select4CopyCopyCopy", true);
			resetWidget("Input16CopyCopy", true);
		} catch (error) {
			console.error("Error in clearFilter:", error);
			showAlert("An error occurred while clearing filters. Please try again.", "error");
		}
	},

	async applyCondition(field, condition, value) {
		try {
			let whereClause;
			let tableName="complaints_title";
			if(field === "username" || field === "username"){
				tableName = "rightHolder";
			}
			switch (condition) {
				case 'Contains':
					whereClause = `${tableName}.${field} LIKE '%${value}%'`;
					break;
				case 'Does Not Contain':
					whereClause = `${tableName}.${field} NOT LIKE '%${value}%'`;
					break;
				case 'Starts With':
					whereClause = `${tableName}.${field} LIKE '${value}%'`;
					break;
				case 'Ends With':
					whereClause = `${tableName}.${field} LIKE '%${value}'`;
					break;
				case 'Is Exactly':
					whereClause = `${tableName}.${field} = '${value}'`;
					break;
				case 'Empty':
					whereClause = `${tableName}.${field} = ''`;
					break;
				case 'Not Empty':
					whereClause = `${tableName}.${field} != ''`;
					break;
				case 'Equals':
					if(field === "inserted_at"){
						whereClause = `${tableName}.${field} = '${DatePicker1Copy1.formattedDate}'`;
					}
					else{
						whereClause = `${tableName}.${field} = '${value}'`;
					}
					break;
				case 'Greater Than':
					whereClause = `${tableName}.${field} > '${	moment.utc(DatePicker1Copy1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				case 'Less Than':
					whereClause = `${tableName}.${field} < '${	moment.utc(DatePicker1Copy1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				case 'Between':
					whereClause = `${tableName}.${field} BETWEEN       '${	moment.utc(DatePicker1Copy1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}' AND '${	moment.utc(DatePicker1CopyCopy.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				case 'Greater Than or Equal':
					whereClause = `${tableName}.${field} >= '${	moment.utc(DatePicker1Copy1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				case 'Less Than or Equal':
					whereClause = `${tableName}.${field} <= '${	moment.utc(DatePicker1Copy1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				default:
					whereClause = ''; // Default (no filtering)
			}
			return whereClause;
		} catch (error) {
			console.error("Error in applyCondition:", error);
			throw new Error("An error occurred while building the filter condition.");
		}
	},
}
