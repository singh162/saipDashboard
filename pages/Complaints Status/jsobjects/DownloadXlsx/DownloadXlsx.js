export default {
	async downloadXlsx() {
			try {
	
			// Fetch the data
			let data = await DownloadReportQuery.run();
			console.log("Fetched data:", JSON.stringify(data, null, 2)); // Log fetched data

			// Ensure the data is an array
			if (!Array.isArray(data) || data.length === 0) {
				throw new Error("No data available to generate XLSX file.");
			}

			// Add header row
			worksheet.addRow([
				"RequestId", 
				"ReasonForApproveAndReject", 
				"HolderName", 
				"CaseId", 
				"CategoryType", 
				"Description", 
				"OrginalWebsite", 
				"InfringingUrl", 
				"Status", 
				"StatusUpdatedBy", 
				"ReportedDate", 
				"EvidenceBySaip", 
				"EvidenceByRightHolder"
			]);

			// Iterate through the array of objects and add rows to the worksheet
			data.forEach(item => {
				if (typeof item !== 'object' || item === null) {
					console.warn('Invalid item encountered:', item);
					return;
				}
				worksheet.addRow([
					item.RequestId || '',
					item.ReasonForApproveAndReject || '',
					item.HolderName || '',
					item.CaseId || '',
					item.CategoryType || '',
					item.Description || '',
					item.OrginalWebsite || '',
					item.InfringingUrl || '',
					item.Status || '',
					item.StatusUpdatedBy || '',
					item.ReportedDate || '',
					item.EvidenceBySaip || '',  // Adjust according to your data
					item.EvidenceByRightHolder || '' // Adjust according to your data
				]);
			});

			let buffer;
			try {
				buffer = await workbook.xlsx.writeBuffer(); // Attempt to write the buffer
				console.log("Buffer created successfully.");
			} catch (bufferError) {
				console.error("Error writing the buffer:", bufferError);
				throw new Error("Failed to generate XLSX file.");
			}

			// Convert buffer to base64
			const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));

			// Constructing the download link for Appsmith
			const downloadUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64String}`;

			// Use Appsmith's download function to trigger the file download
			download(data, "Case_Details_with_Images.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

		} catch (error) {
			console.error(`Error generating XLSX: ${error.message}`);
			showAlert(`Error generating XLSX: ${error.message}`, "error");
		}
	}
}