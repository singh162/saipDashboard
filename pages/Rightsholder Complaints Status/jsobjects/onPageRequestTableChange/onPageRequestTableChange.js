export default {
	async requestTableChanges () {
		//	write code here
		if (Tabs1.selectedTab === 'Pending Complaints') {
			buildTableData.setQueryConditions('Pending Complaints', Table1, Table2);
			await countTable1RequestData.run();
			let data = await Table1ComplaintsUrlData.run();
			console.log("data[0]",data[0]);
			Object.assign(Table1.selectedRow, data[0]);
		} else if (Tabs1.selectedTab === 'Approved Complaints') {
			buildTableData.setQueryConditions('Approved Complaints', Table1Copy, Table2Copy);
			await countTable1RequestData.run();
			let data = await Table1ComplaintsUrlData.run();
			Object.assign(Table1Copy.selectedRow, data[0]);
		} else if (Tabs1.selectedTab === 'Rejected Complaints') {
			buildTableData.setQueryConditions('Rejected Complaints', Table1Copy1, Table2Copy1);
			await countTable1RequestData.run();
			let data = await Table1ComplaintsUrlData.run();
			Object.assign(Table1Copy1.selectedRow, data[0]);

		} else if (Tabs1.selectedTab === 'Submitted For Blocking Complaints') {
			buildTableData.setQueryConditions('Submitted For Blocking Complaints', Table1Copy2, Table2Copy2);
			await countTable1RequestData.run();
			let data = await Table1ComplaintsUrlData.run();
			Object.assign(Table1Copy2.selectedRow, data[0]);
		} else if (Tabs1.selectedTab === 'Blocked Complaints') {
			buildTableData.setQueryConditions('Blocked Complaints', Table1Copy3, Table2Copy3);
			await countTable1RequestData.run();
			let data = await Table1ComplaintsUrlData.run();
			Object.assign(Table1Copy3.selectedRow, data[0]);
		}

		await buildTableData.tableData();
	}
}