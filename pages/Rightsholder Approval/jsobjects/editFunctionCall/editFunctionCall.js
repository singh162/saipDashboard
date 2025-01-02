export default {
	async editFunctionCallFunction () {
		await resetWidget("Modal3", true);
		await storeValue("initialStatus", Table1.triggeredRow.Status);
		await storeValue("rightHolderNameEmail", Input3.text);
		await storeValue("RegisterationInfo",Select1.selectedOptionLabel);
		await getIndentificationProff.run();
		await copyRightLetter.run();
		await getContentOwershipCertificate.run();
		await showModal(Modal3.name);

	}
}