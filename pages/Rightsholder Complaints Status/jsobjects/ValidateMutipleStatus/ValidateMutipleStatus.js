export default {
	async Button2onClick () {
		let tableObject= await handleTabChange.handleTabChange()[`${Tabs1.selectedTab}`].table2;
		//	write code here
		let isValid= true;
		if(Select1Copy.selectedOptionLabel === "Approved" || 
			 Select1Copy.selectedOptionLabel === "Rejected" || 
			 Select1Copy.selectedOptionLabel === "Under Review" || 
			 Select1Copy.selectedOptionLabel === "" || 
			 Select1Copy.selectedOptionLabel === undefined){
			if(!Select1Copy.selectedOptionLabel){
				isValid= false;
				showAlert("Please select the on atleast one status","error")
			}
			else if(!Input1Copy.text){
				isValid= false;
				showAlert("Please provide the reason for the selected status","error");
			}
		}
		else{
			if(!Select1Copy.selectedOptionLabel){
				isValid= false;
				showAlert("Please select the on atleast one status","error")
			}
		}
		if(isValid){
			await storeValue("complaintStatus",Select1Copy.selectedOptionLabel);
			// let caseId=[];
			// let url = [];
			// for(let i=0;i<tableObject.selectedRows;i++){
			// caseId=caseId.concat(tableObject.selectedRows[i].complaint_Case_id);
			// url = url.concat(tableObject.selectedRows[i].infringing_url);
			// }
			// await storeValue("EmailCaseId",caseId)
			// await storeValue("EmailInfringingUrl",url)
			await storeValue("SelectedTableObject",tableObject);
			showModal(Modal2Copy.name);		
		}
	},
	onCloseStatusModel(){
		closeModal(Modal1Copy.name);
		resetWidget(Modal1Copy.name);
	},
	onCloseConfirmationModel(){
		closeModal(Modal1Copy.name);
		resetWidget(Modal1Copy.name);
		closeModal(Modal2Copy.name);
	},
}