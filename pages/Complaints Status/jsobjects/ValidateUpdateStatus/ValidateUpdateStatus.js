export default {
	Button2onClick () {
		//	write code here
		let isValid= true;
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
		if(isValid){
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