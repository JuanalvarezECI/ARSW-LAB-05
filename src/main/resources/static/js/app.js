var modulo = (function(){
    var _author;
    var _bluePrints = [];
    var _modulo = apimock;

    var getBluePrintsByAuthor = function(){
        _bluePrints = [];
        $("#idTableBluePrints > tbody").empty(); //elimina todos los nodos secundarios y el contenido de los elementos seleccionados.
        _author = document.getElementById("inputAuthor").value;
        setAuthorBluePrint(_author);
        setBlueprints(_author);
    }

    var setAuthorBluePrint = function(nameBluePrint){
        $("#idNameBluePrintTitulo").text(nameBluePrint + "´s blueprints:")
    }

    var setBlueprints = function(author){
        _modulo.getBlueprintsByAuthor(author, _getNameAndSize)
    }

    var _getNameAndSize = function(blueprintsArray){
        _blueprints = blueprintsArray.map(blueprint => [blueprint.name, blueprint.points.length]);
        _setTable(_blueprints);
    }

    var _setTable = function(blueprintsArray){
        console.log(blueprintsArray[0])
        blueprintsArray.map(blueprint => $("table tbody").append("<tr><td>"+ (blueprintsArray.indexOf(blueprint)+1) +"</td><td>" + blueprint[0] + "</td><td>" + blueprint[1] + "</td><td><button type='button' class='btn btn-outline-success' id="+blueprint[0] +" "+ "type='button' onclick=modulo.getBluePrintToShow(this)>Open</button></td></tr>"));
        var numArray = blueprintsArray.map(blueprint => blueprint[1]);
        $("#totalPoints").text(" Total user points: " + numArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0));
    }

    var getBluePrintToShow = function(button){
        idBlueprint = button.id;
        setnameBlueprint(idBlueprint)
        _modulo.getBlueprintsByNameAndAuthor(_author,idBlueprint,_drawInCanvas);
    }

    var _drawInCanvas = function(pointsOne){
        var canvas = document.getElementById('idCnavas');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); // Inicia una nueva ruta al vaciar la lista de subrutas.
        //Dibujando lineas de acuerdo a lso puntos
        ctx.moveTo(pointsOne.points[0].x, pointsOne.points[0].y); //Arranca desde el primer punto

        for(var i = 1; i < pointsOne.points.length; i++){
            ctx.lineTo(pointsOne.points[i].x, pointsOne.points[i].y);
        }

        //ctx.lineTo(pointsOne.points[0].x, pointsOne.points[0].y);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    var setnameBlueprint = function(nameBluePrint){
        $("#idCurrentBluePrint").text("Current Blueprint: "+ nameBluePrint)
    }

    return{
        getBluePrintsByAuthor:getBluePrintsByAuthor,
        getBluePrintToShow:getBluePrintToShow
    };
})();