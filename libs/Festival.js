class Festival {
    
        constructor(){
    
            
            this.$map = $("#map");
            this.$infos = $("#infos");
            this.icon;
            this.$festForm = $("#form");
            this.$festName = $("#festName");
            this.$musiqueType = $("#musiqueType");
            this.$gps = $("#gpsCoords");
            this.$dateStart = $("#dateDebut");
            this.$dateFin = $("#dateFin");
            this.$type = $("#type");

            

            this.markers = [];
            this.noms = [];
            this.main = null;
    
        }
    
        initMap(){
            this.map = new google.maps.Map(this.$map[0], {
                center: {lat: 42.644738, lng: 2.522037},
                zoom: 10
            });
            
            this.main(); 
        }



        addMarker( latLng, title, type, debut, fin ){
            var dates = new Dates();
            
            var img = dates.setTheIcon(debut, fin);
            if(img == true){
                this.icon = "icon/" + type + "2" + ".png";
            }
            else{
                this.icon = "icon/" + type + ".png";
            }
            var marker = new google.maps.Marker({
                position: latLng,
                icon:this.icon,
                map: this.map,
                title: title
            });
            
            marker.type = type;
            
            return marker;
        }

        

        addInfos( content, marker ) {
            var infowindow = new google.maps.InfoWindow({
                content: content
            });
            var that = this;
            marker.addListener("click", function(){
                infowindow.open(that.map, marker);
            });
            
        }

        filter( types ){
                for(var marker of this.markers){
                    marker.setVisible(false);
                        if( marker.type == types ) {
                            marker.setVisible(true);
                        }
                    }
                 }
        
        showAll(){
            for(var marker of this.markers){
                marker.setVisible(true);
            }
        };
        showNone(){
            for(var marker of this.markers){
                marker.setVisible(false);
            }
        };

        showOne(name){
            for(var marker of this.markers){
                
                    if( marker.title == name ) {
                        marker.setVisible(true);
                    }
                }
        }

        showByName(name){
            for(var marker of this.markers){
                marker.setVisible(false);
                    if( marker.title == name ) {
                        marker.setVisible(true);
                        
                    }
                }
        }

        attrapeNom(){
            $("#name").html("<option> </option>");
            this.noms = [];
            for(var marker of this.markers){
                
                var aPusher = marker.title;
                this.noms.push(aPusher);
            }
            for(var y = 0; y < this.noms.length; y++){
                var affiche = "<option value='" + this.noms[y] + "' class='change'>" + this.noms[y] + "</option>";
                $("#name").append(affiche);
            }
            
        }
        
}