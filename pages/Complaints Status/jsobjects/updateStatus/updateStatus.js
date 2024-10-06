export default {
	generateUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0,
						v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	async Button4onClick () {
		//	write code here
		try{
			await updateComplaintedStatus.run(
				{			                            complaint_status_id:Table1.triggeredRow.complaint_status_id,
				 status: Select1.selectedOptionLabel,
				 reason_of_approve_reject: Input1.text,
				 status_updated_proof: FilePicker1.files[0].data,
				 status_updated_by: appsmith.user.email,
				 updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
				}
			);
			showAlert("Update Status Sucessfully Submitted","info");
			closeModal(Modal2.name);
			closeModal(Modal1.name);
			resetWidget(Modal1.name);
			GetViewComplaintStatus.run();
		}
		catch(ex){
			showAlert("error inserting the form,Please try after some time","error");
		}
	}
}