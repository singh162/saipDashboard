export default {
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
	}
}