export default function imagePreviewer({input, previewBox}){
	const imgReader = new FileReader();
	
	return function(){
		
		imgReader.readAsDataURL(input.files[0]);
		
		imgReader.onload = function (imgEvent) {
			previewBox.setAttribute('src', imgEvent.target.result);
			input.setAttribute('value', imgEvent.target.result);
		};	
	}
}