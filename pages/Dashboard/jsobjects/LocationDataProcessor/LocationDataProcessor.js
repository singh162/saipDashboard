export default {
	calculatePercentages: function() {
		// Fetch data from queries
		const totalData = GetTotalViolationWebsites.data;
		const locationCounts = GetServerLocationCounts.data;
		console.log("asdasdaD",totalData,"Asdasda",locationCounts);
		if (!totalData || !locationCounts) {
			return [];
		}
		const total = totalData[0].total;
		// Map location counts to percentages
		return locationCounts.map(item => ({
			x: item.location,
			y: (item.count * 100.0 / total).toFixed(2)
		}));
	}
}
