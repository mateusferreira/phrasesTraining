
	var contents;	
	var faixaMusica;
	var english;
	var translation;
	var numberCurrent;
	var endPhrase;
	var hits;
	var wrongs;
	var totalPhrase;
	var especificPhrasesSelected;
	var totalPhraseInFile;
	
	window.onload = function() {
		window.addEventListener( "keypress", doKeyDown, false);
		switchButton(true, "100000000");
}

	/// habilita ou não os botões
	function switchButton(statusButton, ctrl){
		var nameElements = ["fileinput","btStartTraining","bt1","enviar","nextPhrase","comment","correction","translation","textEspecificPhrases"];//"01000000"
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
					
		var tam = indice.toString();
		var n = contents.indexOf(":>"+indice);
		indice = indice + 1;
		var t = contents.indexOf(":>"+indice);
	
		var fr1 = contents.substr(n+2+tam.length,(t - 2 - tam.length)-n);

		var x1 = fr1.indexOf("\n");
		var musicTrack = fr1.substr(x1+1,fr1.length);
		fr1 = musicTrack;
		//console.log(musicTrack);
		x1 = musicTrack.indexOf("\n");
		musicTrack = musicTrack.substr(0,x1+1);

		//console.log(musicTrack);
		english = fr1.substr(x1+1, fr1.length);
		var x2 = x1;
		x1 = english.indexOf("\n");
		english = english.substr(0,x1+1).trim();

		translation = fr1.substr(x1+x2+2, fr1.length);
		fr1 = translation;
		x1 = translation.substr("\n");
		translation = translation.substr(0,x1+1).trim();
		
		x1 = fr1.indexOf("HELP:>");
		if(x1 != -1)
		{
			//console.log("HELP"+fr1.substr(x1+6,fr1.length)+"fiM");
			document.getElementById('helpWords').value = fr1.substr(x1+6,fr1.length);
		}

		console.log("Music: "+musicTrack);
		console.log("Phrase: "+english);
		console.log("Trad: "+translation);

		faixaMusica = musicTrack.trim();
		
	}

	//Este metodo tem 2 funções: pegar a faixa seleciona pelo botão e obter os dados da frase nas 3 variavesi: faixa, frase e tradução.
	function BackupselectPhrase(indice){
					
		var tam = indice.toString();
		var n = contents.indexOf(":>"+indice);
		indice = indice + 1;
		var t = contents.indexOf(":>"+indice);
	
		var fr1 = contents.substr(n+2+tam.length,(t - 2 - tam.length)-n);

		var x1 = fr1.indexOf("\n");
		var musicTrack = fr1.substr(x1+1,fr1.length);
		fr1 = musicTrack;
		//console.log(musicTrack);
		x1 = musicTrack.indexOf("\n");
		musicTrack = musicTrack.substr(0,x1+1);

		//console.log(musicTrack);
		english = fr1.substr(x1+1, fr1.length);
		var x2 = x1;
		x1 = english.indexOf("\n");
		english = english.substr(0,x1+1).trim();

		translation = fr1.substr(x1+x2+2, fr1.length).trim();

		console.log("Music: "+musicTrack);
		console.log("Phrase: "+english);
		console.log("Trad: "+translation);

		faixaMusica = musicTrack.trim();
		
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
		
		/*if(especificPhrasesSelected == "\0"){
			endPhrase = 0;
			return;
		}*/
		
		//if(especificPhrasesSelected.length > 0){
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
		switchButton(true,"001101000");
		document.getElementById('score1').textContent = "Frase nº "+numberCurrent+"\nWrongs: "+wrongs+"\nHITS: "+hits;
		//console.log("Frase Estudadas: "+totalPhrase );
	});
	
	//Envia a resposta ao usuário, se acertou ou errou.
	$('#enviar').click(function(){
		//console.log("MY F: "+$('#comment').val().length);
		//console.log("OR: "+english.length);
		if($('#comment').val().toUpperCase() == english.toUpperCase()){
			document.getElementById('correction').value = "!!!GOOD JOB!!!";//Frase correta aparecerá.
			hits++;
		}
		else{
			//alert("EN: "+english+"YOUR: "+$('#comment').val());	
			document.getElementById('correction').value = english.toUpperCase();//Frase correta aparecerá.
			wrongs++;
		}
		switchButton(true,"001010000");
		document.getElementById('translation').value = translation;
		document.getElementById('score1').textContent = "Frase nº "+numberCurrent+"\nWrongs: "+wrongs+"\nHITS: "+hits;
	});
	
	//Limpa os campos para a próxima lição.
	$('#nextPhrase').click(function(){
		document.getElementById('translation').value = "";
		document.getElementById('correction').value = "";
		document.getElementById('comment').value = "";
		document.getElementById('helpWords').value = "";
	
		numberCurrent++;
		console.log("Number Current: "+numberCurrent+" endPhrase: "+endPhrase);
		if(numberCurrent > endPhrase)
		{
			console.log("HITS: "+hits+" WHONGS: "+wrongs+" total F: "+totalPhrase);
			alert("Fim dos estudos\nHITS: "+((hits * 100)/totalPhrase).toFixed(2)+ "%\nWRONGS: "+((wrongs * 100)/totalPhrase).toFixed(2)+"%");
			//switchButton(true, "10000000");
			document.getElementById('score1').textContent = "";
			switchButton(true, "110000001");
		}
		else{
			if(document.getElementById('especificPhrases').checked == true)
				organizaPhrasesSelected();
			
			selectPhrase(numberCurrent);
			document.getElementById('score1').textContent = "Frase nº "+numberCurrent+"\nWrongs: "+wrongs+"\nHITS: "+hits;
			switchButton(true,"001101000");
			document.getElementById('comment').focus();
		}
		
	});
	
	//Da o play na faixa selecionada.
	$('#bt1').click(function(){
		var retornaFaixa = trackSound(faixaMusica);
		console.log("INI: "+parseInt(retornaFaixa[0]));
		console.log("END: "+parseInt(retornaFaixa[1]));
		
		var tx2 = parseInt(retornaFaixa[1]) - parseInt(retornaFaixa[0]);
		//console.log("TX2 "+tx2);
		
		var element = document.getElementById("myVideo");
	
	element.play(); 
	element.currentTime = parseInt(retornaFaixa[0])/1000;
	//element.currentTime = 9.8;
	
	var myvar;
	//myvar = setInterval(function(){pausar(element,myvar)},4700);
	myvar = setInterval(function(){pausar(element,myvar)},tx2);
	
	});
	
	//Função interna utilizada para parar a execução do áudio no tempo certo.
	function pausar(som, x){
		som.pause();
		//console.log("Sei la");
		som.currentTime = 0.0;
		clearInterval(x);//limpa o looping
	}

//Função relacionada a seleção dos arquivos.	
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object

    var f = evt.target.files; 
	
	if(f.length < 2 || f.lenght > 2){
		alert("Please Select 2 (Two) files only");
		switchButton(true, "100000000");
		return;
	}
	else switchButton(true,"010000001");
	var outputMusic;
	var outputText;
	
	if(f[0].type == "audio/mp3"){
		outputMusic = 0;
		outputText = 1;
	}
	else if(f[1].type == "audio/mp3"){
		outputMusic = 1;
		outputText = 0;
	}
	//alert("F : "+f[0].type);
	//if (f[0].type == ){
		var blob = window.URL || window.webkitURL;
		if (!blob) {
			console.log('Your browser does not support Blob URLs :(');
			return;           
		}
		
        fileURL = blob.createObjectURL(f[outputMusic]);
        /*console.log(f[outputMusic]);
        console.log('File name: '+f[outputMusic].name);
        console.log('File type: '+f[outputMusic].type);
        console.log('File BlobURL: '+ fileURL);*/
        document.getElementById('myVideo').src = fileURL;
		
	//}
	//else{
		if (f[outputText]) {
		  var r = new FileReader();
		  r.onload = function(e) { 
			  contents = e.target.result;
			  getAmountPhrase();
		  }
		  r.readAsText(f[outputText]);
		  
		  //console.log("TEXT TYPE: "+f[outputText].type);// type: text/plain
		} else { 
		  alert("Failed to load file");
		}
	//}
  }
//faz parte dos arquivos....
  document.getElementById('fileinput').addEventListener('change', readSingleFile, false);

