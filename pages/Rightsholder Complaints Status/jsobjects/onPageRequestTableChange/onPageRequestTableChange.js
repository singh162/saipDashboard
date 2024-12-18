export default {
	async requestTableChanges () {
		//	write code here
		if (Tabs1.selectedTab === 'Pending Complaints') {
			buildTableData.setQueryConditions('Pending Complaints', Table1, Table2);
		} else if (Tabs1.selectedTab === 'Approved Complaints') {
			buildTableData.setQueryConditions('Approved Complaints', Table1Copy, Table2Copy);
		} else if (Tabs1.selectedTab === 'Rejected Complaints') {
			buildTableData.setQueryConditions('Rejected Complaints', Table1Copy1, Table2Copy1);
		} else if (Tabs1.selectedTab === 'Submitted For Blocking Complaints') {
			buildTableData.setQueryConditions('Submitted For Blocking Complaints', Table1Copy2, Table2Copy2);
		} else if (Tabs1.selectedTab === 'Blocked Complaints') {
			buildTableData.setQueryConditions('Blocked Complaints', Table1Copy3, Table2Copy3);
		}
		await countTable1RequestData.run();
		await Table1ComplaintsUrlData.run();
		await buildTableData.tableData();
	}
}