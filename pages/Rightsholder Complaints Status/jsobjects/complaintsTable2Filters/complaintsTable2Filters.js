export default {
	whereFilter: "",
	async getFilterWiget(){
		if(Tabs1.selectedTab === "Pending Complaints"){
			return[Select4Copy5,Select4CopyCopy4,Input16Copy4,DatePicker1Copy5,DatePicker1CopyCopy4]
		}
		else 	if(Tabs1.selectedTab === "Approved Complaints"){
			return[Select4Copy5Copy,Select4CopyCopy4Copy,Input16Copy4Copy,DatePicker1Copy5Copy,DatePicker1CopyCopy4Copy]
		}
		else 	if(Tabs1.selectedTab === "Rejected Complaints"){
			return[Select4Copy5CopyCopy,Select4CopyCopy4CopyCopy,Input16Copy4CopyCopy,DatePicker1Copy5CopyCopy,DatePicker1CopyCopy4CopyCopy]
		}
		else 	if(Tabs1.selectedTab === "Submitted For Blocking Complaints"){
			return[Select4Copy5CopyCopyCopy,Select4CopyCopy4CopyCopyCopy,Input16Copy4CopyCopyCopy,DatePicker1Copy5CopyCopyCopy,DatePicker1CopyCopy4CopyCopyCopy]
		}
		else 	if(Tabs1.selectedTab === "Blocked Complaints"){
			return[Select4Copy5CopyCopyCopyCopy,Select4CopyCopy4CopyCopyCopyCopy,Input16Copy4CopyCopyCopyCopy,DatePicker1Copy5CopyCopyCopy ,DatePicker1CopyCopy4CopyCopyCopyCopy]
		}
	},
	async filtersObject() {
		try {
			let returnValue = await this.getFilterWiget();
			let where = await this.applyCondition(
				returnValue[0].selectedOptionValue,
				returnValue[1].selectedOptionLabel,
				returnValue[2].text,
				returnValue[3],
				returnValue[4]
			);
			console.log("where", where);
			if(where){
				this.whereFilter = ` and ${where}`;
			}
			else{
				this.whereFilter ="";
			}

			await buildTableData.tableData()

			if(Tabs1.selectedTab === "Pending Complaints"){
				closeModal(PendingComplaintFilterModal.name);
			}
			else 	if(Tabs1.selectedTab === "Approved Complaints"){
				closeModal(ApprovedComplaintFilterModal.name);
			}
			else 	if(Tabs1.selectedTab === "Rejected Complaints"){
				closeModal(Modal16.name);
			}
			else 	if(Tabs1.selectedTab === "Submitted For Blocking Complaints"){
				closeModal(SubmittedForBlockingFilterModa.name);
			}
			else 	if(Tabs1.selectedTab === "Blocked Complaints"){
				closeModal(BlockedFilterModal.name);
			}
			// resetWidget("Select4", true);
			// resetWidget("Select4Copy", true);
			// resetWidget("Input16", true);
		} catch (error) {
			console.error("Error in filtersObject:", error);
			showAlert("Failed to apply filters. Please try again.", "error");
		}
	},
	async clearFilter() {
		try {
			this.whereFilter = "";
			await buildTableData.tableData()
			if(Tabs1.selectedTab === "Pending Complaints"){
				resetWidget("Select4Copy5", true);
				resetWidget("Select4CopyCopy4", true);
				resetWidget("Input16Copy4", true);
			}
			else 	if(Tabs1.selectedTab === "Approved Complaints"){
				resetWidget("Select4Copy5Copy", true);
				resetWidget("Select4CopyCopy4Copy", true);
				resetWidget("Input16Copy4Copy", true);
			}
			else 	if(Tabs1.selectedTab === "Rejected Complaints"){
				resetWidget("Select4Copy5CopyCopy", true);
				resetWidget("Select4CopyCopy4CopyCopy", true);
				resetWidget("Input16Copy4CopyCopy", true);
			}
			else 	if(Tabs1.selectedTab === "Submitted For Blocking Complaints"){
				resetWidget("Select4Copy5CopyCopyCopy", true);
				resetWidget("Select4CopyCopy4CopyCopyCopy", true);
				resetWidget("Input16Copy4CopyCopyCopy", true);
			}
			else 	if(Tabs1.selectedTab === "Blocked Complaints"){
				resetWidget("Select4Copy5CopyCopyCopyCopy", true);
				resetWidget("Select4CopyCopy4CopyCopyCopyCopy", true);
				resetWidget("Input16Copy4CopyCopyCopyCopy", true);
			}

		} catch (error) {
			console.error("Error in clearFilter:", error);
			showAlert("Failed to clear filters. Please try again.", "error");
		}
	},
	async applyCondition(field, condition, value,date1,date2) {
		try {
			let whereClause;
			let tableName="complaints_form";
			if(field === "Status" ||  field === "StatusUpdatedBy"){
				tableName = "cs";
			}
			if(field === "username"){
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
						whereClause = `${tableName}.${field} = '${moment.utc(date1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					}
					else{
						whereClause = `${tableName}.${field} = '${value}'`;
					}
					break;
				case 'Greater Than':
					whereClause = `${tableName}.${field} > '${moment.utc(date1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				case 'Less Than':
					whereClause = `${tableName}.${field} < '${moment.utc(DatePicker1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				case 'Between':
					whereClause = `${tableName}.${field} BETWEEN       '${moment.utc(date1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}' AND '${moment.utc(date2.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				case 'Greater Than or Equal':
					whereClause = `${tableName}.${field} >= '${moment.utc(DatePicker1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				case 'Less Than or Equal':
					whereClause = `${tableName}.${field} <= '${moment.utc(DatePicker1.formattedDate).format('YYYY-MM-DD HH:mm:ss')}'`;
					break;
				default:
					whereClause = ''; // Default (no filtering)
			}
			return whereClause;
		} catch (error) {
			console.error("Error in applyCondition:", error);
			throw new Error("An error occurred while building the filter condition.",error);
		}
	},
};
