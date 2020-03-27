class Availables {
    constructor(){
        this.availables = [];
        this.callAvailables();
    }

    callAvailables(){
        
        var listAvailable = document.getElementById('listeLivresDisponibles');
        var ajax = new XMLHttpRequest();
        let self = this;
        ajax.onreadystatechange = function(){
            if(this.readyState == 4){
                let respons = JSON.parse(this.responseText);
                respons.forEach(element => {
                    self.availables.push({name:element.idLivre,id:element.titreLivre});
                    let available = document.createElement('li');
                    available.id = element.idLivre;
                    available.innerHTML = element.titreLivre;
                    available.addEventListener('click',function(){
                        document.getElementById('popAvailable').style.display = "block";
                        document.getElementById('shadow').style.display = "block";
                    })
                    listAvailable.appendChild(available);
                });
            }
        }
        console.log(this.availables);
        ajax.open("GET","./php/routeur.php?action=callAvailable",true);
        ajax.send(null);
    }

    addAvailable(name){
        //ajout d'un member avec ajax
        this.addAvailable = [];
        var ajax = new XMLHttpRequest();
        ajax.open("GET",`./php/routeur.php?action=addAvailable&name=${name}`);
        ajax.send();
        this.callAvailables();
    }
}