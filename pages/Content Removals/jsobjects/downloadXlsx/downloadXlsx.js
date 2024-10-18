export default {
	async buildContentRemoval(data) {
		try {
			// Map through data and build the content removal structure
			const contentRemovalData = data.map(item => ({
				"id": item.id ,
				"Number of Cases": item.number_of_cases || "",
				"Request Number": item.request_number || "",
				"Request Date": item.request_date ? moment(item.request_date).format("YYYY-MM-DD") : "",
				"Basket Cases": item.basket_cases || "",
				"Amazon Cases": item.amazon_cases || "",
				"On Sale Cases": item.on_sale_cases || "",
				"Open Market Cases": item.open_market_cases || "",
				"Used and New Cases": item.used_and_new_cases || "",
				"Noon Cases": item.noon_cases || "",
				"Site Cases": item.site_cases || "",
				"Contact Date Amazon": item.contact_date_amazon ? moment(item.contact_date_amazon).format("YYYY-MM-DD") : "",
				"Contact Date On Sale": item.contact_date_on_sale ? moment(item.contact_date_on_sale).format("YYYY-MM-DD") : "",
				"Contact Date Used and New": item.contact_date_used_and_new ? moment(item.contact_date_used_and_new).format("YYYY-MM-DD") : "",
				"Contact Date Basket": item.contact_date_basket ? moment(item.contact_date_basket).format("YYYY-MM-DD") : "",
				"Contact Date Noon": item.contact_date_noon ? moment(item.contact_date_noon).format("YYYY-MM-DD") : "",
				"Contact Date Open Market": item.contact_date_open_market ? moment(item.contact_date_open_market).format("YYYY-MM-DD") : "",
				"Inquired Owners Number of Cases": item.inquired_owners_number_of_cases || "",
				"Inquired Owners Date": item.inquired_owners_date ? moment(item.inquired_owners_date).format("YYYY-MM-DD") : "",
				"Blocked Number of Cases": item.blocked_number_of_cases || "",
				"Blocked Date": item.blocked_date ? moment(item.blocked_date).format("YYYY-MM-DD") : "",
				"Blocked Letter Number": item.blocked_letter_number || "",
				"Violation Unproven Number of Sites": item.violation_unproven_number_of_sites || "",
				"Duplicate Number of Cases": item.duplicate_number_of_cases || ""
			}));

			return contentRemovalData;
		} catch (ex) {
			showAlert("Error in generating Content Removal data", "error");
		}
	},

	// Function to convert data to XLSX and download
	async downloadXlsx() {
		try {
			showAlert("Content Removal Xlsx File is downloading", "info");

			// Fetch the content removal data
			let data = await getAllContentRemoval.run();
			data = await this.buildContentRemoval(data);

			if (data) {
				// Convert the data to worksheet
				const worksheet = xlsx.utils.json_to_sheet(data);

				// Create a new workbook and append the worksheet
				const workbook = xlsx.utils.book_new();
				xlsx.utils.book_append_sheet(workbook, worksheet, "Content Removal");

				// Create the XLSX file and trigger the download
				const xlsxFile = xlsx.write(workbook, { bookType: "xlsx", type: "binary" });

				// Trigger the download using Appsmith's download function
				download(xlsxFile, `Content_Removal.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
				showAlert("Content Removal Xlsx File has downloaded", "success");
			}

		} catch (ex) {
			showAlert("Error in downloading XLSX file", "error");
		}
	},

	// Helper function to convert binary string to ArrayBuffer
	s2ab(s) {
		const buf = new ArrayBuffer(s.length); // create a buffer
		const view = new Uint8Array(buf); // create a view for the buffer
		for (let i = 0; i < s.length; i++) {
			view[i] = s.charCodeAt(i) & 0xFF; // set the view values
		}
		return buf;
	}
};
