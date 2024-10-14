export default {
	downloadStatus:"",
	async downloadXlsxFile() {
		try {				
			showAlert("Xlsx Report has being ","success");

			if(Tabs1.selectedTab === "Pending Complaints"){
				this.downloadStatus="Under Review"
			}
			else if(Tabs1.selectedTab === "Approved Complaints"){
				this.downloadStatus='Approved'
			}
			else if(Tabs1.selectedTab === "Rejected Complaints"){
				this.downloadStatus='Rejected'
			}
			else if(Tabs1.selectedTab === "Submitted for Blocking Complaints"){
				this.downloadStatus='Submitted for Blocking'
			}
			else if(Tabs1.selectedTab === "Blocked Complaints"){
				this.downloadStatus='Blocked'
			}
			let buffer = await DownloadExcel.run();
			if (buffer) {
				download(buffer, `${this.downloadStatus.replace(/\s+/g, '')}.xlsx`);
				showAlert("Xlsx Report Generated Successfully","success");
			} else {
				showAlert("Failed to download the Excel file", "error");
			}
		} catch (error) {
			console.error(`Error generating XLSX: ${error.message}`);
			showAlert(`Error generating XLSX: ${error.message}`, "error");
		}
	},
	async downloadAllXlsxFile() {
		try {
			showAlert("Xlsx Report has being ","success");
			let buffer = await DownloadAllExcel.run();
			if (buffer) {
				download(buffer, 'Complaints.xlsx');
				showAlert("Xlsx Report Generated Successfully","success");
			} else {
				showAlert("Failed to download the Excel file", "error");
			}
		} catch (error) {
			console.error(`Error generating XLSX: ${error.message}`);
			showAlert(`Error generating XLSX: ${error.message}`, "error");
		}
	}
}