export default {
	status: 'Under Review',
	tableComplaintCase: [],
	emailHolderName:handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table1.selectedRow.HolderName,
	rightHolderEmail : '',
	table1QueryWhere:`AND rh.username LIKE '%${Table1.searchText || ""}%'
	GROUP BY 
	cf.complaint_request_id
	ORDER BY 
	MAX(rh.username) ${Table1.sortOrder.order || "ASC"}
LIMIT 
${Table1.pageSize}
OFFSET 
${(Table1.pageNo - 1) * Table1.pageSize}`,

	table2QueryWhere: `complaints_form.complaint_request_id = '${Table1.selectedRow.complaint_request_id}'
	ORDER BY ${'complaints_form.inserted_at'} ${Table2.sortOrder.order || "ASC"}
LIMIT ${Table2.pageSize}
OFFSET ${(Table2.pageNo - 1) * Table2.pageSize}`,

	tableRequestComplaints: [],

	// Helper function to set query conditions based on the selected tab and Appsmith widget tables
	setQueryConditions(tabName, table1Widget, table2Widget) {
		const selectedRow = table1Widget.selectedRow?.complaint_request_id || '';
		const searchText = table1Widget.searchText || '';
		const sortOrderColumn = 'complaints_form.inserted_at';
		const sortOrderOrder = table2Widget.sortOrder?.order || 'ASC';
		const pageSize = table2Widget.pageSize || 10;
		const pageNo = (table2Widget.pageNo - 1) || 0;

		// Update table2QueryWhere dynamically based on table2 widget
		this.table2QueryWhere = `complaints_form.complaint_request_id = '${selectedRow}'
	ORDER BY ${sortOrderColumn} ${sortOrderOrder}
LIMIT ${pageSize}
OFFSET ${pageNo * pageSize}`;

		// Update table1QueryWhere dynamically based on table1 widget
		this.table1QueryWhere = `AND rh.username LIKE '%${searchText}%'
GROUP BY cf.complaint_request_id
ORDER BY MAX(rh.username) ${sortOrderOrder}
LIMIT ${pageSize}
OFFSET ${pageNo * pageSize}`;
	},

	// Fetch the correct table data based on the selected tab
	async tableData() {
		if (Tabs1.selectedTab === 'Pending Complaints') {
			this.setQueryConditions('Pending Complaints', Table1, Table2);
		} else if (Tabs1.selectedTab === 'Approved Complaints') {
			this.setQueryConditions('Approved Complaints', Table1Copy, Table2Copy);
		} else if (Tabs1.selectedTab === 'Rejected Complaints') {
			console.log("asdasdasdad");
			this.setQueryConditions('Rejected Complaints', Table1Copy1, Table2Copy1);
		} else if (Tabs1.selectedTab === 'Submitted For Blocking Complaints') {
			this.setQueryConditions('Submitted For Blocking Complaints', Table1Copy2, Table2Copy2);
		} else if (Tabs1.selectedTab === 'Blocked Complaints') {
			this.setQueryConditions('Blocked Complaints', Table1Copy3, Table2Copy3);
		}

		// Run the query for table 2 and update tableComplaintCase
		let data = await Table2ComplaintsUrlData.run();
		this.tableComplaintCase = data;
		let rightHolderId = await handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table1.selectedRow.rightHolderUserId
		this.rightHolderEmail = await RightHolderInfoById.run({id:rightHolderId});
		await imageParsing.imageRendering();
		return this.tableComplaintCase;
	},

	// Fetch the correct status and run table data functions
	async requestTableData() {
		if (Tabs1.selectedTab === 'Pending Complaints') {
			this.status = 'Under Review';
		} else if (Tabs1.selectedTab === 'Approved Complaints') {
			this.status = 'Approved';
		} else if (Tabs1.selectedTab === 'Rejected Complaints') {
			this.status = 'Rejected';
		} else if (Tabs1.selectedTab === 'Submitted For Blocking Complaints') {
			this.status = 'Submitted For Blocking';
		} else if (Tabs1.selectedTab === 'Blocked Complaints') {
			this.status = 'Blocked';
		}

		// Run the table queries
		await Table1ComplaintsUrlData.run();
		await this.tableData();
	},
};
