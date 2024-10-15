export default {
	blockingData: [],
	async buildBlockingRequest(data) {
		try {
			const blockingRequestData = data.map(item => ({
				"Entry Id": item.report_entry_data || "",
				Reporter: item.reporter || "",
				"Number Of Sites": item.number_of_sites || 0,
				"Type Of Material": item.type_of_material || "",
				"Report Number": item.report_number || "",
				"Incoming Number": item.incoming_number || "",
				Date: item.date ? moment(item.date).format("YYYY-MM-DD") : "",
				"Non Working Site": item.non_working_sites || 0,
				"Blocked Sites": item.blocked_sites || 0,
				"Non Violating": item.not_violating || 0,
				"Submitted For Blocking": item.submitted_for_blocking || 0,
				"Blocking Letter Request Number": item.blocking_letter_request_number || "",
				"Site Inspection Date": item.site_inspection_date ? moment(item.site_inspection_date).format("YYYY-MM-DD") : "",
				Employees: item.employee || "",
				Notes: item.notes || ""
			}));

			return blockingRequestData;
		} catch (ex) {
			showAlert("Error in generating Blocking Request data", "error");
		}
	},

	async buildTurnAroundTime(data) {
		try {
			const turnAroundTimeData = data.map(item => ({
				Id: item.id || "",
				"Session Id": item.session_id || "",
				"Complaint Date": item.complaint_date || "",
				"Complaint Time": item.complaint_time || "",
				Complainant: item.complainant || "",
				"Complaint Code": item.complaint_code || "",
				"Complaint Category": item.complaint_category || "",
				"Received During Work Hours": item.received_during_work_hours ? (item.received_during_work_hours == 1 ? "Yes" : "No") : "",
				"Number Of Sites": item.number_of_sites || 0,
				"Violation Percentage": item.violation_percentage || "",
				"Number Of Violating Sites": item.number_of_violating_sites || 0,
				"Complaint Sub Date": item.complaint_sub_date || "",
				"Complaint Sub Time": item.complaint_sub_time || "",
				"Complaint Application Number": item.complaint_application_number || "",
				"Complaint Sub Duration": item.complaint_sub_duration || "",
				"Complaint Resolve Date": item.complaint_resolve_date || "",
				"Complaint Resolve Time": item.complaint_resolve_time || "",
				"Complaint Resolve Duration From Sub": item.complaint_resolve_duration_from_sub || "",
				"Complaint Resolve Duration From Receive": item.complaint_resolve_duration_from_receive || ""
			}));

			return turnAroundTimeData;
		} catch (ex) {
			showAlert("Error in generating Turnaround Time data", "error");
		}
	},

	async buildWebsiteStatus(data) {
		try {
			const websiteStatusData = data.map(item => ({
				id: item.id || "",
				Reporter: item.reporter || "",
				"Report Code": item.report_code || "",
				"Report Date": item.report_date || "",
				"Site Status": item.site_status || "",
				"Website Url": item.website_url || ""
			}));

			return websiteStatusData;
		} catch (ex) {
			showAlert("Error in generating Website Status data", "error");
		}
	},

	// Function to convert data to XLSX and download
	async downloadXlsx() {
		try {

			let data;

			// Check the selected tab and fetch/prepare corresponding data
			if (Tabs1.selectedTab === "Blocking Requests") {
				showAlert("Blocking Request Xlsx File is downloading","Info");
				data = await getAllBlockingRequest.run();
				data = await this.buildBlockingRequest(data);
			} 
			else if (Tabs1.selectedTab === "Website Status") {
				showAlert("Website Status Xlsx File is downloading","Info");
				data = await getAllWebsiteStatus.run();
				data = await this.buildWebsiteStatus(data);
			} 
			else if (Tabs1.selectedTab === "Turnaround Time") {
				showAlert("Turnaround Time Xlsx File is downloading","Info");
				data = await getAllTurnAroundTime.run();
				data = await this.buildTurnAroundTime(data);
			}

			if (data) {
				// Convert the data to worksheet
				const worksheet = xlsx.utils.json_to_sheet(data);

				// Create a new workbook and append the worksheet
				const workbook = xlsx.utils.book_new();
				xlsx.utils.book_append_sheet(workbook, worksheet, Tabs1.selectedTab);

				// Create the XLSX file and trigger the download
				const xlsxFile = xlsx.write(workbook, { bookType: "xlsx", type: "binary" });

				// // Convert the binary string to a Blob for download
				// const blob = new Blob([this.s2ab(xlsxFile)], { type: "application/octet-stream" });
				console.log("xlsxFile",xlsxFile);
				// Trigger the download using Appsmith's download function
				download(xlsxFile, `${Tabs1.selectedTab}.xlsx`, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
				showAlert(`${Tabs1.selectedTab} Xlsx File has downloaded`,"success");
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
