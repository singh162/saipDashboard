export default {
	tableComplaintCase:[],
	async tableData () {
		let data = await Table2ComplaintsUrlData.run();
		this.tableComplaintCase = data;
	}
}