var festival = new Festival();
var mesFestivals = new Festival();
var dates = new Dates();
var user = new Utilisateur();
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
    GetFestivalInBdd();    
})
//MODE SANS LOGIN
$(document).on("click","#sansLogin", function(){
    $("#blocLogin").fadeOut(500);
});
//showLoginBox
$("#seloguer").click(function(){
    $("#blocLogin").fadeIn(500);
})
//LOGIN
$("#submitLogin").click(function(){
    $name = $("#name").val();
    $pass = $("#password").val();
    $pass = $.md5($pass);
    login($name, $pass);
});
//SE DELOGUER
$("#delete").click(function(){    
    user.seDeLoguer();
    $("#creerFestival").hide();
    $("#form").css("display","none");
    $("#seCreer").show();
    festival.showAll();
})
//AFFICHAGE CREER COMPTE
$("#creerCompte").click(function(){
    $("#login").css("display","none");
    $("#creerSonCompte").css("display", "flex");
});
//CREER COMPTE2
$("#seCreer").click(function(){
    $("#blocLogin").fadeIn(500);
    $("#login").css("display","none");
    $("#creerSonCompte").css("display", "flex");
})
//ABANDON
$("#abandont").click(function(){
    $("#login").css("display","flex");
    $("#creerSonCompte").css("display", "none");
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
            if($("#gpsCoords").val()){
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
                positionFestival={};
                var infos = "<div id=\"info\">";
                infos += "<h1>" + title + "</h1>";
                infos += "<h3>Type de musique: " + type + "</h3>";
                infos += "<h4>Debut du festival: <span id='debut'>" + dateDebut + "</span></h4>";
                infos += "<h4>Fin du festival: <span id='fin'>" + dateFin + "</h4>";
                infos += "<button class='participe1' id='" + title + "'>Participez</button>";
                infos += "<p id='participe2'>J'y participe</p>";
                infos += "<p id='encours'>En cours</p>";
                infos += "</div>";
                festival.addInfos( infos, marker );
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
}
    else{
        alert("Vous n'avez pas possitionner le festival");
    }
    
    });
//AFFICHER PAR TYPE DE MUSIQUE
$(document).on("click", ".butType", function(){

    
    var type = $(this).attr("id");
    festival.filter(type);
});
//AFFICHE TOUS LES FESTIVALS
$("#afficheFestivals").click(function(){
    festival.showNone();
    festival.detruireObjet();
    GetFestivalInBdd();
});
//MONTRE UN FESTIVAL APRES UNE RECHERCHE PAR NOM

$(document).on("change", "#nameFest", function(){
    var name = $("#nameFest").val();
    festival.showByName(name);
    $("#blocUtilisateur").fadeOut(300);
})
//AFFICHE LES NOMS DES FESTIVALS DANS LE BLOC RECHERCHE
$("#utilisateur").click(function(){
    $("#blocUtilisateur").fadeToggle(300);
    festival.attrapeNom();
    
});
//AFFICHE LES FESTIVALS EN COURS
$(".butType2").click(function(){
    festival.showNone();
    getFestivalEnCours();     
})

//AFFICHE LES FESTIVALS PENDANT LA PERIODE DE VISITE DE L'UTILISATEUR
$(document).on("click", "#loadDate", function(){
    var dateDebutUtilisateur = $("#dateDebut1").val();
    var dateFinUtilisateur = $("#dateFin1").val();
    var bon = dates.validerDateSaissie(dateDebutUtilisateur, dateFinUtilisateur);
    if(bon == true){
        festival.showNone();
        myPeriodeFestival(dateDebutUtilisateur, dateFinUtilisateur);        
    }
});

//VALIDER UNE PARTICIPATION A UN FESTIVAL
$(document).on("click", ".participe1", function(){
    if(user.name){
    $title =  $(this).parent().children('h1').html();
    $idUtilisateur = user.id;
    jyParticipe($title, $idUtilisateur);
    $(this).hide();
    }
    else{
        alert("Vous devez être logué pour participer");
    }
})



    //AFFICHE LES FESTIVALS AUQUEL L'UTILISATEUR LOGUE PARTICIPE
$(document).on("click","#UtilisateurParticipe",function(){
    if(user.name){
        $idUtilisateur = user.id;
        festival.showNone();
        
        
        montrerMesParticipations($idUtilisateur);
        
    }
    
})
}

