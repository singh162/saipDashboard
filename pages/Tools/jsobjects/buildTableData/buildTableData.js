export default {
	async cleanData(data) {
		try{
			// Extract the objects from the website and profiler keys
			console.log(data);
			const cleanedData = data.map(item => {
				const websiteData = item.website || {};
				const profilerData = item.profiler || {};

				// Create a new object to store merged results
				const mergedData = {};

				// Function to add values to the result object with unique keys
				function addValues(obj, suffix) {
					for (const key in obj) {
						if (mergedData.hasOwnProperty(key)) {
							// If key already exists, append a suffix to the new key
							mergedData[`${key}_${suffix}`] = obj[key];
						} else {
							// Otherwise, just add the value
							mergedData[key] = obj[key];
						}
					}
				}

				// Add websiteData with suffix 'website'
				addValues(websiteData, 'website');

				// Add profilerData with suffix 'profiler'
				addValues(profilerData, 'profiler');

				return mergedData;
			});
			console.log("cleanedData",cleanedData);

			// Create a map to keep track of seen website domains
			// const seenDomains = new Set();
			// const uniqueData = cleanedData.filter(item => {
			// const domain = item.website_domain;
			// if (seenDomains.has(domain)) {
			// return false; // Skip this item if domain has already been seen
			// } else {
			// seenDomains.add(domain);
			// return true; // Include this item if domain is unique
			// }
			// });
			const uniqueData = cleanedData;
			// Extract all the unique column names
			const columnNames = Object.keys(uniqueData[0] || {});
			// Create the result array starting with the first row for column names
			const tableData = columnNames.map((columnName, index) => {
				// Initialize the row object with SNO and columnName
				const row = {
					SNO: index + 1,
					columnName: columnName
				};

				// Add values from each domain (assuming a maximum of 2 domains as per your example)
				uniqueData.forEach((item, domainIndex) => {
					row[item.website_domain] = item[columnName];
				});

				return row;
			});
			
			return tableData;
		}
		catch(ex)
		{
			throw ex;
		}
	}
}