export default {
	domainArray:[],
	buildTableData:[],
	async downloadDomains() {
		try {
			// Get domains from the input and trim spaces
			let domains = InputDomainCopy.text.split(',').map(domain => domain.trim());

			// Check if the number of domains exceeds 5
			if (domains.length > 5) {
				showAlert("Please enter no more than 5 domains.", "error");
				return;
			} else {
				// Log domains to console for debugging
				console.log(domains);
				this.domainArray = domains;
				// Call the query and pass the domains array
				let resultData = await downloadMultiDomain.run();
				let buildData= await buildTableData.cleanData(resultData);
				this.buildTableData = buildData;
				console.log("buildData",buildData);
				showAlert("Data fetch successFully",'info');
				// Log result data to console for debugging

				// Handle resultData as needed
			}
		} catch (ex) {
			// Handle exceptions
			throw ex;
		}
	}
}
