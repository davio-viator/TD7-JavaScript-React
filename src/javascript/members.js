class Members {
    constructor(){
        this.members = [];
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
                        document.getElementById('popMemper').style.display = "block";
                    });
                    listMember.appendChild(member);
                });
            }
        }
        console.log(this.members);
        ajax.open("GET","./php/routeur.php?action=callMembers",true);
        ajax.send(null);

        
    }

    addMember(name){
        //ajout d'un member avec ajax
        this.members = [];
        var ajax = new XMLHttpRequest();
        ajax.open("GET",`./php/routeur.php?action=addMembers&name=${name}`);
        ajax.send();
        this.callMembers();
    }

    getMemberInfo(){
        
    }
    
}