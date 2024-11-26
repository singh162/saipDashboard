export default {
	emailTemplate:appsmith.store.RegisterationInfo === "Approved" ? `<!DOCTYPE html>
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
        Dear ${appsmith.store.rightHolderNameEmail},
    </div>
    <div class="content">
        <p>We are pleased to inform you that your profile has been successfully approved By SAIP.</p>
        <p> Now you can log in to add the complaints. </p> 
        <p>Thank you for submitting all the required information and documentation.</p>
    </div>
    <div class="footer">
        <p>Best regards,</p>
        <p>Online Antipiracy Team - SAIP</p>
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
					Dear ${appsmith.store.rightHolderNameEmail},
						</div>
		<div class="content">
			<p>We regret to inform you that your profile has not been approved By SAIP due to ${appsmith.store.statusReason}.</p>
		<p>For further assistance and clarification, Please reach out to us via email.</p>
			</div>
			<div class="footer">
			<p>Best regards,</p>
			<p>Online Antipiracy Team - SAIP</p>
			</div>
			</div>
			</body>
			</html>`

}