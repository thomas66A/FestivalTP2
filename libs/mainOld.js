
$("#creerFestival").click(function(){
    $("#form").css("display","flex");
});

var posTop = $("#utilisateur").position().top;
var posLeft = $("#utilisateur").position().left;
$(function(){
    $("#blocUtilisateur").css("left",posLeft);
    posTop = posTop + 30;
    $("#blocUtilisateur").css("top",posTop);
    $("#blocUtilisateur").hide(0);
});




var festival = new Festival();
var dates = new Dates();
var positionFestival = {};
festival.main = function(){
    var position = []; 
festival.map.addListener("click", function (event) {
        if($("#form").css("display") == "flex"){
            var gps = $("#gpsCoords");
            var pos = event.latLng;    
            gps.val(pos);
            positionFestival = pos;
            
        }
    });
    $(function(){
        if(localStorage.getItem("festival")){
            var festival_json = localStorage.getItem("festival");
            var lesFestival = JSON.parse(festival_json);
            //console.log(lesFestival);
            for(var i = 0; i<lesFestival.length ; i++)
                {   var x=0;
                    for(var key in lesFestival[i]){
                        if(x==0){
                            var lat = lesFestival[i][key]["lat"];
                            var lng = lesFestival[i][key]["lng"];    
                            var latLng = new google.maps.LatLng(lat,lng);   
                        }
                        if(x==1){
                            var title = lesFestival[i][key];
                        }
                        if(x==2){
                            var type = lesFestival[i][key];    
                        }
                        if(x==3){
                            var infos = lesFestival[i][key];    
                        }
                        if(x==4){
                            var dateDebut = lesFestival[i][key];    
                        }
                        if(x==5){
                            var dateFin = lesFestival[i][key];    
                        }
                        x++;
                        
                    }
                    
                    var marker = festival.addMarker( latLng, title, type, dateDebut, dateFin );
                    festival.addInfos( infos, marker );    
                }
        }

        
        festival.attrapeNom();
    });

};  
    
$("#subFest").click(function(){ 

        var latLng = positionFestival;
        var title = $("#festName").val();
        if(title){
        var type = festival.$type.val();
        var dateDebut = $("#dateDebut").val();
        var dateFin = $("#dateFin").val();
        var bon = dates.validerDateSaissie(dateDebut,dateFin);
        if (bon == true){
        var marker = festival.addMarker( latLng, title, type, dateDebut, dateFin );
        // var infos = "<div id=\"info\">";
        // infos += "<h1>" + title + "</h1>";
        // infos += "<h3>Type de musique: " + type + "</h3>";
        // infos += "<h4>Debut du festival: <span id='debut'>" + dateDebut + "</span></h4>";
        // infos += "<h4>Fin du festival: <span id='fin'>" + dateFin + "</h4>";
        // infos += "<button class='participe1' id='" + title + "'>Participez</button>";
        // infos += "<p id='participe2'>J'y participe</p>";
        // infos += "<p id='encours'>En cours</p>";
        // infos += "</div>";
        festival.addInfos( infos, marker );
        var toStorage = [];
        var stockage  = {
            latLng : latLng,
            title : title,
            type : type,
            infos : infos,
            dateDebut : dateDebut,
            dateFin : dateFin
          };
          if( localStorage.getItem('festival') ){
            toStorage = JSON.parse(localStorage.getItem('festival'));
          }
          toStorage.push(stockage);
          localStorage.setItem('festival', JSON.stringify(toStorage));
        $("#festName").val("");
        $("#dateDebut").val("");
        $("#dateFin").val("");
        $("#gpsCoords").val("");
        $("#form").css("display","none");
        festival.attrapeNom();
        festival.showAll();
        }
            }
            else{
                alert("le nom n'est pas remplis");
            }
        });

$(".butType").click(function(){
            var type = $(this).attr("id");
            festival.filter(type);
        });



$("#afficheFestivals").click(function(){
    festival.showAll();
});
$("#utilisateur").click(function(){
    $("#blocUtilisateur").fadeToggle(300);
});

$(document).on("change", "#name", function(){
    var name = $("#name").val();
    festival.showByName(name);
    $("#blocUtilisateur").fadeOut(300);
})
$(document).on("click", ".participe1", function(){
    var titre = $(this).parent().children('h1').html();
    $(this).parent().css("background-color","green");
    $(this).parent().css("color","white");
    $(this).css("display", "none");
    $(this).parent().children("#participe2").css("display", "block");
})

$(".butType2").click(function(){
    festival.showNone();
    
    if(localStorage.getItem("festival")){
        var festival_json = localStorage.getItem("festival");
        var lesFestival = JSON.parse(festival_json);
        
        for(var i = 0; i<lesFestival.length ; i++)
            {   var x=0;
                for(var key in lesFestival[i]){
                    
                    if(x==1){
                        var title = lesFestival[i][key];
                    }
                    if(x==4){
                        var dateDebutFestival = lesFestival[i][key];    
                    }
                    if(x==5){
                        var dateFinFestival = lesFestival[i][key];    
                    }
                    x++;
                    
                }
               
                   
                   var stampDebutFestival = dates.getTimeStamp(dateDebutFestival);
                   var stampFinFestival = dates.getTimeStamp(dateFinFestival);
                   var aujourdhui = Date.now();
                   if((aujourdhui >= stampDebutFestival) && (aujourdhui <= stampFinFestival)) {

                        festival.showOne(title);
                   }
            }
    }
})

$(document).on("click", "#loadDate", function(){
    var dateDebutUtilisateur = $("#dateDebut1").val();
    var dateFinUtilisateur = $("#dateFin1").val();
    var bon = dates.validerDateSaissie(dateDebutUtilisateur, dateFinUtilisateur);
    if(bon == true){
        festival.showNone();
        $("#blocUtilisateur").fadeOut(300);
        if(localStorage.getItem("festival")){
            var festival_json = localStorage.getItem("festival");
            var lesFestival = JSON.parse(festival_json);
            
            for(var i = 0; i<lesFestival.length ; i++)
                {   var x=0;
                    for(var key in lesFestival[i]){
                        
                        if(x==1){
                            var title = lesFestival[i][key];
                        }
                        if(x==4){
                            var dateDebutFestival = lesFestival[i][key];    
                        }
                        if(x==5){
                            var dateFinFestival = lesFestival[i][key];    
                        }
                        x++;
                        
                    }
                   
                       var stampDebutUtilisateur = dates.getTimeStamp(dateDebutUtilisateur);
                       var stampFinUtilisateur = dates.getTimeStamp(dateFinUtilisateur);
                       var stampDebutFestival = dates.getTimeStamp(dateDebutFestival);
                       var stampFinFestival = dates.getTimeStamp(dateFinFestival);

                       if((stampDebutFestival <= stampFinUtilisateur) && (stampFinFestival >= stampDebutUtilisateur)) {

                            festival.showOne(title);
                       }
                }
        }
    }


});