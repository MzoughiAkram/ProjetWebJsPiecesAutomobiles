import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

//récupérer des pièces depuis un ficher JSON
//const reponse = await fetch('pieces-autos.json');
//récupérer des pièces depuis un API
const reponse = await fetch('http://localhost:8081/pieces/');
const pieces = await reponse.json();
// on appel la fonction pour ajouter le listener au formulaire
ajoutListenerEnvoyerAvis()

//Création des balises
function genererPieces(pieces){
for(let i=0; i<pieces.length; i++){
    const article = pieces[i];
//var newDiv = document.createElement('div');
//div.className = 'col-4';
    //Rattachement de nos balises au DOM
    const sectionFiches = document.querySelector(".fiches");    
    const pieceElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "(aucune description)";
    const disponibiltéElement = document.createElement("p");
    disponibiltéElement.innerText = article.disponibilté ? "En stock" : "Rupture de stock";
    //Code ajouté
    const avisBouton = document.createElement("button");
    avisBouton.dataset.id = article.id;
    avisBouton.textContent = "Afficher les avis";


//document.body.appendChild(newDiv);
    sectionFiches.appendChild(pieceElement);
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiltéElement);

    //Code aJouté
    pieceElement.appendChild(avisBouton);
    // On rattache la balise article au body
    //document.body.appendChild(pieceElement);
    
    }
    ajoutListenersAvis();
}

/*// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces=>pieces.js());
// Fonction qui génère toute la page web
function genererPieces(pieces){
    for(let i=0; i<pieces.length; i++){
        // Création d’une balise dédiée à une pièce auto
        const pieceElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image;
        pieceElement.appendChild(imageElement);
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;
        pieceElement.appendChild(nomElement);
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix : ${pieces[i].prix} € (${pieces[i].prix<35 ? "€" : "€€€"})`;
        pieceElement.appendChild(prixElement);
        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
        pieceElement.appendChild(categorieElement);
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].description ?? "(aucune description)";
        pieceElement.appendChild(descriptionElement);
        const disponibleElement = document.createElement("p");
        disponibleElement.innerText = pieces[i].disponibilté ? "En stock" : "Rupture de stock";
        pieceElement.appendChild(disponibleElement);
        // On rattache la balise article au body
        document.body.appendChild(pieceElement);


    }
}*/

//premier affichage de la page
genererPieces(pieces);

//Création de filtres
//trie moin cher"pieces-autos.json
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function(){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return a.prix-b.prix;
    });
    // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector('.fiches').innerHTML = "";
    genererPieces(piecesOrdonnees);
    //affichage sur la console
    //console.log(piecesOrdonnees);
});
//trie des pièces inférieur ou égale à 35€
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= 35;
    });
    // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector('.fiches').innerHTML ="";
    genererPieces(piecesFiltrees);
    //affichage sur la console
    //console.log(piecesFiltrees);
});
//trie des pièces qui ont une description
const boutonDescription = document.querySelector(".btn-description");
boutonDescription.addEventListener("click", function(){
    const piecesDescriptions = pieces.filter(function(p) {
        return p.description;
    });
    // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector('.fiches').innerHTML ="";
    genererPieces(piecesDescriptions);
    //affichage sur la console
    //console.log(piecesDescriptions);
});
//trie plus cher
const boutonTrie = document.querySelector(".btn-trie");
boutonTrie.addEventListener("click", function(){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return b.prix-a.prix;
    });
    // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
    document.querySelector('.fiches').innerHTML = "";
    genererPieces(piecesOrdonnees);
    //affichage sur le console
    //console.log(piecesOrdonnees);
});

//Afiicher le nom de toutes les pieces abordables
const noms = pieces.map(piece=>piece.nom);
for(let i=pieces.length-1; i>=0; i--){
    if(pieces[i].prix>35){
        noms.splice(i,1)
    }
}
//création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i<noms.length; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);

}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordable')
.appendChild(abordablesElements)

//Afiicher le nom de toutes les pieces disponibles et leur prix
const nomDispo = pieces.map(piece=>piece.nom)
const prixDispo = pieces.map(piece=>piece.prix)
for(let i=pieces.length-1; i>=0; i--){
    if(pieces[i].disponibilté === false){
        nomDispo.splice(i,1)
        prixDispo.splice(i,1)
    }

}
//création de la liste
const disponibleElement = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i<nomDispo.length; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomDispo[i]} - ${prixDispo[i]}€`;
    disponibleElement.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.disponible')
.appendChild(disponibleElement)

//filtrer à l'aide du range
const Range = document.querySelector('#prixMax');
Range.addEventListener('input', function(){
    const piecesRangers = pieces.filter(function(piece){
        return piece.prix <= Range.value;
        
    });
   
// Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
document.querySelector('.fiches').innerHTML ="";
genererPieces(piecesRangers);
})


//Ajout d'un bouton pour rénitialiser les filtres
const boutonReset = document.querySelector(".btn-reset");
boutonReset.addEventListener("click", function(){
    document.querySelector('.fiches').innerHTML ="";
    genererPieces(pieces);
})
