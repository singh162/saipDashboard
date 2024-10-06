export default {
	escapeSingleQuotes(input) {
		return input.replace(/'/g, "''");
	},
	buildMainPercentage: function(rows) {
		const percentageFields = [
			'bounce_rate',
			'market_share',
			'top_organic_country_visitor_percent',
			'top_paid_country_visitor_percent',
			'local_organic_visitor_percent',
			'local_paid_visitor_percent',
			'violation_percentage'
		];

		return rows.map(row => {
			const updatedRow = { ...row };
			percentageFields.forEach(field => {
				if (updatedRow[field] !== undefined) {
					if (typeof updatedRow[field] === 'number') {
						if (updatedRow[field] > 0 && updatedRow[field] <= 1) {
							// Convert fraction to percentage and format as a string
							updatedRow[field] = (updatedRow[field] * 100).toFixed(2) + '%';
						} else if (updatedRow[field] === 0) {
							updatedRow[field] = '0';
						}
					} else if (typeof updatedRow[field] === 'string' && updatedRow[field].endsWith('%')) {
						updatedRow[field] = updatedRow[field].trim();
					}
				}
			});

			return updatedRow;
		});
	},
	buildMainObject: function(rows) {
		// Define a list of fields with datetime type
		console.log("insertRow",rows);

		// Define a list of fields with datetime type
		const datetimeFields = [
			'incident_date',
			'updated_at',
			'reported_date',
			'approved_date',
			'resolved_date',
			'asn_registration_date_v4',
			'asn_registration_date_v6',
			'domain_updated_date',
			'domain_creation_date'
		];


		// Iterate through each object in the array
		rows.forEach(row => {
			// Iterate through each field in the object
			Object.keys(row).forEach(key => {
				if (datetimeFields.includes(key)) {
					try {
						if (row[key]) {
							row[key] = moment(row[key]).format('YYYY-MM-DD HH:mm:ss');
						}
						else
						{
							row[key] = null;
						}
					} catch (error) {
						console.error(`Error formatting date field ${key}:`, error);
						row[key] = row[key]; // retain original value in case of error
					}
				} else if (key === 'site_accessible_proxy_vpn' || key === 'proxy_alias_site') {
					row[key] = (row[key] === 'Yes' || row[key] === 'YES') ? 1 : 0;
				}
				else if(key === 'enforcement_outcome')
				{
					row[key] = (row[key] === '' || row[key] === 'N/A') ? null : row[key];
				}
				else {
					if(row[key] === '' || row[key] === 'N/A'){
						row[key] = null;
					}
				}
				if(row[key]){
					if(typeof row[key] === 'string'){
						row[key] = row[key].replace(/'/g, "''");
						row[key] = row[key].replace(/\\/g, '');
					}
				}
			});
		});

		console.log("insertRow",rows);
		return rows;
	},
	buildTecObject: function(rows) {
		// Define a list of fields with datetime type

		// Define a list of fields with datetime type
		const datetimeFields = [
			'cert_expiry'
		];


		// Iterate through each object in the array
		rows.forEach(row => {
			// Iterate through each field in the object
			Object.keys(row).forEach(key => {
				if (datetimeFields.includes(key)) {
					try {
						if(row[key]){
							row[key] = moment(row[key]).format('YYYY-MM-DD HH:mm:ss');
						}
						else
						{
							row[key] = null;
						}
					} catch (error) {
						console.error(`Error formatting date field ${key}:`, error);
						row[key] = row[key]; // retain original value in case of error
					}
				}
				else if(key === 'ssl_tls_enabled')
				{
					row[key] = (row[key] === '' || row[key] === 'N/A') ? null : (
						(row[key] === 'Yes' || row[key] === 'YES') ? 1 : 0
					);

				}
				else {
					if(row[key] === '' || row[key] === 'N/A'){
						row[key] = null;
					}
				}
				if(row[key]){
					if(typeof row[key] === 'string'){
						row[key] = row[key].replace(/'/g, "''");
						row[key] = row[key].replace(/\\/g, '');
					}
				}
			});
		});

		console.log("rows",rows);
		return rows;
	},
	buildCompaints : function(rows) {
		// Define a list of fields with datetime type

		// Define a list of fields with datetime type
		const integerFields = [
			'non_working_sites',
			'number_of_sites',
			'blocked_sites',
			'not_violating',
			'submitted_for_blocking'
		];
		const datetimeFields =[
			'date',
			'site_inspection_date'
		]

		// Iterate through each object in the array
		rows.forEach(row => {
			// Iterate through each field in the object
			Object.keys(row).forEach(key => {
				if (datetimeFields.includes(key)) {
					try {
						if(row[key]){
							row[key] = moment(row[key]).format('YYYY-MM-DD HH:mm:ss');
						}
						else
						{
							row[key] = null;
						}
					} catch (error) {
						console.error(`Error formatting date field ${key}:`, error);
						row[key] = row[key]; // retain original value in case of error
					}
				}
				else if(integerFields.includes(key))
				{
					row[key] = row[key] === '' ? null : row[key];
				}
				else {
					if(row[key] === '' || row[key] === 'N/A'){
						row[key] = null;
					}
				}
				if(row[key]){
					if(typeof row[key] === 'string'){
						row[key] = row[key].replace(/'/g, "''");
						row[key] = row[key].replace(/\\/g, '');
					}
				}
			});
		});

		console.log("rows",rows);
		return rows;
	},
	buildComplaintTat: function(rows){

		// Define a list of fields with datetime type

		// Define a list of fields with datetime type
		const integerFields = [
			'number_of_sites',
			'session_id',
			'number_of_violating_sites',
			'complaint_application_number'
		];
		const datetimeFields =[
			'complaint_date',
			'complaint_sub_date',
			"complaint_resolve_date"
		]
		const timeField =[
			'complaint_time',
			'complaint_sub_time',
			'complaint_resolve_time'
		]
		console.log("complaints ",rows);
		// Iterate through each object in the array
		rows.forEach(row => {
			// Iterate through each field in the object
			Object.keys(row).forEach(key => {
				if (datetimeFields.includes(key)) {
					try {
						if(row[key]){
							row[key] = moment(row[key]).format('YYYY-MM-DD');
						}
						else
						{
							row[key] = null;
						}
					} catch (error) {
						console.error(`Error formatting date field ${key}:`, error);
						row[key] = row[key]; // retain original value in case of error
					}
				}
				else if(integerFields.includes(key))
				{
					row[key] = row[key] === '' ? null : row[key];
				}
				else if(timeField.includes(key)){
					if(row[key]){
						row[key] = moment(row[key], 'HH:mm').format('HH:mm:ss');
					}
					else
					{
						row[key] = null;
					}
				}
				else {
					if(row[key] === '' || row[key] === 'N/A'){
						row[key] = null;
					}
				}
				if (typeof row['received_during_work_hours'] === 'string') {
					// Convert "نعم" to 1 and anything else to 0
					row['received_during_work_hours'] = row['received_during_work_hours'] === 'نعم' ? 1 : 0;
				} 
				if(row[key]){
					if(typeof row[key] === 'string'){
						row[key] = row[key].replace(/'/g, "''");
						row[key] = row[key].replace(/\\/g, '');

					}
				}
			});
		});

		console.log("rows",rows);
		return rows;

	},
	buildReport: function(rows){

		// Define a list of fields with datetime type

		// Define a list of fields with datetime type
		const integerFields = [
			'report_number',
			'case_id_max',
			'case_id_min',
			'day',
			'week',
			'month'
		];
		const datetimeFields =[
			'sent_date',
			'updation_date',
			"insertion_date"
		]

		// Iterate through each object in the array
		rows.forEach(row => {
			// Iterate through each field in the object
			Object.keys(row).forEach(key => {
				if (datetimeFields.includes(key)) {
					try {
						if(row[key]){
							row[key] = moment(row[key]).format('YYYY-MM-DD HH:mm:ss');
						}
						else
						{
							row[key] = null;
						}
					} catch (error) {
						console.error(`Error formatting date field ${key}:`, error);
						row[key] = row[key]; // retain original value in case of error
					}
				}
				else if(integerFields.includes(key))
				{
					row[key] = row[key] === '' ? null : row[key];
				}
				else {
					if(row[key] === '' || row[key] === 'N/A'){
						row[key] = null;
					}
				}
				if(row[key]){
					if(typeof row[key] === 'string'){
						row[key] = row[key].replace(/'/g, "''");
						row[key] = row[key].replace(/\\/g, '');

					}
				}
				if(row[key] && row[key].report_type === 'Legal Status Report'){
					row[key].report_type = 'Opinion Report (Legal)';
				} 
				else if (row[key] && row[key].report_type === 'Investigation Report'){
					row[key].report_type = 'Opinion Report (Tech)';
				} 
				else if (row[key] && row[key].report_type === 'Weekly Report'){
					row[key].report_type = 'Weekly Work Log Report';
				} 

			});
		});

		console.log("report rows",rows);
		return rows;

	},
	buildSiteStatus: function(rows){
		const datetimeFields =[
			'report_date',
		]

		// Iterate through each object in the array
		rows.forEach(row => {
			// Iterate through each field in the object
			Object.keys(row).forEach(key => {
				if (datetimeFields.includes(key)) {
					try {
						if(row[key]){
							row[key] = moment(row[key]).format('YYYY-MM-DD HH:mm:ss');
						}
						else
						{
							row[key] = null;
						}
					} catch (error) {
						console.error(`Error formatting date field ${key}:`, error);
						row[key] = row[key]; // retain original value in case of error
					}
				}
				else {
					if(row[key] === '' || row[key] === 'N/A'){
						row[key] = null;
					}
				}
				if(row[key]){
					if(typeof row[key] === 'string'){
						row[key] = row[key].replace(/'/g, "''");
						row[key] = row[key].replace(/\\/g, '');

					}
				}
			});
		});

		console.log("rows",rows);
		return rows;
	},
	buildContentRemoval: function(rows){
		const intFields = [
			'id',
			'number_of_cases',
			'basket_cases',
			'amazon_cases',
			'on_sale_cases',
			'open_market_cases',
			'used_and_new_cases',
			'noon_cases',
			'site_cases',
			'inquired_owners_number_of_cases',
			'blocked_number_of_cases',
			'violation_unproven_number_of_sites',
			'duplicate_number_of_cases'
		];

		const dateFields = [
			'request_date',
			'contact_date_amazon',
			'contact_date_on_sale',
			'contact_date_used_and_new',
			'contact_date_basket',
			'contact_date_noon',
			'contact_date_open_market',
			'inquired_owners_date',
			'blocked_date'
		];

		// Iterate through each object in the array
		rows.forEach(row => {
			// Iterate through each field in the object
			Object.keys(row).forEach(key => {
				if (dateFields.includes(key)) {
					try {
						if(row[key]){
							row[key] = moment(row[key]).format('YYYY-MM-DD HH:mm:ss');
						}
						else
						{
							row[key] = null;
						}
					} catch (error) {
						console.error(`Error formatting date field ${key}:`, error);
						row[key] = row[key]; // retain original value in case of error
					}
				}
				else if(intFields.includes(key))
				{
					row[key] = row[key] === '' ? null : row[key];
				}
				else {
					if(row[key] === '' || row[key] === 'N/A'){
						row[key] = null;
					}
				}
				if(row[key]){
					if(typeof row[key] === 'string'){
						row[key] = row[key].replace(/'/g, "''");
						row[key] = row[key].replace(/\\/g, '');


					}
				}
			});
		});

		console.log("rows",rows);
		return rows;
	},
}