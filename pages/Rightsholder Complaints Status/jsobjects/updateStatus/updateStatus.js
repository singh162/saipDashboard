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
			let tableObject=await handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table2;

			let id= tableObject.selectedRows ? tableObject.selectedRows .length>0 ?  tableObject.selectedRows.map(report => `'${report.complaint_status_id}'`):[]:[];

			let complaint_status_id = id.join(", ");
			console.log(complaint_status_id);
			if(Select1Copy.selectedOptionLabel === "Approved" || 
				 Select1Copy.selectedOptionLabel === "Rejected" || 
				 Select1Copy.selectedOptionLabel === "Under Review" || 
				 Select1Copy.selectedOptionLabel === "" || 
				 Select1Copy.selectedOptionLabel === undefined ){
				await updateMutipleComplaintedStatus.run({statusId:complaint_status_id,
																									status: Select1Copy.selectedOptionLabel,
																									reason_of_approve_reject: Input1Copy.text,
																									status_updated_by: appsmith.user.email,
																									updated_at: moment().format('YYYY-MM-DD HH:mm:ss')});
			}
			else{
				await updateMutipleBlockStaus.run({statusId:complaint_status_id,
																					 status: Select1Copy.selectedOptionLabel,
																					 status_updated_by: appsmith.user.email,
																					 updated_at: moment().format('YYYY-MM-DD HH:mm:ss')});
			}
			showAlert("Update Mutiple Status Sucessfully Submitted","warning");
			await SendEmailComplaints.run()
			showAlert("email sent successfully","success");
			closeModal(Modal2Copy.name);
			closeModal(Modal1Copy.name);
			resetWidget(Modal1Copy.name);
			await Table1ComplaintsUrlData.run();

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
			let tableObject=await handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table2;
			if(Select1.selectedOptionLabel === "Approved" || 
				 Select1.selectedOptionLabel === "Rejected" || 
				 Select1.selectedOptionLabel === "Under Review" || 
				 Select1.selectedOptionLabel === "" || 
				 Select1.selectedOptionLabel === undefined){
				await updateComplaintedStatus.run(
					{			                            complaint_status_id:tableObject.triggeredRow.complaint_status_id,
					 status: Select1.selectedOptionLabel,
					 reason_of_approve_reject: Input1.text,
					 status_updated_proof: FilePicker1.files[0].data,
					 status_updated_by: appsmith.user.email,
					 updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
					}
				);
			}
			else{

				await updateBlockStatus.run(
					{			                            complaint_status_id:tableObject.triggeredRow.complaint_status_id,
					 status: Select1.selectedOptionLabel,
					 status_updated_by: appsmith.user.email,
					 updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
					});
			}
			showAlert("Update Status Sucessfully Submitted","info");
			await SendEmailComplaints.run()
			showAlert("email sent successfully","success");
			closeModal(Modal2.name);
			closeModal(Modal1.name);
			resetWidget(Modal1.name);
			await Table1ComplaintsUrlData.run()
			await buildTableData.tableData();
		}
		catch(ex){
			showAlert("error inserting the form,Please try after some time","error");
		}
	}
}