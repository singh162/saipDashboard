export default {
	url: "",
	// Function to convert Google Slides URL to Google Drive Download URL
	convertToDriveDownloadUrl(googleSlidesUrl) {
    // Extract the ID from the Google Slides URL
    const regex = /\/d\/(.*?)(\/|$)/;
    const match = googleSlidesUrl.match(regex);

    // Check if the URL is valid and the ID is found
    if (match && match[1]) {
        const documentId = match[1];
        // Construct the download URL
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${documentId}`;
        return downloadUrl;
    } else {
        // Return an error message if the URL is not valid
        return console.log("Invalid URL. Please check the link.");
    }
	}
}