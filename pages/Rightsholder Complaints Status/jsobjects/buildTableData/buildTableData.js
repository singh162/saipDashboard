export default {
	status: 'Under Review',
	tableComplaintCase: [],
	emailHolderName:handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table1.selectedRow.HolderName,
	rightHolderEmail : '',

	table1QueryWhere:`AND rh.username LIKE '%${Table1.searchText || ""}%'
	GROUP BY 
	cf.complaint_request_id
	ORDER BY 
	 inserted_at ${Table1.sortOrder.order || "ASC"}
LIMIT 
${Table1.pageSize}
OFFSET 
${(Table1.pageNo - 1) * Table1.pageSize}`,

	table2QueryWhere: `complaints_form.complaint_request_id = '${Table1.selectedRow.complaint_request_id}'
	ORDER BY ${Table2.sortOrder.column || 'complaints_form.inserted_at'} ${Table2.sortOrder.order || "ASC"}
LIMIT ${Table2.pageSize}
OFFSET ${(Table2.pageNo - 1) * Table2.pageSize}`,

	tableRequestComplaints: [],

	// Helper function to set query conditions based on the selected tab and Appsmith widget tables
	setQueryConditions(tabName, table1Widget, table2Widget) {
		console.log("table1Widget","table1Widget",table1Widget, table2Widget);
		const selectedRow = table1Widget.selectedRow?.complaint_request_id || '';
		const searchTextReuest =  table1Widget.searchText || '';
		const searchTextComplaints = table2Widget.searchText || '';
		const sortOrderRequestColumn = table1Widget.sortOrder?.column || 'inserted_at';
		const sortOrderComplaintsColumn = table2Widget.sortOrder?.column || 'inserted_at';
		const sortOrderOrderRequest =  table1Widget.sortOrder?.order || 'ASC';
		const sortOrderOrderComplaints = table2Widget.sortOrder?.order || 'ASC';
		const complaintsPageSize = table2Widget.pageSize || 10;
		const requestPageSize = table1Widget.pageSize || 10;
		const requestPageNo = (table1Widget.pageNo - 1) || 0;
		const complinatsPageNo = (table2Widget.pageNo - 1) || 0;
		// Update table2QueryWhere dynamically based on table2 widget
		this.table2QueryWhere = `
complaints_form.complaint_request_id = '${selectedRow}'
${searchTextComplaints.length > 0 ? `AND ${searchTextComplaints}` : ""}
ORDER BY complaint_status.${sortOrderComplaintsColumn} ${sortOrderOrderComplaints}
LIMIT ${complaintsPageSize}
OFFSET ${complinatsPageNo * complaintsPageSize}
`;;

		// Update table1QueryWhere dynamically based on table1 widget
		this.table1QueryWhere = `AND rh.username LIKE '%${searchTextReuest}%'
GROUP BY cf.complaint_request_id
ORDER BY ${sortOrderRequestColumn} ${sortOrderOrderRequest} 
LIMIT ${requestPageSize}
OFFSET ${requestPageNo * requestPageSize}`;
	},

	// Fetch the correct table data based on the selected tab
	async tableData() {
		if (Tabs1.selectedTab === 'Pending Complaints') {
			this.setQueryConditions('Pending Complaints', Table1, Table2);
		} else if (Tabs1.selectedTab === 'Approved Complaints') {
			this.setQueryConditions('Approved Complaints', Table1Copy, Table2Copy);
		} else if (Tabs1.selectedTab === 'Rejected Complaints') {
			this.setQueryConditions('Rejected Complaints', Table1Copy1, Table2Copy1);
		} else if (Tabs1.selectedTab === 'Submitted For Blocking Complaints') {
			this.setQueryConditions('Submitted For Blocking Complaints', Table1Copy2, Table2Copy2);
		} else if (Tabs1.selectedTab === 'Blocked Complaints') {
			this.setQueryConditions('Blocked Complaints', Table1Copy3, Table2Copy3);
		}
		// Run the query for table 2 and update tableComplaintCase
		await count2Table2CaseData.run();
		let data = await Table2ComplaintsUrlData.run();
		this.tableComplaintCase = data;
		let rightHolderId = await handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table1.selectedRow.rightHolderUserId
		this.rightHolderEmail = await RightHolderInfoById.run({id:rightHolderId});
		return this.tableComplaintCase;
	},

	// Fetch the correct status and run table data functions
	async requestTableData() {
		try{
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
			if (Tabs1.selectedTab === 'Pending Complaints') {
				await this.setQueryConditions('Pending Complaints', Table1, Table2);
			} else if (Tabs1.selectedTab === 'Approved Complaints') {
				await this.setQueryConditions('Approved Complaints', Table1Copy, Table2Copy);
			} else if (Tabs1.selectedTab === 'Rejected Complaints') {
				console.log("asdasdasdad");
				await this.setQueryConditions('Rejected Complaints', Table1Copy1, Table2Copy1);
			} else if (Tabs1.selectedTab === 'Submitted For Blocking Complaints') {
				await this.setQueryConditions('Submitted For Blocking Complaints', Table1Copy2, Table2Copy2);
			} else if (Tabs1.selectedTab === 'Blocked Complaints') {
				await this.setQueryConditions('Blocked Complaints', Table1Copy3, Table2Copy3);
			}
			await complaintsViewFilters.filtersObject();
			await complaintsTable2Filters.filtersObject();
			// await this.tableData();
		}
		catch(ex)
		{
			console.log(ex);
		}
	},
};
