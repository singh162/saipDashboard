export default {
	Button2onClick () {
		//	write code here
		let isValid= true;
		if(!Select1Copy.selectedOptionLabel){
			isValid= false;
			showAlert("Please select the on atleast one status","error")
		}
		else if(!Input1Copy.text){
			isValid= false;
			showAlert("Please provide the reason for the selected status","error");
		}
		if(isValid){
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