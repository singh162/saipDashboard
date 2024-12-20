export default {
	async Button2onClick () {
		//	write code here
		let isValid= true;
		if(Select1.selectedOptionLabel === "Approved" || 
			 Select1.selectedOptionLabel === "Rejected" || 
			 Select1.selectedOptionLabel === "Under Review" || 
			 Select1.selectedOptionLabel === "" || 
			 Select1.selectedOptionLabel === undefined){
			if(!Select1.selectedOptionLabel){
				isValid= false;
				showAlert("Please select the on atleast one status","error")
			}
			else if(!Input1.text){
				isValid= false;
				showAlert("Please provide the reason for the selected status","error");
			}
			else if(FilePicker1.files && FilePicker1.files.length === 0){
				isValid= false;
				showAlert("Please provide the proof for that status","error");
			}
			storeValue("complaintStatusReason",Input1.text);
		}
		else{
			if(!Select1.selectedOptionLabel){
				isValid= false;
				showAlert("Please select the on atleast one status","error")
			}
		}
		// let tableObject=await handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table2;
		if(isValid){
			let tableObject= await handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table2;
			storeValue("complaintStatus",Select1.selectedOptionLabel);
			storeValue("SelectedTableObject",JSON.stringify(tableObject));
			// await storeValue("EmailCaseId",tableObject.triggeredRow.complaint_Case_id);
			// await storeValue("EmailInfringingUrl",tableObject.triggeredRow.infringing_url);
			showModal(Modal2.name);


		}
	},
	onCloseStatusModel(){
		closeModal(Modal1.name);
		resetWidget(Modal1.name);
	},
	onCloseConfirmationModel(){
		closeModal(Modal1.name);
		resetWidget(Modal1.name);
		closeModal(Modal2.name);
	},
}