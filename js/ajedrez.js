$(document).ready(main);


function main(){
  organizarTablero();
  $("#turnos").css("background","url(img/pergamino.png)");
   $("#turnos").css("background-repeat","no-repeat");
   controlarFlujo();

}

function organizarTablero(){
	var casillas=$(".blanca,.negra").droppable({drop:dropCasillas});
	establecerEventos();
}

var turnoBlanca=false;
function controlarFlujo(){
	if(turnoBlanca==false){
	$(".fNegra,.fBlanca").draggable();	
	$(".fNegra").draggable("disable");
	$(".fBlanca").draggable("enable");
	$("#turnos p").fadeOut("fast",function(){$("#turnos p").html("Move the white pieces");
		$("#turnos p").fadeIn("slow");
	 });

	}
	else{
	$(".fNegra,.fBlanca").draggable();	
	$(".fBlanca").draggable("disable");	
	$(".fNegra").draggable("enable");
		$("#turnos p").fadeOut("fast",function(){$("#turnos p").html("Move the black pieces");
		$("#turnos p").fadeIn("slow");
	 });
	
	}
}

function establecerEventos(){
	var ficha =$(".ficha");
	ficha.draggable();
	ficha.mouseup(upFicha);
	ficha.mousedown(downFicha);
	ficha.mouseover(overFicha);
	ficha = $(".peonB");
	ficha.mousedown(downPeon);
	ficha = $(".peonN");
	ficha.mousedown(downPeonNegro);
	ficha = $(".torre");
	ficha.mousedown(downTorre);
	ficha = $(".caballo");
	ficha.mousedown(downCaballo);
	ficha = $(".alfil");
	ficha.mousedown(downAlfil);
	ficha = $(".reina");
	ficha.mousedown(downReina);
	ficha = $(".rey");
	ficha.mousedown(downRey);
}
function downFicha(){
	$(".ficha").css("z-index","100");
	$(this).css("z-index","1000");

}

function dropCasillas(event,ui){
	var  fic = ui.draggable;
	fic.css("position","absolute");
	fic.css("left","0");
	fic.css("top","0");
}

function mostrarInfo(ficha){
		var imagen = $("#info img");
	var nombre = $("#info span");
	var info=$("#info");
	if(ficha.hasClass("peonB")||ficha.hasClass("peonN")){
		imagen.attr("src","img/peon.png");
		nombre.html("Pawn");
		info.css("background","-moz-linear-gradient(#BD1D49, #DE5076)");
		info.css("background","-webkit-linear-gradient(#BD1D49, #DE5076)");
	}
	if(ficha.hasClass("torre")){
		imagen.attr("src","img/torre.png");
		nombre.html("Rook");
		info.css("background","-moz-linear-gradient(#001941, #69A3FF)");
		info.css("background","-webkit-linear-gradient(#001941, #69A3FF)");
	}
	if(ficha.hasClass("caballo")){
		imagen.attr("src","img/caballo.png");
		nombre.html("Knigth");
		info.css("background","-moz-linear-gradient(#009916, #2EFF4D)");
		info.css("background","-webkit-linear-gradient(#009916, #2EFF4D)");

	}
	if(ficha.hasClass("alfil")){
		imagen.attr("src","img/alfil.png");
		nombre.html("Bishop");
		info.css("background","-moz-linear-gradient(#F5B301, #F7D062)");
		info.css("background","-webkit-linear-gradient(#F5B301, #F7D062)");
	}
	if(ficha.hasClass("reina")){
		imagen.attr("src","img/reina.png");
		nombre.html("Queen");
		info.css("background","-moz-linear-gradient(#016BC1, #A8D8FF)");
		info.css("background","-webkit-linear-gradient(#016BC1, #A8D8FF)");
	}
	if(ficha.hasClass("rey")){
		imagen.attr("src","img/rey.png");
		nombre.html("King");
		info.css("background","-moz-linear-gradient(#603CBA, #976EFF)");
		info.css("background","-webkit-linear-gradient(#603CBA, #976EFF)");
	}
}
function overFicha(){
	var ficha = $(this);
	ficha.draggable();

}

function downPeon(){
	unDroppable();
	var ficha = $(this);
	mostrarInfo(ficha);
	var casilla=ficha.parent().attr("id");
	var arr = casilla.split("");
	var columna = arr[0];
	var fila = arr[1];
	fila = parseInt(fila)+1;

	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		habilitada.css("background","red");
		habilitada.droppable({drop:dropPeon});	
		habilitada.droppable({accept:".peonB"});
	
	}

	if(ficha.attr("value")=="false"){
	fila = parseInt(fila)+1;
	habilitada=$("#"+columna+fila);
	var habilitada2=$("#"+columna+[fila-1]);
		if(habilitada.attr("value")=="vacia"&&habilitada2.attr("value")=="vacia"){
			habilitada.css("background","red");
			habilitada.droppable({drop:dropPeon});	
			habilitada.droppable({accept:".peonB"});
		}
		
	}
	

	columna = arr[0];
	fila = arr[1];
	fila = parseInt(fila)+1;
	columna = parseInt(columna)+1;
	habilitada=$("#"+columna+fila);
	var fAux=$("#"+habilitada.attr("id")+ " img");
	

	if(habilitada.attr("value")=="ocupada"&&fAux.hasClass('fNegra')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropPeonKill});	
		habilitada.droppable({accept:".peonB"});
	
	}
		
	
	columna = parseInt(columna)-2;
	habilitada=$("#"+columna+fila);
	fAux=$("#"+habilitada.attr("id")+ " img");
	if(habilitada.attr("value")=="ocupada" &&fAux.hasClass('fNegra')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropPeonKill});	
		habilitada.droppable({accept:".peonB"});
		
	}
}

function dropGeneric(cuadro,ficha,cuadroProc){
	ficha.remove();
	ficha.attr("value","true");
	cuadro.html(ficha);
	cuadro.attr("value","ocupada");
	cuadroProc.attr("value","vacia");
	ficha.draggable();
	ficha.mouseup(upFicha);
	ficha.mousedown(downFicha);
	unDroppable();
}

function dropPeon(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downPeon);
	pregCoronaBlanco(cuadro);
	turnoBlanca=true;
	controlarFlujo();
}
var corAux;
function pregCoronaBlanco(cuadro){
	var id = cuadro.attr("id");
	corAux=id;
	id = id.split("");
	var fil = id[1];
	if(fil=="8"){
		coronaBlanco();
		$("#tablero").css("opacity","0.4");
	}
}
function coronaBlanco(){
	var cor=$("#coronadaB");
	cor.show("slow");
	$("#coronadaB img").mousedown(downCoronaBlanco);

	
}

function downCoronaBlanco(){
	 var c =$("#"+corAux);
	var f = $(this);
	c.html(f);
	establecerEventos();
	$("#coronadaB").hide("slow");
	$("#coronadaB").append("<img src='"+f.attr("src")+"' class='"+f.attr("class")+"'>");
	$("#tablero").css("opacity","1");
	turnoBlanca=true;
}
function dropPeonKill(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	var matada = $("#"+cuadro.attr("id")+" img");
	comprobarMate(matada);
	matada = matada.attr("src");
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downPeon);
	$("#matadas").append("<img src='"+matada+"'>");
	pregCoronaBlanco(cuadro);
	turnoBlanca=true;
	controlarFlujo();
	
}


function downPeonNegro(){
	unDroppable();
	var ficha = $(this);
	mostrarInfo(ficha);
	var casilla=ficha.parent().attr("id");
	var arr = casilla.split("");
	var columna = arr[0];
	var fila = arr[1];
	fila = parseInt(fila)-1;

	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		habilitada.css("background","red");
		habilitada.droppable({drop:dropPeonNegro});	
		habilitada.droppable({accept:".peonN"});
	}

	if(ficha.attr("value")=="false"){
	fila = parseInt(fila)-1;
	habilitada=$("#"+columna+fila);
	var habilitada2=$("#"+columna+[fila+1]);
		if(habilitada.attr("value")=="vacia"&&habilitada2.attr("value")=="vacia"){
			habilitada.css("background","red");
			habilitada.droppable({drop:dropPeonNegro});	
			habilitada.droppable({accept:".peonN"});
		}
		
	}

	columna = arr[0];
	fila = arr[1];
	fila = parseInt(fila)-1;
	columna = parseInt(columna)+1;
	habilitada=$("#"+columna+fila);
	var fAux=$("#"+habilitada.attr("id")+ " img");
	

	if(habilitada.attr("value")=="ocupada"&&fAux.hasClass('fBlanca')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropPeonKillNegro});	
		habilitada.droppable({accept:".peonN"});
	
	}
		
	
	columna = parseInt(columna)-2;
	habilitada=$("#"+columna+fila);
	fAux=$("#"+habilitada.attr("id")+ " img");
	if(habilitada.attr("value")=="ocupada" &&fAux.hasClass('fBlanca')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropPeonKillNegro});	
		habilitada.droppable({accept:".peonN"});
		
	}

}

function dropPeonNegro(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downPeonNegro);
	pregCoronaNegro(cuadro);
	turnoBlanca=false;
	controlarFlujo();
}
var corAux2;
function pregCoronaNegro(cuadro){
	var id = cuadro.attr("id");
	corAux2=id;
	id = id.split("");
	var fil = id[1];
	if(fil=="1"){
		coronaNegro();
		$("#tablero").css("opacity","0.4");
	}
}

function coronaNegro(){
	var cor=$("#coronadaN");
	cor.show("slow");
	$("#coronadaN img").mousedown(downCoronaNegro);

	
}

function downCoronaNegro(){
	var c =$("#"+corAux2);
	var f = $(this);
	c.html(f);
	establecerEventos();
	$("#coronadaN").hide("slow");
	$("#tablero").css("opacity","1");
	$("#coronadaN").append("<img src='"+f.attr("src")+"' class='"+f.attr("class")+"'>");
turnoBlanca=false;
}

function dropPeonKillNegro(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	var matada = $("#"+cuadro.attr("id")+" img");
	comprobarMate(matada);
	matada = matada.attr("src");
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downPeonNegro);
	$("#matadas").append("<img src='"+matada+"'>");
	pregCoronaNegro(cuadro);
	turnoBlanca=false;
	controlarFlujo();
}

function preguntaTorre(habilitada){
	var fAux=$("#"+habilitada.attr("id")+ " img");
	if(fAux.hasClass('fNegra')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropTorreKill});	
		habilitada.droppable({accept:".torreB"});
			
	}
	if(fAux.hasClass('fBlanca')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropTorreKill});	
		habilitada.droppable({accept:".torreN"});
			
	}
}
function habilitarTorre(habilitada){
	habilitada.css("background","blue");
	habilitada.droppable({drop:dropTorre});	
	habilitada.droppable({accept:".torre"});	
}
function downTorre(){
	unDroppable();
	var ficha = $(this);
	mostrarInfo(ficha);
	var casilla=ficha.parent().attr("id");
	var arr = casilla.split("");
	var columna = arr[0];
	var fila = arr[1];
	var habilitada;
	
	var parar=false;
	for(var i=fila;i<=8&&!parar;i++){
		if(i!=fila){
			habilitada=$("#"+columna+i);
			if(habilitada.attr("value")=="vacia"){
				habilitarTorre(habilitada);		
			}
			else{
				parar=true;
				preguntaTorre(habilitada);


			}
		}
	}
var parar2=false;
for(var i=columna;i<=8&&!parar2;i++){
		if(i!=columna){
		habilitada=$("#"+i+fila);
		if(habilitada.attr("value")=="vacia"){
			habilitarTorre(habilitada);	
		}
			else{
			parar2=true;
			preguntaTorre(habilitada);

		}	
		}

}



	var parar3=false;
	for(var i=fila;i>=1&&!parar3;i--){
		if(i!=fila){
		habilitada=$("#"+columna+i);
		if(habilitada.attr("value")=="vacia"){
			habilitarTorre(habilitada);	
		}
		else{
			parar3=true;
			preguntaTorre(habilitada);
		}
		}
	}
var parar4=false;
for(var i=columna;i>=1&&!parar4;i--){
		if(i!=columna){
			habilitada=$("#"+i+fila);
			if(habilitada.attr("value")=="vacia"){
				habilitarTorre(habilitada);	
			}
				else{
					parar4=true;
					preguntaTorre(habilitada);
	
			}	
		}

}

}
function preguntaFlujo(ficha){
	if(ficha.hasClass("fBlanca")){
	turnoBlanca=true;
	controlarFlujo();
	}
	else{
	turnoBlanca=false;
	controlarFlujo();
	}
}
function dropTorre(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downTorre);
	preguntaFlujo(ficha);


}

function dropTorreKill(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	var matada = $("#"+cuadro.attr("id")+" img");
	comprobarMate(matada);
	matada = matada.attr("src");
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downTorre);
	$("#matadas").append("<img src='"+matada+"'>");
	preguntaFlujo(ficha);
}
function preguntaCaballo(habilitada){
	var f = $("#"+habilitada.attr("id")+" img");
		if (f.hasClass("fNegra")){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropCaballoKill});	
		habilitada.droppable({accept:".caballoB"});

	 }
     if(f.hasClass("fBlanca")){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropCaballoKill});	
		habilitada.droppable({accept:".caballoN"});
	 }
}
function habilitarCaballo(habilitada){
	habilitada.css("background","green");
	habilitada.droppable({drop:dropCaballo});	
	habilitada.droppable({accept:".caballo"});
}
function downCaballo(){
	unDroppable();
	var ficha = $(this);
	mostrarInfo(ficha);
	var casilla=ficha.parent().attr("id");
	var arr = casilla.split("");
	var columna = arr[0];
	var fila = arr[1];
	var habilitada;
//Validacion casiillas Superiores
	fila=parseInt(fila)+2;
	columna= parseInt(columna)+1;
	habilitada=$("#"+columna+fila);
	
	if(habilitada.attr("value")=="vacia"){
		habilitarCaballo(habilitada);

	}else{
		preguntaCaballo(habilitada);
	}

	columna= parseInt(columna)-2;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		habilitarCaballo(habilitada);
	}else{
		preguntaCaballo(habilitada);
	}

	fila=parseInt(fila)-1;
	columna= parseInt(columna)-1;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		habilitarCaballo(habilitada);
	}else{
		preguntaCaballo(habilitada);
	}

	columna= parseInt(columna)+4;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		habilitarCaballo(habilitada);
	}else{
		preguntaCaballo(habilitada);
	}


//Validacion casiillas inferiores
	 columna = arr[0];
	 fila = arr[1];

	fila=parseInt(fila)-2;
	columna= parseInt(columna)-1;
	habilitada=$("#"+columna+fila);

	if(habilitada.attr("value")=="vacia"){
		habilitarCaballo(habilitada);
	}else{
		preguntaCaballo(habilitada);
	}
	
	columna= parseInt(columna)+2;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		habilitarCaballo(habilitada);
	}else{
		preguntaCaballo(habilitada);
	}

	fila=parseInt(fila)+1;
	columna= parseInt(columna)+1;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		habilitarCaballo(habilitada);
	}else{
		preguntaCaballo(habilitada);
	}

	columna= parseInt(columna)-4;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		habilitarCaballo(habilitada);
	}else{
		preguntaCaballo(habilitada);
	}




}

function dropCaballo(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downCaballo);
	preguntaFlujo(ficha);
}
function dropCaballoKill(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	var matada = $("#"+cuadro.attr("id")+" img");
	comprobarMate(matada);
	matada = matada.attr("src");
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downCaballo);
	$("#matadas").append("<img src='"+matada+"'>");
	preguntaFlujo(ficha);
}

function preguntaAlfil(habilitada){
	var fAux=$("#"+habilitada.attr("id")+ " img");
	if(fAux.hasClass('fNegra')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropAlfilKill});	
		habilitada.droppable({accept:".alfilB"});
			
	}
	if(fAux.hasClass('fBlanca')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropAlfilKill});	
		habilitada.droppable({accept:".alfilN"});
			
	}
}
function habilitarAlfil(habilitada){
	habilitada.css("background","yellow");
	habilitada.droppable({drop:dropAlfil});	
	habilitada.droppable({accept:".alfil"});
}
function downAlfil(){
	unDroppable();
	var ficha = $(this);
	mostrarInfo(ficha);
	var casilla=ficha.parent().attr("id");
	var arr = casilla.split("");
	var columna = arr[0];
	var fila = arr[1];
	var habilitada;
	
	var parar=false;
	for(var i=1;i<=8&&!parar;i++){
		if(i!=fila){
			columna++;
			fila++;
			habilitada=$("#"+columna+fila);

			if(habilitada.attr("value")=="vacia"){
				habilitarAlfil(habilitada);			
			}
			else{
				parar=true;
				preguntaAlfil(habilitada);

			}
		}
	}
		columna = arr[0];
	 	fila = arr[1];
		var parar2=false;
	for(var i=1;i<=8&&!parar2;i++){
		if(i!=fila){
		columna--;
		fila++;
		habilitada=$("#"+columna+fila);

		if(habilitada.attr("value")=="vacia"){
			habilitarAlfil(habilitada);			
		}
		else{
		parar2=true;
		preguntaAlfil(habilitada);	
		}
		}
	}

		columna = arr[0];
	 	fila = arr[1];
		var parar3=false;
	for(var i=1;i<=8&&!parar3;i++){
		if(i!=fila){
		columna--;
		fila--;
		habilitada=$("#"+columna+fila);

		if(habilitada.attr("value")=="vacia"){
			habilitarAlfil(habilitada);	
		}
		else{
		parar3=true;
		preguntaAlfil(habilitada);	
		}
		}
	}


		columna = arr[0];
	 	fila = arr[1];
		var parar3=false;
	for(var i=1;i<=8&&!parar3;i++){
		if(i!=fila){
		columna++;
		fila--;
		habilitada=$("#"+columna+fila);

		if(habilitada.attr("value")=="vacia"){
			habilitarAlfil(habilitada);			
		}
		else{
		parar3=true;
		preguntaAlfil(habilitada);	
		}
		}
	}



}

function dropAlfil(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downAlfil);
	preguntaFlujo(ficha);

}
function dropAlfilKill(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	var matada = $("#"+cuadro.attr("id")+" img");
	comprobarMate(matada);
	matada = matada.attr("src");
	dropGeneric(cuadro,ficha,cuadroProc);	
	ficha.mousedown(downAlfil);
	$("#matadas").append("<img src='"+matada+"'>");
	preguntaFlujo(ficha);
}

function preguntaReina(habilitada){
	var fAux=$("#"+habilitada.attr("id")+ " img");
	if(fAux.hasClass('fNegra')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropReinaKill});	
		habilitada.droppable({accept:".reinaB"});
			
	}
	if(fAux.hasClass('fBlanca')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropReinaKill});	
		habilitada.droppable({accept:".reinaN"});
			
	}
}
function habilitarReina(habilitada,color){
	habilitada.css("background",color);
	habilitada.droppable({drop:dropReina});	
	habilitada.droppable({accept:".reina"});
}
function downReina(){
	unDroppable();
	var ficha = $(this);
	mostrarInfo(ficha);
	var casilla=ficha.parent().attr("id");
	var arr = casilla.split("");
	var columna = arr[0];
	var fila = arr[1];
	var habilitada;
	
	var parar=false;
	for(var i=fila;i<=8&&!parar;i++){
		if(i!=fila){
		habilitada=$("#"+columna+i);
		if(habilitada.attr("value")=="vacia"){
			habilitarReina(habilitada,"DodgerBlue");			
		}
		else{
			parar=true;
			preguntaReina(habilitada);
		}
		}
	}
var parar2=false;
for(var i=columna;i<=8&&!parar2;i++){
		if(i!=columna){
		habilitada=$("#"+i+fila);
		if(habilitada.attr("value")=="vacia"){
			habilitarReina(habilitada,"DodgerBlue");
		}
			else{
			parar2=true;
			preguntaReina(habilitada);
		}	
		}

}



	var parar3=false;
	for(var i=fila;i>=1&&!parar3;i--){
		if(i!=fila){
		habilitada=$("#"+columna+i);
		if(habilitada.attr("value")=="vacia"){
			habilitarReina(habilitada,"DodgerBlue");	
		}
		else{
			parar3=true;
			preguntaReina(habilitada);
		}
		}
	}
var parar4=false;
for(var i=columna;i>=1&&!parar4;i--){
		if(i!=columna){
		habilitada=$("#"+i+fila);
		if(habilitada.attr("value")=="vacia"){
			habilitarReina(habilitada,"DodgerBlue");		
		}
			else{
			parar4=true;
			preguntaReina(habilitada);
		}	
		}

}


var parar=false;
	for(var i=1;i<=8&&!parar;i++){
		if(i!=fila){
		columna++;
		fila++;
		habilitada=$("#"+columna+fila);

		if(habilitada.attr("value")=="vacia"){
			habilitarReina(habilitada,"DeepSkyBlue");		
		}
		else{
		parar=true;	
		preguntaReina(habilitada);
		}
		}
	}
		columna = arr[0];
	 	fila = arr[1];
		var parar2=false;
	for(var i=1;i<=8&&!parar2;i++){
		if(i!=fila){
		columna--;
		fila++;
		habilitada=$("#"+columna+fila);

		if(habilitada.attr("value")=="vacia"){
			habilitarReina(habilitada,"DeepSkyBlue");		
		}
		else{
		parar2=true;
		preguntaReina(habilitada);	
		}
		}
	}

		columna = arr[0];
	 	fila = arr[1];
		var parar3=false;
	for(var i=1;i<=8&&!parar3;i++){
		if(i!=fila){
		columna--;
		fila--;
		habilitada=$("#"+columna+fila);

		if(habilitada.attr("value")=="vacia"){
			habilitarReina(habilitada,"DeepSkyBlue");			
		}
		else{
		parar3=true;	
		preguntaReina(habilitada);
		}
		}
	}

		columna = arr[0];
	 	fila = arr[1];
		var parar2=false;
	for(var i=1;i<=8&&!parar2;i++){
		if(i!=fila){
		columna++;
		fila--;
		habilitada=$("#"+columna+fila);

		if(habilitada.attr("value")=="vacia"){
		habilitarReina(habilitada,"DeepSkyBlue");		
		}
		else{
		parar2=true;
		preguntaReina(habilitada);	
		}
		}
	}

}

function dropReina(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	dropGeneric(cuadro,ficha,cuadroProc);
	
	ficha.mousedown(downReina);
	preguntaFlujo(ficha);

}

function dropReinaKill(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	var matada = $("#"+cuadro.attr("id")+" img");
	comprobarMate(matada);
	matada = matada.attr("src");
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downReina);
	$("#matadas").append("<img src='"+matada+"'>");
	preguntaFlujo(ficha);
}

function preguntaRey(habilitada){
	var fAux=$("#"+habilitada.attr("id")+ " img");
	if(fAux.hasClass('fNegra')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropReyKill});	
		habilitada.droppable({accept:".reyB"});
			
	}
	if(fAux.hasClass('fBlanca')){
		habilitada.css("background","orange");
		habilitada.droppable({drop:dropReyKill});	
		habilitada.droppable({accept:".reyN"});

			
	}
}

function habilitarRey(habilitada){
		habilitada.css("background","purple");
		habilitada.droppable({drop:dropRey});	
		habilitada.droppable({accept:".rey"});
}

function downRey(){
	unDroppable();
	var ficha = $(this);
	mostrarInfo(ficha);
	var casilla=ficha.parent().attr("id");
	var arr = casilla.split("");
	var columna = arr[0];
	var fila = arr[1];
	
	fila = parseInt(fila)+1;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		 habilitarRey(habilitada);
	}
	else{preguntaRey(habilitada);}

	columna = parseInt(columna)+1;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		 habilitarRey(habilitada);
	}else{preguntaRey(habilitada);}
	columna = parseInt(columna)-2;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		 habilitarRey(habilitada);
	}else{preguntaRey(habilitada);}

	fila = parseInt(fila)-1;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		 habilitarRey(habilitada);
	}else{preguntaRey(habilitada);}

	columna = parseInt(columna)+2;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		 habilitarRey(habilitada);
	}else{preguntaRey(habilitada);}
		fila = parseInt(fila)-1;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		 habilitarRey(habilitada);
	}else{preguntaRey(habilitada);}

	columna = parseInt(columna)-1;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		 habilitarRey(habilitada);
	}else{preguntaRey(habilitada);}

		columna = parseInt(columna)-1;
	habilitada=$("#"+columna+fila);
	if(habilitada.attr("value")=="vacia"){
		 habilitarRey(habilitada);
	}else{preguntaRey(habilitada);}

	if(ficha.hasClass("fBlanca")){
		ennrrocar(habilitada,"1");
	}
	else if(ficha.hasClass("fNegra")){
		ennrrocar(habilitada,"8");
	}
}

function ennrrocar(habilitada,fil){
		//Enrrocar
		
	var anterior=$("#"+6+fil);
	if(anterior.attr("value")=="vacia"){
		habilitada=$("#"+7+fil);
		var torre = $("#"+8+fil);
		torre = $("#"+torre.attr("id")+" img");
		if(habilitada.attr("value")=="vacia"&&torre.hasClass("torre")){
			habilitada.css("background","pink");
			if(torre.hasClass("torreB")){
				habilitada.droppable({drop:dropEnrroqueDer});	
				habilitada.droppable({accept:".reyB"});
			}
			else if(torre.hasClass("torreN")){
				habilitada.droppable({drop:dropEnrroqueDer});	
				habilitada.droppable({accept:".reyN"});
			}

		}
	}

	anterior=$("#"+4+fil);
	if(anterior.attr("value")=="vacia"){
		anterior=$("#"+2+fil);
		if(anterior.attr("value")=="vacia"){
			habilitada=$("#"+3+fil);
			var torre = $("#"+1+fil);
			torre = $("#"+torre.attr("id")+" img");
			if(habilitada.attr("value")=="vacia"&&torre.hasClass("torre")){
				habilitada.css("background","pink");
				if(torre.hasClass("torreB")){
					habilitada.droppable({drop:dropEnrroqueIzq});	
					habilitada.droppable({accept:".reyB"});
				}
				else if(torre.hasClass("torreN")){
					habilitada.droppable({drop:dropEnrroqueIzq});	
					habilitada.droppable({accept:".reyN"});
				}
		}
		}
	}
}



function dropEnrroqueDer(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downRey);
	if(ficha.hasClass("fBlanca")){
		var torre = $("#"+8+1);
		torre.attr("value","vacia");
		torre = $("#"+torre.attr("id")+" img");
	    var casTorre=$("#"+6+1);
	    casTorre.html(torre);
		preguntaFlujo(ficha);
		casTorre.attr("value","vacia");	
	}
	else if (ficha.hasClass("fNegra")){
		var torre = $("#"+8+8);
		torre.attr("value","vacia");
		torre = $("#"+torre.attr("id")+" img");
	    var casTorre=$("#"+6+8);
	    casTorre.html(torre);
		preguntaFlujo(ficha);	
		casTorre.attr("value","vacia");
	}

}
function dropEnrroqueIzq(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downRey);
	if(ficha.hasClass("fBlanca")){
	var torre = $("#"+1+1);
	torre.attr("value","vacia");
	torre = $("#"+torre.attr("id")+" img");
    var casTorre=$("#"+4+1);
    casTorre.html(torre);
	preguntaFlujo(ficha);
	}
	else if (ficha.hasClass("fNegra")){
		var torre = $("#"+1+8);
		torre.attr("value","vacia");
		torre = $("#"+torre.attr("id")+" img");
	    var casTorre=$("#"+4+8);
	    casTorre.html(torre);
		preguntaFlujo(ficha);
	}

}

function dropRey(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downRey);
	preguntaFlujo(ficha);
}
function dropReyKill(event,ui){
	var cuadro = $(this);
	var ficha = ui.draggable;
	var cuadroProc = ficha.parent();
	var matada = $("#"+cuadro.attr("id")+" img");
	comprobarMate(matada);
	matada = matada.attr("src");
	dropGeneric(cuadro,ficha,cuadroProc);
	ficha.mousedown(downRey);
	$("#matadas").append("<img src='"+matada+"'>");
	preguntaFlujo(ficha);
}

function unDroppable(){
	for(var i=1;i<=8;i++){
		for(var k=1;k<=8;k++){
		var cas=$("#"+i+k);
		cas.droppable({accept:"none"});
		

		}	
	}

	$(".blanca").css("background","#AAA");
	$(".negra").css("background","#555");
}


function upFicha(){
	var fic=$(this);
	fic.css("position","absolute");
	fic.css("left",".2em");
	fic.css("top",".2em");

}

function comprobarMate(ficha){
	var ruta=ficha.attr("src");
	if(ruta=="img/reyN.png"){
		$("body").css("opacity","0.5");
		alert("Checkmate, the white chess pieces wins ");
		location.reload();
	}
	if(ruta=="img/reyB.png"){
		$("body").css("opacity","0.5");
		alert("Checkmate, the black chess pieces wins ");
		location.reload();
	}
	
}


