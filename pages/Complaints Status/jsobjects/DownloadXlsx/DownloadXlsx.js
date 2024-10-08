export default {

	async myFun2 () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
		let data = await DownloadReportQuery.run();
		console.log(data);
		download(data,"file1","XLSX");
    
	}
}