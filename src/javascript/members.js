class Members {
    constructor(){
        this.members = [];
        if (localStorage.getItem("members") != null){
            this.initializeMembers();
        } else {
            this.callMembers();
        }
        this.currentBooks = [];
    }

    initializeMembers(){
        console.log('appel du local storage');
        var listMember = document.getElementById('listeAdherents');
        let myjson = JSON.parse(localStorage.getItem('members'));
        myjson.forEach(element => {
            this.members.push({name:element.nomAdherent,id:element.idAdherent});
            let member = document.createElement('li');
            member.id = element.idAdherent;
            member.innerHTML = element.nomAdherent;
            member.addEventListener('click',function(){
                document.getElementById('shadow').style.display = "block";
                let popMember = document.getElementById('popMemper');
                popMember.style.display = "block";
                popMember.children[0].innerHTML = `${element.nomAdherent} a livre ${self.getbook(element.idAdherent).lenght} en ce moment`;
                popMember.children[1].innerHTML="test";
            });
            listMember.appendChild(member);
        });
        console.log(this.members);
    }


    callMembers(){
        //appel ajax
        var listMember = document.getElementById('listeAdherents');
        var ajax = new XMLHttpRequest();
        let self = this;
        ajax.onreadystatechange = function(){
            if(this.readyState == 4){
                let respons = JSON.parse(this.responseText);
                localStorage.setItem('members',this.responseText);
                respons.forEach(element => {
                    self.members.push({name:element.nomAdherent,id:element.idAdherent});
                    let member = document.createElement('li');
                    member.id = element.idAdherent;
                    member.innerHTML = element.nomAdherent;
                    member.addEventListener('click',function(){
                        document.getElementById('shadow').style.display = "block";
                        let popMember = document.getElementById('popMemper');
                        popMember.style.display = "block";
                        popMember.children[0].innerHTML = `${element.nomAdherent} a livre ${self.getbook(element.idAdherent).lenght} en ce moment`;
                        popMember.children[1].innerHTML="test";
                    });
                    listMember.appendChild(member);
                });
            }
        }
        console.log(this.members);
        console.log(document.getElementById('popMemper').children);
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
        let self = this;
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(this.readyState ==4){
                let response = JSON.parse(this.responseText);
                response.forEach(element=>{
                    self.currentBooks.push(element);
                })
            }
        }
        ajax.open("GET",`./php/routeur.php?action=getBooks&idAdherent=${id}`,true);
        ajax.send();
        console.log(this.currentBooks.lenght)
        return this.currentBooks;
    }

    getMemberInfo(){
        
    }
    
}