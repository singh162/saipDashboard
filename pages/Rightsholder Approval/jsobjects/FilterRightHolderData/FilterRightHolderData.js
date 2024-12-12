export default {
	whereFilter: "",
	filterArray: [
		{ name: "", code: "" }
	],
	async filtersObject() {
		try {
			let field = Select4Copy.selectedOptionValue;
			let condition = Select4CopyCopy.selectedOptionLabel;
			let value = Input16Copy.text;


			// Generate the filter condition
			let where = await this.applyCondition(field, condition, value);
			console.log("where", where);
			this.whereFilter = ` and ${where}`;

			// Fetch data with the updated filter

			await countRightHolder.run();
			await RightHolderInfo.run();
			// Reset widgets and close modal
			closeModal(Modal15.name);
		} catch (error) {
			console.error("Error in filtersObject:", error);
			showAlert("An error occurred while applying filters. Please try again.", "error");
		}
	},

	async clearFilter() {
		try {
			this.whereFilter = '';

			// Fetch data without filters
			await countRightHolder.run();
			await RightHolderInfo.run();
			// Reset widgets
			resetWidget("Select4Copy", true);
			resetWidget("Select4CopyCopy", true);
			resetWidget("Input16Copy", true);
		} catch (error) {
			console.error("Error in clearFilter:", error);
			showAlert("An error occurred while clearing filters. Please try again.", "error");
		}
	},

	async applyCondition(field, condition, value) {
		try {
			let whereClause;
			switch (condition) {
				case 'Contains':
					whereClause = `rightHolderProfile.${field} LIKE '%${value}%'`;
					break;
				case 'Does Not Contain':
					whereClause = `rightHolderProfile.${field} NOT LIKE '%${value}%'`;
					break;
				case 'Starts With':
					whereClause = `rightHolderProfile.${field} LIKE '${value}%'`;
					break;
				case 'Ends With':
					whereClause = `rightHolderProfile.${field} LIKE '%${value}'`;
					break;
				case 'Is Exactly':
					whereClause = `rightHolderProfile.${field} = '${value}'`;
					break;
				case 'Empty':
					whereClause = `rightHolderProfile.${field} = ''`;
					break;
				case 'Not Empty':
					whereClause = `rightHolderProfile.${field} != ''`;
					break;
				case 'Equals':
					if(field === "inserted_at"){
						whereClause = `rightHolderProfile.${field} = '${DatePicker1.formattedDate}'`;
					}
					else{
						whereClause = `rightHolderProfile.${field} = '${value}'`;
					}
					break;
				case 'Greater Than':
					whereClause = `rightHolderProfile.${field} > '${DatePicker1.formattedDate}'`;
					break;
				case 'Less Than':
					whereClause = `rightHolderProfile.${field} < '${DatePicker1.formattedDate}'`;
					break;
				case 'Between':
					whereClause = `rightHolderProfile.${field} BETWEEN       '${DatePicker1.formattedDate}' AND '${DatePicker1Copy.formattedDate}'`;
					break;
				case 'Greater Than or Equal':
					whereClause = `rightHolderProfile.${field} >= '${DatePicker1.formattedDate}'`;
					break;
				case 'Less Than or Equal':
					whereClause = `rightHolderProfile.${field} <= '${DatePicker1.formattedDate}'`;
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
