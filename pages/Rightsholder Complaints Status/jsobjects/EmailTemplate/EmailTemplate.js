export default {
	emailTemplate() {
		const status = appsmith.store.complaintStatus;
		const holderName = buildTableData.emailHolderName;
		let tableObject = JSON.parse(appsmith.store.SelectedTableObject);
		let emailCaseId;
		console.log("tableObject",tableObject)
		let emailUrls;
		if(tableObject && tableObject.selectedRows.length>1){
			let caseId=[];
			let url = [];
			for(let i=0;i<tableObject.selectedRows.length;i++){
				caseId=caseId.concat(tableObject.selectedRows[i].complaint_Case_id);
				url = url.concat(tableObject.selectedRows[i].infringing_url);
			}
			emailCaseId = caseId;
			emailUrls = url;
			console.log("email mutiple",emailCaseId,emailUrls);
		}
		else{
			emailCaseId = tableObject.triggeredRow.complaint_Case_id;
			emailUrls = tableObject.triggeredRow.infringing_url;
			console.log("email single",tableObject.selectedRow,emailCaseId,emailUrls)
		}

		// Handling plural case for multiple complaints
		console.log("tableObjectsss",tableObject);
		const casePlural =tableObject ? tableObject.selectedRows.length > 0 ? 
					`these Case Id's ${emailCaseId}` : 
		`Case Id (${emailCaseId}`: "";

		// Handling multiple URLs
		const urlPlural = tableObject ? tableObject.selectedRows.length > 0 ? 
					`URLs: ${emailUrls.join(', ')}` : 
		`URL: ${emailUrls}` : "";
		console.log("casePlural",tableObject.selectedRows.length,casePlural,urlPlural,"urlPlural");
		const templateStyles = `
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .header {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .content {
                    margin-bottom: 20px;
                }
                .content p {
                    margin: 10px 0;
                }
                .footer {
                    font-size: 14px;
                    margin-top: 20px;
                }
            </style>
        `;

		const emailHeader = `
            <div class="header">
                Dear ${holderName},
            </div>
        `;

		const emailFooter = `
            <div class="footer">
                <p>Best regards,</p>
                <p>SAIP Team</p>
            </div>
        `;

		let emailBody = "";

		// Status specific content with Infringing URL
		switch (status) {
			case "Under Review":
				emailBody = `
                   <div class="content">
            <p>We wanted to inform you that your complaints regarding ${casePlural} are currently under review by the SAIP team.</p>
            <p>Our team is carefully reviewing the following ${urlPlural} and the provided documentation.</p>
            <p>We appreciate your patience during this process and will notify you as soon as a decision is made.</p>
            <p>If you have any additional information to provide, please feel free to reply to this message.</p>
            <p>Thank you for your cooperation.</p>
        </div>
                `;
				break;
			case "Approved":
				emailBody = `
                    <div class="content">
                        <p>We are pleased to inform you that your complaints for ${casePlural} have been successfully approved by the SAIP team.</p>
                        <p>The following ${urlPlural} has been reviewed and approved.</p>
                        <p>Thank you for submitting all the required information and documentation.</p>
                    </div>
                `;
				break;

			case "Rejected":
				emailBody = `
                    <div class="content">
                        <p>We regret to inform you that your complaints for ${casePlural} have not been approved by the SAIP team due to ${appsmith.store.complaintStatusReason}.</p>
                        <p>For further assistance and clarification, we kindly encourage you to reach out to the SAIP team directly. The following ${urlPlural} was reviewed during the process.</p>
                    </div>
                `;
				break;

			case "Blocked":
				emailBody = `
                    <div class="content">
                        <p>Your complaints for ${casePlural} have been blocked by the SAIP team.</p>
                        <p>The following ${urlPlural} has been blocked. For further information, please contact the SAIP team.</p>
                    </div>
                `;
				break;

			case "Submitted For Blocking":
				emailBody = `
                    <div class="content">
                        <p>Your complaints for ${casePlural} have been submitted for block review by the SAIP team.</p>
                        <p>The following ${urlPlural} is under review. You will be notified of further actions taken.</p>
                    </div>
                `;
				break;

			default:
				emailBody = `
                    <div class="content">
                        <p>There has been an update regarding your complaint status.</p>
                    </div>
                `;
		}

		// Combine the entire email template
		return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Complaint Status Update</title>
                ${templateStyles}
            </head>
            <body>
                <div class="container">
                    ${emailHeader}
                    ${emailBody}
                    ${emailFooter}
                </div>
            </body>
            </html>
        `;
	}
}
