export default {
	async downloadXlsx() {
		try {
			// Initialize a new workbook
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet("Case Details");

			// Fetch the data
			let data = await DownloadReportQuery.run();
			const excelData = data.map(item => [
				item.RequestId,
				item.ReasonForApproveAndReject,
				item.HolderName,
				item.CaseId,
				item.CategoryType,
				item.Description,
				item.OrginalWebsite,
				item.InfringingUrl,
				item.Status,
				item.StatusUpdatedBy,
				item.ReportedDate,
				item.EvidenceBySaip,
				item.EvidenceByRightHolder
			]);

			const fileData = {
				data: excelData,
				fileName: 'data.xlsx',
				fileType: 'xlsx'
			};
			download(fileData.data,fileData.fileName,fileData.fileType);
		} catch (error) {
			console.error(`Error generating XLSX: ${error.message}`);
			showAlert(`Error generating XLSX: ${error.message}`, "error");
		}
	}
}