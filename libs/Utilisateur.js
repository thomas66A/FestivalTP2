class Utilisateur{
    constructor( id, name, admin, password, festivalId ){
        this.id = id;
        this.name = name;
        this.admin = admin;
        this.password = password;
        this.festivalId = festivalId; 
    }
    voirMesFestival(){
        return this.name;
    }
    seDeLoguer(){
        for (var key in this){
            this[key]=null;
            $("#seloguer").show();
            $("#UtilisateurParticipe").hide();
            $("#showUtilisateur").hide(); 
            $("#delete").hide();  
            remettreEnPlace();
        }
    }
    setUtilisateur(id, name, admin, password, festivalId){
        this.id = id;
        this.name = name;
        this.admin = admin;
        this.password = password;
        this.festivalId = festivalId;
    }
    
}