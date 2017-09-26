<?php
class NoteRepository extends Repository{
    
    function getAll(){
        $query = "SELECT * FROM notes";
        $result = $this->connection->query($query);
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        $notes = [];
        foreach($result as $data){
            $notes[] = new Note ( $data );
        }
        return $notes;
    }

    function getNote($id){
        $query = "SELECT * FROM notes WHERE id=$id";
        $result = $this->connection->query($query);
        $result = $result->fetch(PDO::FETCH_ASSOC);
        $note = new Note ( $result );
        return $note;
    }

    function createNote($title, $content){
        $query = $this->connection->prepare("INSERT INTO notes SET title=:title,content=:content");
        $query->execute(array(
            'title'=>$title,
            'content'=>$content
        ));
    }

    function supNote($id){
        $query = $this->connection->prepare("DELETE FROM notes WHERE id=:id");
        $query->execute(array(
            'id'=>$id
        ));
    }

    function updateNote($id, $title, $content){
        $query = $this->connection->prepare("UPDATE notes SET title=:title,content=:content WHERE id=:id");
        $query->execute(array(
            'id'=>$id,
            'title'=>$title,
            'content'=>$content
        ));
    }
}