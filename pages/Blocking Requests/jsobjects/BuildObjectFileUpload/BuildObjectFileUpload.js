export default {
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
} 