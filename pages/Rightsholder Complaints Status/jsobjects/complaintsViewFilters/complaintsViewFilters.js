export default {
	whereFilter: "",
	async getFilterWiget(){
		if(Tabs1.selectedTab === "Pending Complaints"){
			return[Select4,Select4Copy,Input16,DatePicker1,DatePicker1Copy]
		}
		else 	if(Tabs1.selectedTab === "Approved Complaints"){
			return[Select4Copy1,Select4CopyCopy,Input16Copy,DatePicker1Copy1,DatePicker1CopyCopy]
		}
		else 	if(Tabs1.selectedTab === "Rejected Complaints"){
			return[Select4Copy2,Select4CopyCopy1,Input16Copy1,DatePicker1Copy2,DatePicker1CopyCopy1]
		}
		else 	if(Tabs1.selectedTab === "Submitted For Blocking Complaints"){
			return[Select4Copy3,Select4CopyCopy2,Input16Copy2,DatePicker1Copy3,DatePicker1CopyCopy2]
		}
		else 	if(Tabs1.selectedTab === "Blocked Complaints"){
			return[Select4Copy4,Select4CopyCopy3,Input16Copy3,DatePicker1Copy4,DatePicker1CopyCopy3]
		}
	},
	async filtersObject() {
		try {
			let returnValue = await this.getFilterWiget();
			console.log("")
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
			await countTable1RequestData.run();
			await Table1ComplaintsUrlData.run();

			if(Tabs1.selectedTab === "Pending Complaints"){
				closeModal(Modal15.name);
			}
			else 	if(Tabs1.selectedTab === "Approved Complaints"){
				closeModal(ApprovedFilterModal.name);
			}
			else 	if(Tabs1.selectedTab === "Rejected Complaints"){
				closeModal(RejectedFilterModal.name);
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
			await countTable1RequestData.run();
			await Table1ComplaintsUrlData.run();
			if(Tabs1.selectedTab === "Pending Complaints"){
				resetWidget("Select4", true);
				resetWidget("Select4Copy", true);
				resetWidget("Input16", true);
			}
			else 	if(Tabs1.selectedTab === "Approved Complaints"){
				resetWidget("Select4Copy1", true);
				resetWidget("Select4CopyCopy", true);
				resetWidget("Input16Copy", true);
			}
			else 	if(Tabs1.selectedTab === "Rejected Complaints"){
				resetWidget("Select4Copy2", true);
				resetWidget("Select4CopyCopy1", true);
				resetWidget("Input16Copy1", true);
			}
			else 	if(Tabs1.selectedTab === "Submitted For Blocking Complaints"){
				resetWidget("Select4Copy3", true);
				resetWidget("Select4CopyCopy2", true);
				resetWidget("Input16Copy2", true);
			}
			else 	if(Tabs1.selectedTab === "Blocked Complaints"){
				resetWidget("Select4Copy4", true);
				resetWidget("Select4CopyCopy3", true);
				resetWidget("Input16Copy3", true);
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
				tableName = "complaint_status";
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
