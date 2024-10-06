export default {
	url: "",
	// Function to convert Google Slides URL to Google Drive Download URL
	convertToDriveDownloadUrl(googleSlidesUrl) {
		if(!googleSlidesUrl) return "";
    // Extract the ID from the Google Slides URL
    const regex = /\/d\/(.*?)(\/|$)/;
    const match = googleSlidesUrl.match(regex);

    // Check if the URL is valid and the ID is found
    if (match && match[1]) {
        const documentId = match[1];
        // Construct the download URL
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${documentId}`;
        return downloadUrl;
    } else {
        // Return an error message if the URL is not valid
        return console.log("Invalid URL. Please check the link.");
    }
	},
	filterColumns(data) {
    return data.map(row => {
        return {
            report_id: row.report_id,
            report_number: row.report_number,
            report_type: row.report_type,
            insertion_date: row.insertion_date,
            sent_date: row.sent_date,
            document: row[CategorySliderLanguageFile.value],
						case_id_min: row.case_id_min,
						case_id_max: row.case_id_max
        };
    });
	},
	downloadDocuments(data) {
    const filteredData = this.filterColumns(data); // Assuming filterColumns is already defined and works correctly

    filteredData.forEach(row => {
        const downloadUrl = this.convertToDriveDownloadUrl(row.document);
        navigateTo(downloadUrl, {}, 'NEW_WINDOW'); // Opens each document in a new tab
    });
	}
}