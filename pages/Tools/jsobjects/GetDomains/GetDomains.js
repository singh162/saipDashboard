export default {
	tableData:[],
	async buildData(data){
		const domainsObjects = data.map((domain, index) => {
			return {
				SNO: index + 1,
				DOMAIN: domain
			};
		});
		return domainsObjects;
	},
	async getDomain() {
		try {
			if(!Input1.text){
				showAlert("Please enter a keyword","warning")
			}
			else
			{
				let data = await getDomains.run();
				this.tableData = await this.buildData(data);
			}
		} catch (ex) {
			// Handle exceptions
			showAlert(ex.message,"error")

			return [];
		}
	}
}
