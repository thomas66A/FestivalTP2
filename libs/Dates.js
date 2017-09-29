class Dates {
    
        constructor(){
    
            
            this.$dateDebut = $("#dateDebut");
            this.$dateFin = $("#dateFin");
            this.$dateDebut1 = $("#dateDebut1");
            this.$dateFin1 = $("#dateFin1");
    
    
            this.initPickers();
    
        }
    
        initPickers(){
    
            var options = {
                dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                dayNamesMin : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
                monthNames : ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
                monthNamesShort : ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
                firstDay : 1,
                minDate : new Date( 2017, 0, 1 ),
                maxDate : new Date( 2018, 11, 31 ),
                dateFormat : "dd/mm/yy",
            };
    
            this.$dateDebut.datepicker( options );
            this.$dateFin.datepicker( options );
            this.$dateDebut1.datepicker( options );
            this.$dateFin1.datepicker( options );
    
        }
        getTimeStamp(ladate){
        var laDate = ladate;
        laDate = laDate.split("-");
        var formaterDate = laDate[0] + "/"+ laDate[1] + "/" + laDate[2];
        return new Date(formaterDate).getTime();
        }

        getTimeStamp2(ladate){
            var laDate = ladate;
            laDate = laDate.split("/");
            var formaterDate = laDate[2] + "/"+ laDate[1] + "/" + laDate[0];
            return new Date(formaterDate).getTime();
            }

        toEnglishDate(ladate){
            var laDate = ladate;
            laDate = laDate.split("/");
            var formaterDate = laDate[2] + "-"+ laDate[1] + "-" + laDate[0];
            return formaterDate;
            }

        toFrenchDate(ladate){
            var laDate = ladate;
            laDate = laDate.split("-");
            var formaterDate = laDate[2] + "/"+ laDate[1] + "/" + laDate[0];
            return formaterDate;
            }
        

        validerDateSaissie(debut, fin){
            var debutStamp = this.getTimeStamp2(debut);
            var finStamp = this.getTimeStamp2(fin);
            if(finStamp<debutStamp)
                {
                    alert("la date de fin doit etre superieure à la date du debut ");
                    return false;
                
                }
            else
                {
                    return true;
                }
        }
        setTheIcon(debut, fin){
            var debutFest = this.getTimeStamp(debut);
            var finFest = this.getTimeStamp(fin);
            var aujourdhui = Date.now();
            if((aujourdhui >= debutFest) && (aujourdhui <= finFest)){
                return true
            }
            else{
                return false;
            }
        }
    }