export default {
	emailHtml: () => {
		if (appsmith.store.TitleStatus == "Approved") {
			return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Approval</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
              <tr>
                <td>
                  <table width="600px" cellpadding="0" cellspacing="0" align="center" style="background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; padding: 20px;">
                    <tr>
                      <td style="text-align: center; padding: 10px 0;">
                        <h1 style="font-size: 24px; color: #3EC13E;">Title Approved</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #333333; font-size: 16px; line-height: 1.6;">
                        <p>Dear <strong>${Table1Copy.triggeredRow.username}</strong>,</p>
                        <p>We are pleased to inform you that the SAIP team has approved the title (<strong>${Table1Copy.triggeredRow.name}</strong>) for the rights holder as discussed. Please let us know if you need any further details or documentation to proceed.</p>
                        <p>Thank you for your collaboration.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 20px; text-align: center;">
                        <p style="font-size: 14px; color: #555555;">Best regards,</p>
                        <p style="font-size: 14px; color: #555555; font-weight: bold;">SAIP Team</p>
                      </td>
                    </tr>
										 <tr class="contact-info">
              <td>
                <table>
                  <tr>
                    <td><span>📞</span></td>
                    <td><strong>Customer Service Number:</strong> 920021421</td>
                  </tr>
                  <tr>
                    <td><span>📍</span></td>
                    <td><strong>Location:</strong> Riyadh 13321, As Sahafah Olaya St 6531, 3059, Saudi Authority for Intellectual Property</td>
                  </tr>
                </table>
              </td>
            </tr>
                  </table>
                </td>
              </tr>
          </table>
        </td>
      </tr>
            </table>
          </body>
        </html>`;
		} else {
			return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Rejection</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
              <tr>
                <td>
                  <table width="600px" cellpadding="0" cellspacing="0" align="center" style="background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; padding: 20px;">
                    <tr>
                      <td style="text-align: center; padding: 10px 0;">
                        <h1 style="font-size: 24px; color: #d9534f;">Title Rejected</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="color: #333333; font-size: 16px; line-height: 1.6;">
                        <p>Dear <strong>${Table1Copy.triggeredRow.username}</strong>,</p>
                        <p>We regret to inform you that the SAIP team could not approve the title (<strong>${Table1Copy.triggeredRow.name}</strong>) for the rights holder. The reason for rejection is as follows:</p>
                        <p style="background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px;"><strong>Rejection Reason:</strong> ${appsmith.store.TitleReason}</p>
                        <p>If you need further clarification or wish to discuss this decision, please feel free to reach out to us us via email.</p>
                        <p>Thank you for your understanding.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 20px; text-align: center;">
                        <p style="font-size: 14px; color: #555555;">Best regards,</p>
                        <p style="font-size: 14px; color: #555555; font-weight: bold;"> Online Antipiracy Team - SAIP</p>
                      </td>
                    </tr>
										 <tr class="contact-info">
              <td>
                <table>
                  <tr>
                    <td><span>📞</span></td>
                    <td><strong>Customer Service Number:</strong> 920021421</td>
                  </tr>
                  <tr>
                    <td><span>📍</span></td>
                    <td><strong>Location:</strong> Riyadh 13321, As Sahafah Olaya St 6531, 3059, Saudi Authority for Intellectual Property</td>
                  </tr>
                </table>
              </td>
            </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>`;
		}
	}
};
