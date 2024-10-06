export default {
	statusMessage: '',
	requestData: {},
	isDownloadPPtLoading: true,

	async generatePpt() {
		try {
			showAlert("Please wait, PPT is being generated...", "success");
			this.isDownloadPPtLoading = false;

			// Validate selections and dates
			if (!ComplainantSelection.selectedOptionValue) {
				this.setStatusMessage("Please select at least one value in the complainant selection.");
				return;
			}

			if (!StartDate_CSummary.selectedDate || !EndDate_CSummary.selectedDate) {
				this.setStatusMessage("Please select both start and end dates for Complaint Summary.");
				return;
			}

			if (ComplaintSummary.data && ComplaintSummary.data.length === 0) {
				this.setStatusMessage("No data to generate PPT.");
				return;
			}
			let filteredData = ComplaintSummary.data.filter(row => row["Application No"] !== null && row.complaint_date !== '');
			// Prepare request data
			this.requestData = {
				startDate: StartDate_CSummary.selectedDate,
				endDate: EndDate_CSummary.selectedDate,
				selectedComplainant: ComplainantSelection.selectedOptionValue,
				tableData: filteredData
			};

			// Call API to generate PPT
			await this.callGeneratePptApi();

		} catch (ex) {
			this.setStatusMessage(ex.message || "An unexpected error occurred.");
		} finally {
			this.isDownloadPPtLoading = true;
		}
	},

	formatDateRange(startDate, endDate) {
		const options = { month: 'long', day: 'numeric' };
		const start = new Date(startDate);
		const end = new Date(endDate);
		return `${start.toLocaleDateString('en-US', options)} to ${end.toLocaleDateString('en-US', options)}`;
	},

	async callGeneratePptApi() {
		try {
			const response = await GetPPtComplainantSelection.run();
			const dateFormatted = this.formatDateRange(StartDate_CSummary.selectedDate, EndDate_CSummary.selectedDate);
			const filename = `${ComplainantSelection.selectedOptionValue} Group Weekly Update - ${dateFormatted}.odp`;
			console.log("Data received:", response);
			download(response, filename);
			showAlert("PPT generated successfully!", "success");
		} catch (error) {
			console.error("Error:", error);
			showAlert("Failed to generate file!", "error");
		} finally {
			this.isDownloadPPtLoading = true;
		}
	},

	setStatusMessage(message) {
		this.statusMessage = message;
		showAlert(this.statusMessage, "error");
		this.isDownloadPPtLoading = true;
	}
};