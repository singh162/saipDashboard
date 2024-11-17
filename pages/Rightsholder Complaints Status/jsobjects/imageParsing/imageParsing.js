export default {
	imageHTML: "", 
	async imageRendering() {
		// Fetch image data from the query
		let complaint_form_id = await handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table2.triggeredRow.complaint_form_id;
		let data = await getImageComplaintFormData.run({complaint_form_id:complaint_form_id});
		let imageArray = data && data.length > 0 ? data.map(item => item.image_data) : [];

		// Limit the number of images to display to 3

		// Create HTML string for images with the correct prefix
		this.imageHTML = await imageArray.map(src => 
																					`<img src="data:image/;base64,${src}" style="width: 100%; height: auto;" />
                        <br>`
																				 ).join('');
	}
};
