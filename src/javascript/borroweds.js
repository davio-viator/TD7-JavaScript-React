class Borroweds {
    constructor(){
        this.borroweds = [];
        this.borrower = [];
        if (localStorage.getItem('borrowed') != null){
            this.initializeBorrowed();
        } else {
            this.callBorroweds();
        }
    }

    initializeBorrowed() {
        var listborowed = document.getElementById('listeLivresEmpruntes');
        let stored = JSON.parse(localStorage.getItem('borrowed'));
        let self = this;
        stored.forEach(element => {
            this.borroweds.push({name:element.idLivre,id:element.titreLivre});
            let borrowed = document.createElement('li');
            borrowed.id = element.idLivre;
            borrowed.innerHTML = element.titreLivre;
            borrowed.addEventListener('click',function(){
                document.getElementById('popBorrowed').style.display = "block";
                document.getElementById('shadow').style.display = "block";
                let borrowed = document.getElementById("borrower");
                        self.getBorrowed(element.idLivre)
                        console.log(self.borrower);
                        borrowed.innerHTML = "Livre prété a "+self.borrower.name;
                
            })
            listborowed.appendChild(borrowed);
        });
    }

    callBorroweds(){
        var listborowed = document.getElementById('listeLivresEmpruntes');
        var ajax = new XMLHttpRequest();
        let self = this;
        ajax.onreadystatechange = function(){
            if(this.readyState == 4){
                let respons = JSON.parse(this.responseText);
                localStorage.setItem('borrowed',this.responseText);
                respons.forEach(element => {
                    self.borroweds.push({name:element.idLivre,id:element.titreLivre});
                    let borrowed = document.createElement('li');
                    borrowed.id = element.idLivre;
                    borrowed.innerHTML = element.titreLivre;
                    borrowed.addEventListener('click',function(){
                        document.getElementById('popBorrowed').style.display = "block";
                        document.getElementById('shadow').style.display = "block";
                        let borrowed = document.getElementById("borrower");
                        self.getBorrowed(element.idLivre)
                        console.log(self.borrower);
                        borrowed.innerHTML = "Livre prété a "+self.borrower.name;
                        
                    })
                    listborowed.appendChild(borrowed);
                });
            }
        }
        console.log(this.borroweds);
        ajax.open("GET","./php/routeur.php?action=callBorroweds",true);
        ajax.send(null);
    }


    getBorrowed(idLivre){
        let ajax = new XMLHttpRequest();
        let self = this;
        ajax.onreadystatechange = function(){
            if(this.readyState == 4){
                self.borrower = [];
                let response = JSON.parse(this.responseText);
                response.forEach(element=>{
                    self.borrower.push({name:element.nomAdherent});
                })
            }
        }
        ajax.open("GET",`./php/routeur.php?action=getBorrower&idLivre=${idLivre}`,false);
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