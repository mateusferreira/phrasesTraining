
	var contents;
	var fr1;
	var frCorr;
	var english;
	var portuguese;
	var numberCurrent;
	var endPhrase;
	var hits;
	var wrongs;
	var sequenceWrongs = "";
	var temp;
	var totalPhrase;
	var especificPhrasesSelected;
	var totalPhraseInFile;
	
	window.onload = function() {
		window.addEventListener( "keypress", doKeyDown, false);
		//switchButton(true, "1000000000");
}

	/// habilita ou não os botões
	/*function switchButton(statusButton, ctrl){
		var nameElements = ["fileinput","btStartTraining","bt1","enviar","nextPhrase","comment","correction","translation","textEspecificPhrases","giveUp"];//"010000000"
		var ch;
		//alert("teste "+ctrl.length);
		
		for(var i = 0; i < ctrl.length; i++){
			ch = ctrl.charCodeAt(i);
			ch = ch - 48;
			if(ch == 1)
				document.getElementById(nameElements[i]).disabled = !statusButton;
			else
				document.getElementById(nameElements[i]).disabled = statusButton;
		}
	}
	*/
	function doKeyDown(e) {
		//alert( e.keyCode )
		if(e.keyCode == 41){//Shift + numero 0
			document.getElementById("bt1").click();
		}
		if(e.keyCode == 95){//Shift + simbolo -
			document.getElementById("enviar").click();
		}
		if(e.keyCode == 43){//Shift + numero 0
			document.getElementById("nextPhrase").click();
		}

}
//Este metodo tem 2 funções: pegar a faixa seleciona pelo botão e obter os dados da frase nas 3 variavesi: faixa, frase e tradução.
	function selectPhrase(indice){
			
		temp = indice;
		var tam = indice.toString();
		var n = contents.indexOf(":>"+indice);
		indice = indice + 1;
		var t = contents.indexOf(":>"+indice);
	
		//atribui a fr1 a string compreendida entre :>x e :>x+1;
		 fr1 = contents.substr(n+2+tam.length,(t - 2 - tam.length)-n);

		//Extraindo a primeira linha:
		var x1 = fr1.indexOf("\n");
		portuguese = fr1.substr(x1+1,fr1.length);
		
		fr1 = portuguese;
		x1 = portuguese.indexOf("\n");
		portuguese = portuguese.substr(0,x1+1);

		//console.log("FR1:"+fr1+ "PORT: "+portuguese);
		fr1 = fr1.substr(x1 + 1, fr1.length).trim();
		//Peguei a  frase em português para ser traduzida para o inglês.
		document.getElementById('comment').value = portuguese;
	}
	
	function testaFrases(){
		
		var x;
		var r1;
		frCorr = "";
		var result = 0;
		//console.log("fr1: "+fr1);
		while(fr1 != '\0'){
			
			x = fr1.indexOf("\n");
			//console.log("X vale: "+x);
			if(x != -1){
				r1 = fr1.substr(0,x -1).trim();
				fr1 = fr1.substr(x + 1, fr1.length).trim();
			}
			else{
				r1 = fr1.substr(0,fr1.length).trim();
				fr1 = '\0';
			}
			console.log("Frase Result: "+r1);
			frCorr = frCorr + r1 + "\n";
			//console.log("R1: "+r1 + "English: "+english);
			if(r1.toUpperCase() == $('#ingles').val().toUpperCase())
				result = 1;
		}
		return result;
		
	}
	
	function getAmountPhrase(){
		var n = 1;
		var indice = 1;
		while(n != -1){
			n = contents.indexOf(":>"+indice.toString());
			indice++;
		}
		indice = indice - 3;
		totalPhraseInFile = indice;
		//alert("N: "+n+" indice: "+indice);
		document.getElementById('qtdPhrase').max = indice.toString();
		document.getElementById('qtdPhrase').value = indice;
		document.getElementById('totaldeFrases').textContent = "MAX: "+indice.toString();
	}
	
	function loadHelpWords(){
		var n = contents.indexOf(":>HELP");
		var t = contents.indexOf(":>END_HELP");
		
		var fr1 = contents.substr(n+8,(t - 8)-n);
		
		document.getElementById('helpWords').value = fr1;
	}
	
	function organizaPhrasesSelected(){
		var x1 = 0;
		var n1;
		
		x1 = especificPhrasesSelected.indexOf(",");	
		if(x1 != -1){
			n1 = especificPhrasesSelected.substr(0,x1);
			especificPhrasesSelected = especificPhrasesSelected.substr(x1+1,especificPhrasesSelected.length);
		}
		else
		{
			n1 = especificPhrasesSelected.substr(0,especificPhrasesSelected.length);
			//especificPhrasesSelected.substr(especificPhrasesSelected.length, especificPhrasesSelected.length);
			//especificPhrasesSelected = "\0";
			//console.log("Fim: "+especificPhrasesSelected);
			endPhrase = 0;//força a encerrar o exercício
		}
		totalPhrase++;
		numberCurrent = parseInt(n1);
		console.log("n1: "+n1);
	}
	
	$('#btStartTraining').click(function(){
		if(document.getElementById('especificPhrases').checked == true){
			especificPhrasesSelected = $('#textEspecificPhrases').val();
			endPhrase = totalPhraseInFile;
			console.log("Frases:"+especificPhrasesSelected+ "Total Frases: "+totalPhraseInFile);
			totalPhrase = 0;
			organizaPhrasesSelected();
			selectPhrase(numberCurrent);
		}
		
		else if (document.getElementById('radioSequence').checked == true){
			//alert("Sequence is Selected");
			var number = $('#startInNumber').val();
			numberCurrent = parseInt(number);
			number = $('#qtdPhrase').val();
			endPhrase = parseInt(number);//numero da ultima frase a ser treinada.
			selectPhrase(numberCurrent);
		}
		else if(document.getElementById('radioRandom').checked == true)
			alert("Random is Selected");
		
		wrongs = 0;
		hits = 0;
		if(document.getElementById('especificPhrases').checked == true)
			totalPhrase = 1;
		else
			totalPhrase = endPhrase - numberCurrent + 1;
		//switchButton(true,"0011010001");
		//document.getElementById('comment').value = portuguese;
		document.getElementById('score1').textContent = "Frase nº "+numberCurrent+"\nWrongs: "+wrongs+"\nHITS: "+hits;
		//console.log("Frase Estudadas: "+totalPhrase );
	});
	
	//Envia a resposta ao usuário, se acertou ou errou.
	$('#enviar').click(function(){
		//console.log("MY F: "+$('#comment').val().length);
		//console.log("OR: "+english.length);
		if(testaFrases() == 1){
			document.getElementById('ingles').value = "!!!GOOD JOB!!!";//Frase correta aparecerá.
			hits++;
		}
		else{
			//alert("EN: "+english+"YOUR: "+$('#comment').val());	
			wrongs++;
			sequenceWrongs = sequenceWrongs + temp.toString() +",";
		}
		//switchButton(true,"0010100001");
		document.getElementById('correction').value = frCorr;//Frase correta aparecerá.
		document.getElementById('score1').textContent = "Frase nº "+numberCurrent+"\nWrongs: "+wrongs+"\nHITS: "+hits;
	});
	
	function cleanFields(){
		document.getElementById('comment').value = "";
		document.getElementById('correction').value = "";
		document.getElementById('ingles').value = "";
		document.getElementById('helpWords').value = "";
	}
	
	//Limpa os campos para a próxima lição.
	$('#nextPhrase').click(function(){
		cleanFields();
		numberCurrent++;
		console.log("Number Current: "+numberCurrent+" endPhrase: "+endPhrase);
		if(numberCurrent > endPhrase)
		{
			showScoreAndFinish();
		}
		else{
			if(document.getElementById('especificPhrases').checked == true)
				organizaPhrasesSelected();
			
			selectPhrase(numberCurrent);
			document.getElementById('score1').textContent = "Frase nº "+numberCurrent+"\nWrongs: "+wrongs+"\nHITS: "+hits;
			//switchButton(true,"0011010001");
			document.getElementById('ingles').focus();
		}
		
	});
	
	function showScoreAndFinish(){
		console.log("HITS: "+hits+" WHONGS: "+wrongs+" total F: "+totalPhrase);
		//alert("Fim dos estudos\nHITS: "+((hits * 100)/totalPhrase).toFixed(2)+ "%\nWRONGS: "+((wrongs * 100)/totalPhrase).toFixed(2)+"%");
		alert("Fim dos estudos\nHITS: "+((hits * 100)/(wrongs + hits)).toFixed(2)+ "%\nWRONGS: "+((wrongs * 100)/(wrongs + hits)).toFixed(2)+"%");
		//switchButton(true, "10000000");
		document.getElementById('score1').textContent = "";
		sequenceWrongs = sequenceWrongs.substr(0,sequenceWrongs.length - 1);
		document.getElementById('comment').value = "Study More: "+ sequenceWrongs;
		//switchButton(true, "1100000010");
		
	}
	
	$('#giveUp').click(function(){
		//alert("Don't built yet!");
		cleanFields();
		showScoreAndFinish();
	});
	

//Função relacionada a seleção dos arquivos.	
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object

    var f = evt.target.files[0]; 
	
	//switchButton(true,"0100000010");

	if (f) {
	  var r = new FileReader();
	  r.onload = function(e) { 
		  contents = e.target.result;
		  /*console.log( "Got the file.n" 
		  +"name: " + f.name + "n"
		  +"type: " + f.type + "n"
		  +"size: " + f.size + " bytesn"
		  + "starts with: " + contents.substr(1, contents.indexOf("?"))
	); */
		  getAmountPhrase();
	  }
	  r.readAsText(f);
	  
	} else { 
	  alert("Failed to load file");
	}
	
  }
//faz parte dos arquivos....
  document.getElementById('fileinput').addEventListener('change', readSingleFile, false);

