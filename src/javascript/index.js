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

document.getElementById('shadow').addEventListener('click', function(){
    document.getElementById('popMemper').style.display = "none";
    document.getElementById('popAvailable').style.display = "none";
    document.getElementById('popBorrowed').style.display = "none";
    document.getElementById('shadow').style.display = "none";
    document.getElementById('inputAvailable').value = '';
});

document.getElementById('okMember').addEventListener('click', function(){
    document.getElementById('popMemper').style.display = "none";
    document.getElementById('shadow').style.display = "none";
});

document.getElementById('okAvailable').addEventListener('click', function(){
    document.getElementById('popAvailable').style.display = "none";
    document.getElementById('shadow').style.display = "none";
});

document.getElementById('cancelAvailable').addEventListener('click', function(){7
    document.getElementById('popAvailable').style.display = "none";
    document.getElementById('shadow').style.display = "none";
    document.getElementById('inputAvailable').value = '';
});

document.getElementById('okBorrowed').addEventListener('click', function(){
    document.getElementById('popBorrowed').style.display = "none";
    document.getElementById('shadow').style.display = "none";
});

document.getElementById('cancelBorrowed').addEventListener('click', function(){
    document.getElementById('popBorrowed').style.display = "none";
    document.getElementById('shadow').style.display = "none";
});