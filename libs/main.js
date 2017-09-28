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
//AFFICHER LES FESTIVALS STOCKER EN BASE DE DONNEE
$(function(){
    var allFestival = GetFestivalInBdd();
})

//MODE SANS LOGIN
$(document).on("click","#sansLogin", function(){
    $("#blocLogin").fadeOut(500);
});
//AFFICHAGE CREER COMPTE
$("#creerCompte").click(function(){
    $("#login").css("display","none");
    $("#creerSonCompte").css("display", "flex");
});
//POSITIONNEMENT RECHERCHE
var posTop = $("#utilisateur").position().top;
var posLeft = $("#utilisateur").position().left;
$(function(){
    $("#blocUtilisateur").css("left",posLeft);
    posTop = posTop + 30;
    $("#blocUtilisateur").css("top",posTop);
    $("#blocUtilisateur").hide(0);
});
//CREER COMPTE
$(document).on("click", "#submitCompte", function(){
    $name = $("#newName").val();
    $password = $("#newPassword").val();
    $password2 = $("#confirmPassword").val();
    $password = $.md5($password);
    $password2 = $.md5($password2);
    if($password==$password2){
    creerCompte($name, $password);
    }
    else
    {
        alert("Vos mots de passe ne sont pas pareils, veuillez recommencer");
    }
})
//AFFICHAGE du diplay CREER NOUVEAU FESTIVAL
$("#creerFestival").click(function(){
    $("#form").css("display","flex");
});





//CREER NOUVEAU FESTIVAL
$(document).on("click", "#subFest",function(){ 
    
            var latLng = positionFestival;
            var lat = positionFestival.lat();
            var lng = positionFestival.lng();
            var title = $("#festName").val();
            if(title){
            var type = festival.$type.val();
            var dateDebut = $("#dateDebut").val();
            var dateFin = $("#dateFin").val();
            var bon = dates.validerDateSaissie(dateDebut,dateFin);
            if (bon == true){
                var marker = festival.addMarker( latLng, title, type, dateDebut, dateFin );
                var debut = dates.toEnglishDate(dateDebut);
                var fin = dates.toEnglishDate(dateFin);
                addMarkerInBdd(lat, lng , title, type, debut, fin);
                $("#festName").val("");
                $("#dateDebut").val("");
                $("#dateFin").val("");
                $("#gpsCoords").val("");
                $("#form").css("display","none");
            }
            else{
                alert("Manque des donnéées");
            }
        
    }
    else{
        alert("le nom n'est pas remplis");
    }
        
    });
};