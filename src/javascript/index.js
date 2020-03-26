let members = new Members();
let availables = new Availables();
let borroweds = new Borroweds();

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

document.querySelectorAll('.member').forEach(element => {
    element.addEventListener('click', function(){
        document.getElementById('shadow').style.display = "block";
        document.getElementById('popMemper').style.display = "block";
    });
});

document.getElementById('shadow').addEventListener('click', function(){
    document.getElementById('popMemper').style.display = "none";
    document.getElementById('popAvailable').style.display = "none";
    document.getElementById('popborrowed').style.display = "none";
    document.getElementById('shadow').style.display = "none";
});