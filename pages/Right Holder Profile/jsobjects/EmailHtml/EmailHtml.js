export default {
	emailTemplate:Select1.selectedOptionLabel === "Approved" ? `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Profile Approval Notification</title>
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
</head>
<body>
<div class="container">
    <div class="header">
        Dear ${Input3.text},
    </div>
    <div class="content">
        <p>We are pleased to inform you that your profile has been successfully approved by the SAIP team.</p>
        <p>Thank you for submitting all the required information and documentation.</p>
    </div>
    <div class="footer">
        <p>Best regards,</p>
        <p>SAIP Team</p>
    </div>
</div>
</body>
</html>
` : 
	`<!DOCTYPE html>
				<html lang="en">
					<head>
					<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<title>Profile Disapproval Notification</title>
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
		</head>
		<body>
			<div class="container">
				<div class="header">
					Dear ${Input3.text},
						</div>
		<div class="content">
			<p>We regret to inform you that your profile has not been approved by the SAIP team due to insufficient information or documentation.</p>
		<p>For further assistance and clarification, we kindly encourage you to reach out to the SAIP team directly.</p>
			</div>
			<div class="footer">
			<p>Best regards,</p>
			<p>SAIP Team</p>
			</div>
			</div>
			</body>
			</html>`

}