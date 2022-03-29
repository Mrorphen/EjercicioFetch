window.addEventListener("load", inicio,false);

function inicio(){
	var boton = document.getElementById("buscar");
	var input = document.getElementById("input");
	var contenerPokemon = document.getElementById("contenerPokemon");

	contenerPokemon.style.display="none";

	buscar.addEventListener("click", (e) => {
		e.preventDefault();
		
		buscarPokemon(input.value.toLowerCase());
		input.value="";

	});

}

function traduceTipo(tipoDato){
	var ingles = new Array("fire","water","flying","grass","poison","fighting","bug","normal","electric","ground","fairy","psychic","rock","steel","ice","ghost","dragon","dark");
	var espa = new Array("Fuego","Agua","Volador","Planta","Veneno","Lucha","Bicho","Normal","Eléctrico","Tierra","Hada","Psíquico","Roca","Acero","Hielo","Fantasma","Dragon","Siniestro");

	console.log(tipoDato);

	for(var i=0; i<espa.length; i++){
		if(tipoDato.toString() == ingles[i]){			
			return espa[i];
		}
	}
}

function traduceStats(nombreStat){
	var statIngles = new Array("hp","attack","defense","special-attack","special-defense","speed");
	var statEspa = new Array("Vida","Ataque","Defensa","Ataque especial","Defensa especial","Velocidad");

	for (var i=0;i<statIngles.length;i++){
		if(nombreStat.toString() == statIngles[i]){
			return statEspa[i];
		}
	}
}


function mostrarStats(idPokemon){
	var arrayStats = idPokemon.stats;	
	var cont = document.getElementById("contenerPokemon");
	var caja = document.createElement("div");
	caja.setAttribute("class","caja")
	var lista = document.createElement("ul");

	for (var i=0;i<arrayStats.length;i++){
		var stat=traduceStats(arrayStats[i].stat.name);
		console.log(arrayStats[i].stat.name);
	lista.insertAdjacentHTML("beforeend",`
		<li><strong>${stat}</strong>: ${arrayStats[i].base_stat}
		</li>`);
	
	console.log(arrayStats[i].stat.name + ": " + arrayStats[i].base_stat);
	}

	caja.appendChild(lista);
	cont.appendChild(caja);

}

function buscarPokemon(valor){
	fetch(`https://pokeapi.co/api/v2/pokemon/${valor}/`)
		.then((response) => response.json())
		.then(data => mostrarDatos(data));
}

function mostrarDatos(pokemon){	
	comprobarNodos();
	var img = document.createElement("img");
	img.src = pokemon.sprites.front_default;

	var numero = document.createElement("span");
	numero.setAttribute("class", "nombrepkm");
	numero.textContent=`#${pokemon.id.toString().padStart(3,0)} ${pokemon.name.toString()}`;

	//tipos
	var tipo = document.createElement("span");
	tipo.setAttribute("class","tipo")
	var tipos = pokemon.types;
	
	//compruebo si tiene 1 tipo o 2 de elemento
	if(tipos.length==2){
		var tipo1 = tipos[0].type.name != null ? traduceTipo(tipos[0].type.name) : "";
		var tipo2 = tipos[1].type.name != null ? traduceTipo(tipos[1].type.name) : "";
		
		tipo.textContent = `Tipo: ${tipo1} / ${tipo2}`;
		

	}else if(tipos.length ==1 ){
		var tipo1 = tipos[0].type.name != null ? traduceTipo(tipos[0].type.name) : "";
		tipo.textContent = `Tipo: ${tipo1}`;
		
	}

	//mostrar contenedor pokemon
	contenerPokemon.style.display="flex";

	//añadir nodos
	contenerPokemon.appendChild(img);
	contenerPokemon.appendChild(numero);
	contenerPokemon.appendChild(tipo);

	mostrarStats(pokemon);
}

function comprobarNodos(){
	contenerPokemon.parentNode.removeChild(contenerPokemon);
	document.getElementById("container").insertAdjacentHTML("beforeend",`
		<div id="contenerPokemon"></div>`);
}



