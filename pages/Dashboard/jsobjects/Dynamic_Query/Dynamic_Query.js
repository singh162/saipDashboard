export default {
	where: '',
	seletFilter:'Month',
	statusMessage: '',
	Select1onOptionChange() {
		const timeGrouping = Select1.selectedOptionValue;
		this.seletFilter=Select1.selectedOptionLabel;
		const startDate = DatePicker1.selectedDate; 
		const endDate = DatePicker1Copy.selectedDate; 
		if (!timeGrouping) {
			this.statusMessage = 'Please select a filter option.';
			return '';
		}

		if (timeGrouping && startDate && endDate) {
			const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
			const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
			this.where = `WHERE incident_date BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'`;
			this.statusMessage = ''; // Clear status message on valid input
		} else if (startDate || endDate) {
			this.statusMessage = startDate ? 'Please select the End Date.' : 'Please select the Start Date.';
			return '';
		} else {
			this.statusMessage = 'Please select the Start And End Date.';
			return '';
		}


		let query='';

		// Construct the SQL query based on the selected time grouping
		if (timeGrouping === 'DAY') {
			query = `
        SELECT DATE_FORMAT(incident_date, '%Y-%m-%d') as x, COUNT(*) as y
        FROM violations_sites_main
        ${this.where} 
        GROUP BY x
        ORDER BY x;
      `;
		} else if (timeGrouping === 'MONTH') {
			query = `
        SELECT DATE_FORMAT(incident_date, '%Y-%m') as x, COUNT(*) as y
        FROM violations_sites_main
        ${this.where}  
        GROUP BY x
        ORDER BY x;
      `;
		} else if (timeGrouping === 'WEEK') {
			query = `
        SELECT DATE_FORMAT(incident_date, '%Y-%u') as x, COUNT(*) as y
        FROM violations_sites_main
        ${this.where} 
        GROUP BY x
        ORDER BY x;
      `;
		} else {
			query = ''; 
		}
		console.log("query",query);
		return query;
	},

	runQuery(){
		let query= this.Select1onOptionChange();	
		if(query!=''){
			console.log(query,"run");
			ExecuteDynamicQuery.run();
		}
		else
		{
			showAlert(this.statusMessage,"warning");
		}
	}
};
