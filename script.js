function buildKeys(){
	var keyNames = ["7","8","9","+","4","5","6","-","1","2","3","x","clear","0","=","/"];
	const body = document.querySelector('#body');
	for (var i = 0; i<keyNames.length; i++){
		const button = document.createElement('div');
		button.classList.add('button');
		button.setAttribute('id',keyNames[i]);
		button.textContent=keyNames[i];
		body.appendChild(button);
	}
}

function add(x,y){
	return x+y;
}
function subtract(x,y){
	return x-y;
}
function multiply(x,y){
	return x*y;
}
function divide(x,y){
	if(y !==0){
		return x/y;
	}
	else{
		alert("Can't Divide by 0"); 
	}
}
function operate(o,x,y){
	if(o=="+"){
		return add(x,y);
	}
	if(o=="-"){
		return subtract(x,y);
	}
	if(o=="x"){
		return multiply(x,y);
	}
	if(o=="/"){
		return divide(x,y);
	}
}

buildKeys();
const screenText = document.getElementById('screenText');
var result = new Array(3);
var lastButtonClicked = null;
function addNumbersEvents(){
	var keyNames = ["7","8","9","4","5","6","1","2","3","0"];
	//var keyNames = ["1","2"];
	for (var i = 0; i <keyNames.length; i++) {
		var button = document.getElementById(keyNames[i]);
		button.addEventListener('mousedown', function(e){
			if(lastButtonClicked == "/" || lastButtonClicked == "x" ||lastButtonClicked == "+"||lastButtonClicked == "-"){
				screenText.textContent=this.id;
			}
			else{
			currentScreen = screenText.textContent;
			screenText.textContent=currentScreen+this.id;
		}
		lastButtonClicked = this.id;
		});

		}
	}
addNumbersEvents();

function addOperatorEvents(){
	var keyNames=["+","-","x","/"];
	
	for (var i = 0; i <keyNames.length; i++) {
		var button = document.getElementById(keyNames[i]);
		button.addEventListener('mousedown', function(e){
			lastButtonClicked = this.id;
			if(result[1] ==undefined){ //is the first operator
			result[0] = parseInt(screenText.textContent); //number on screen to result
			result[1] = this.id; //operator clicked to result

			}
			else{ //second or more operator
				result[2]= parseInt(screenText.textContent);
				var ans = operate(result[1], result[0],result[2]);
				result[0] =ans;
				result[1] = this.id;
				result[2] = null;
				screenText.textContent = ans;
			}
		});
	}
    var button2 = document.getElementById("=");
	button2.addEventListener('mousedown', function(e){
			result[2]= parseInt(screenText.textContent);
			var ans = operate(result[1], result[0],result[2]);

			screenText.textContent=ans;

			console.log(result);
		});

	var button3 = document.getElementById("clear");
	button3.addEventListener('mousedown', function(e){
			result.length=0;
			console.log(result);

			screenText.textContent="";

			
		});

}

addOperatorEvents();

