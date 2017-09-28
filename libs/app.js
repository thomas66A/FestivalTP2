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
            console.log(data);  
            // if(data.success == false){
            //     console.log(data);
            // }
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
            }  
            
        },
        error : function( error){
            console.log(error);
        }
    })
};
