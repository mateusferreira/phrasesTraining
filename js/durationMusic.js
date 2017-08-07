function trackSound(valor){
	var tempo = [];
	console.log("CHEGA: "+valor);
	
	var string;
	var num;
		
	string = valor.split(' ').join('');
	console.log("OUT: "+string);
	
	for( i = 0, j = 0; i < 2; i++, j+=15){
			//Horas 
			num = 3600 * parseInt(string.substr(0+j, 2+j));
			
			num += 60 * parseInt(string.substr(3+j, 5+j));
			
			num += parseInt(string.substr(6+j, 8+j));
			
			num =  (num * 1000) + parseInt(string.substr(9+j, 12+j));
			
			//System.out.println("TESTE SUB: "+num);
			tempo[i] = num;
		}
		
		return tempo;
}