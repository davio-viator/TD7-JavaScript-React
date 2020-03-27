class Borroweds {
    constructor(){
        this.borroweds = [];
        this.callBorroweds();
    }

    callBorroweds(){
        var listborowed = document.getElementById('listeLivresEmpruntes');
        var ajax = new XMLHttpRequest();
        let self = this;
        ajax.onreadystatechange = function(){
            if(this.readyState == 4){
                let respons = JSON.parse(this.responseText);
                respons.forEach(element => {
                    self.borroweds.push({name:element.idLivre,id:element.titreLivre});
                    let borrowed = document.createElement('li');
                    borrowed.id = element.idLivre;
                    borrowed.innerHTML = element.titreLivre;
                    borrowed.addEventListener('click',function(){
                        console.log("object")
                    })
                    listborowed.appendChild(borrowed);
                });
            }
        }
        console.log(this.borroweds);
        ajax.open("GET","./php/routeur.php?action=callBorroweds",true);
        ajax.send(null);
    }

    addAvailable(name){
        //ajout d'un member avec ajax
        this.borroweds = [];
        var ajax = new XMLHttpRequest();
        ajax.open("GET",`./php/routeur.php?action=addAvailable&name=${name}`);
        ajax.send();
        this.callBorroweds();
    }
}