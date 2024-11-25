export default {
	emailTemplate() {
		const holderName = buildTableData.emailHolderName;
		let tableObject = JSON.parse(appsmith.store.SelectedTableObject);
		let emailUrls;
		if(tableObject && tableObject.selectedRows.length>1){
			let caseId=[];
			let url = [];
			for(let i=0;i<tableObject.selectedRows.length;i++){
				caseId=caseId.concat(tableObject.selectedRows[i].complaint_Case_id);
				url = url.concat(tableObject.selectedRows[i].infringing_url);
			}
			emailUrls = url;
		}
		else{
			emailUrls = tableObject.triggeredRow.infringing_url;
		}

		// Handling multiple URLs
		const urlPlural = tableObject ? tableObject.selectedRows.length > 0 ? 
					`URLs: ${emailUrls.join(', ')}` : 
		`URL: ${emailUrls}` : "";

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

		let emailBody = `
        <div class="content">
            <p>We have received a complaint from the rights holder, <strong>${holderName}</strong>, regarding the URL(s) listed below:</p>
            <p><strong>Complained URL:</strong> <a href="${urlPlural}">${emailUrls}</a></p>
            <p><strong>Reason:</strong> ${Table2Copy.triggeredRow.reason_of_approve_reject}</p>
            <p>After reviewing all details and evidence provided related to this complaint, we confirm the need to block this URL as soon as possible.</p>
        </div>
`;



		// Combine the entire email template
		return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Urgent: Complaint from Rights Holder for URL Blocking</title>
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
