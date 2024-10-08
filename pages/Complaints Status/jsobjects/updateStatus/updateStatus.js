export default {
	mutipleUpdate:false,
	generateUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0,
						v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	async ShowStatusModal(){
		this.mutipleUpdate= true;
		showModal(Modal1Copy.name);
	},
	async updateMutipleStatus(){
		try{
			let id= Table2.selectedRows ? Table2.selectedRows .length>0 ?  Table2.selectedRows.map(report => `'${report.complaint_status_id}'`):[]:[];
			let complaint_status_id = id.join(", ");
			console.log(complaint_status_id);
			await updateMutipleComplaintedStatus.run({statusId:complaint_status_id,
																								status: Select1Copy.selectedOptionLabel,
																								reason_of_approve_reject: Input1Copy.text,
																								status_updated_by: appsmith.user.email,
																								updated_at: moment().format('YYYY-MM-DD HH:mm:ss')});
			showAlert("Update Mutiple Status Sucessfully Submitted","warning");
			closeModal(Modal2Copy.name);
			closeModal(Modal1Copy.name);
			resetWidget(Modal1Copy.name);
			await buildTableData.tableData();
		}
		catch(ex)
		{
			showAlert("Error Updating the Mutiple record's","error");
		}
	},
	async Button4onClick () {
		//	write code here
		try{
			await updateComplaintedStatus.run(
				{			                            complaint_status_id:Table2.triggeredRow.complaint_status_id,
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
			await buildTableData.tableData();
		}
		catch(ex){
			showAlert("error inserting the form,Please try after some time","error");
		}
	}
}