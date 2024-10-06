export default {
	handleBlobData: async () => {
		try {
			const url = URL.createObjectURL(blob);
			return url;

		} catch (error) {
			console.error("Error fetching blob data:", error);
			return null; // Handle error as needed
		}
	}
}