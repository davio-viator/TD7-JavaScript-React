class Members {

    
    constructor(){
        this.members = [];
        this.currentBooks = []
        this.callMembers();
        
    }

    callMembers(){
        //appel ajax
        var listMember = document.getElementById('listeAdherents');
        var ajax = new XMLHttpRequest();
        let self = this;
        ajax.onreadystatechange = function(){
            if(this.readyState == 4){
                let respons = JSON.parse(this.responseText);
                respons.forEach(element => {
                    self.members.push({name:element.nomAdherent,id:element.idAdherent});
                    let member = document.createElement('li');
                    member.id = element.idAdherent;
                    member.innerHTML = element.nomAdherent;
                    member.addEventListener('click',function(){
                        document.getElementById('shadow').style.display = "block";
                        let popMember = document.getElementById('popMemper');
                        popMember.style.display = "block";
                        self.getbook(element.idAdherent);
                        popMember.children[0].innerHTML = `${element.nomAdherent} a ${self.currentBooks.length} livre  en ce moment`;
                        let books = self.currentBooks;
                        popMember.children[1].innerHTML = "";
                        books.forEach(element=>{
                            let p = document.createElement('p');
                            p.innerHTML = element.titre;
                        popMember.children[1].appendChild(p);
                        })
                    });
                    listMember.appendChild(member);
                });
            }
        }
        console.log(this.members);
        console.log(this.currentBooks);
        ajax.open("GET","./php/routeur.php?action=callMembers",true);
        ajax.send(null);

        
    }

    addMember(name){
        //ajout d'un member avec ajax
        this.members = [];
        document.getElementById("listeAdherents").innerHTML = "";
        var ajax = new XMLHttpRequest();
        ajax.open("GET",`./php/routeur.php?action=addMember&name=${name}`);
        ajax.send();
        this.callMembers();
    }

    getbook(id){
        let ajax = new XMLHttpRequest();
        let self = this;
        ajax.onreadystatechange = function(){
            if(this.readyState == 4){
                self.currentBooks = [];
                let response = JSON.parse(this.responseText);
                response.forEach(element=>{
                    self.currentBooks.push({titre:element.titreLivre});
                })
            }
        }
        ajax.open("GET",`./php/routeur.php?action=getBooks&idAdherent=${id}`,false);
        ajax.send();
    }

    size(array){
        //console.log(array)
        //console.log(array.lenght)
        let count = 0;
        array.forEach(element=>{
            element = element;
            count ++;
        })
        return count;
    }

    getMemberInfo(){
        
    }
    
}