function creerCompte(name, password){
    $.ajax({
        url : "http://localhost:8888/Festival-TP-WebService/CreerCompte",
        method : "post",
        dataType : "json",
        data : {
            name : name,
            password : password
        },
        success : function(data){
            if(data){ 
            console.log(data);
            if(data.admin == 0){var utilisateur = "Utilisateur: ";}
            else{var utilisateur = "Admin: ";}
            $("#blocLogin").fadeOut(500);
            $("#seloguer").fadeOut(500);
            $("#UtilisateurParticipe").fadeIn(500);
            $("#showUtilisateur").html(utilisateur + data.name);   
            }
            else{
                alert("Ce nom existe déja dans la base de donnée");
            }  
            
        },
        error : function( error){
            console.log(error);
        }
    })
};
function addMarkerInBdd(lat, lng, title, type, debut, fin){
    
    $.ajax({
        url : "http://localhost:8888/Festival-TP-WebService/addMarkerInBdd",
        method : "post",
        dataType : "json",
        data : {
            lat : lat,
            lng : lng,
            title : title,
            type : type,
            debut : debut,
            fin : fin
        },
        success : function(data){
            console.log(data);  
            
        },
        error : function( error){
            console.log(error);
        }
    })
};

function GetFestivalInBdd(){
    
    $.ajax({
        url : "http://localhost:8888/Festival-TP-WebService/GetFestivalInBdd",
        method : "post",
        dataType : "json",
        
        success : function(data){
            for( var data_festival of data ){
                var latLng = new google.maps.LatLng(data_festival.lat, data_festival.lng); 
                var marker = festival.addMarker( latLng, data_festival.title, data_festival.type, data_festival.dateDebut, data_festival.dateFin );
                var debut = dates.toFrenchDate(data_festival.dateDebut);
                var fin = dates.toFrenchDate(data_festival.dateFin);
                var infos = "<div id=\"info\">";
                infos += "<h1>" + data_festival.title + "</h1>";
                infos += "<h3>Type de musique: " + data_festival.type + "</h3>";
                infos += "<h4>Debut du festival: <span id='debut'>" + debut + "</span></h4>";
                infos += "<h4>Fin du festival: <span id='fin'>" + fin + "</h4>";
                infos += "<button class='participe1' id='" + data_festival.title + "'>Participez</button>";
                infos += "<p id='participe2'>J'y participe</p>";
                infos += "<p id='encours'>En cours</p>";
                infos += "</div>";
                festival.addInfos( infos, marker );
            } 
            
            
        },
        error : function( error){
            console.log(error);
        }
    })
};
function getFestivalEnCours(){
    $.ajax({
        url : "http://localhost:8888/Festival-TP-WebService/GetFestivalInBdd",
        method : "post",
        dataType : "json",
        
        success : function(data){
            
        for( var data_festival of data ){
        var title = data_festival.title;
        var dateDebutFestival = data_festival.dateDebut;
        var dateFinFestival = data_festival.dateFin;   
        var stampDebutFestival = dates.getTimeStamp(dateDebutFestival);
        var stampFinFestival = dates.getTimeStamp(dateFinFestival);
        var aujourdhui = Date.now();
        if((aujourdhui >= stampDebutFestival) && (aujourdhui <= stampFinFestival)) {

              festival.showOne(title);
             }
        }
        },
        error : function( error){
        console.log(error);
        }

        })
};
function myPeriodeFestival(dateDebutUtilisateur, dateFinUtilisateur){
    $.ajax({
        url : "http://localhost:8888/Festival-TP-WebService/GetFestivalInBdd",
        method : "post",
        dataType : "json",
        
        success : function(data){
            
        for( var data_festival of data ){
        var title = data_festival.title;
        var dateDebutFestival = data_festival.dateDebut;
        var dateFinFestival = data_festival.dateFin;   
        var stampDebutUtilisateur = dates.getTimeStamp2(dateDebutUtilisateur);
        var stampFinUtilisateur = dates.getTimeStamp2(dateFinUtilisateur);
        var stampDebutFestival = dates.getTimeStamp(dateDebutFestival);
        var stampFinFestival = dates.getTimeStamp(dateFinFestival);

        if((stampDebutFestival <= stampFinUtilisateur) && (stampFinFestival >= stampDebutUtilisateur)) {

        festival.showOne(title);
        }
        }
        },
        error : function( error){
        console.log(error);
        }

        })
};
