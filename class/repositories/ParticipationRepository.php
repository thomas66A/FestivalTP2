<?php
class ParticipationRepository extends Repository{

    function newParticipation($idUtilisateur, $idFestival){
        $query = $this->connection->prepare("INSERT INTO mesFestivals SET festivalId=:festivalId,nameId=:nameId");
        $query->execute(array(
            'festivalId'=>$idFestival,
            'nameId'=>$idUtilisateur
        ));
        return $this->connection->lastInsertId();
    }

    function getParticipation($idUtilisateur){
        $prepared = $this->connection->prepare("SELECT * FROM mesFestivals WHERE nameId=:nameId");
        $prepared->execute(array(
            "nameId" => $idUtilisateur
        ));
        $result = $prepared->fetchAll(PDO::FETCH_ASSOC);
        
        return $result;
    }
    
}