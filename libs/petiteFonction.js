function remettreEnPlace(){
setTimeout(
    function() {
    
    var posTop = $("#utilisateur").position().top;
    var posLeft = $("#utilisateur").position().left;
    $("#blocUtilisateur").css("left",posLeft);
    posTop = posTop + 30;
    $("#blocUtilisateur").css("top",posTop);
    $("#blocUtilisateur").hide(0);

}, 500);
}