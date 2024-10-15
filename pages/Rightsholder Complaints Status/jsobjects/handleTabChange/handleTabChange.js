export default {
	handleTabChange() {
		const tabMapping = {
			'Pending Complaints': { table1: Table1, table2: Table2 },
			'Approved Complaints': { table1: Table1Copy, table2: Table2Copy },
			'Rejected Complaints': { table1: Table1Copy1, table2: Table2Copy1 },
			'Submitted For Blocking Complaints': { table1: Table1Copy2, table2: Table2Copy2 },
			'Blocked Complaints': { table1: Table1Copy3, table2: Table2Copy3 },
		};
		return tabMapping;
	}
}