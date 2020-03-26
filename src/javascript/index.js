let members = new Member();
let availables = new Available();
let borroweds = new Borrowed();

document.getElementById('ajouterAdherent').addEventListener('click', function(){
    let input = document.getElementById('nomAdherent');
    if (input.value != ''){
        members.addMember(input.value);
        input.value = '';
    }
});

document.getElementById('ajouterLivre').addEventListener('click', function(){
    let input = document.getElementById('titreLivre');
    if (input.value != ''){
        availables.addAvailable(input.value);
        input.value = '';
    }
});