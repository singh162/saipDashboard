export default {
	async downloadXlsx(){
		let buffer = await DownloadExcel.run();
		if (buffer) {
			download(buffer, "RightHoldersProfile.xlsx");
		} else {
			showAlert("Failed to download the Excel file", "error");
		}
	}
}