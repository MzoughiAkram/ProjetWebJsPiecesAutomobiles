//récupérer des pièces depuis un ficher JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

//Création des balises
for(let i=0; i<pieces.length; i++){
const article = pieces[i];
//var newDiv = document.createElement('div');
//div.className = 'col-4';
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
const categorieElement = document.createElement('p');
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
const descriptionElement = document.createElement('p');
descriptionElement.innerText = article.description ?? "(aucune description)";
const disponibiltéElement = document.createElement('p');
disponibiltéElement.innerText = article.disponibilté;

//Rattachement de nos balises au DOM
const sectionFiches = document.querySelector(".fiches");
//document.body.appendChild(newDiv);

sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(disponibiltéElement);
}

//Création de filtres
//trie moin cher
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function(){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return a.prix-b.prix;
    });

    console.log(piecesOrdonnees);
});
//trie des pièces inférieur ou égale à 35€
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});
//trie des pièces qui ont une description
const boutonDescription = document.querySelector(".btn-description");
boutonDescription.addEventListener("click", function(){
    const piecesDescriptions = pieces.filter(function(p) {
        return p.description;
    });
    console.log(piecesDescriptions);
});
//trie plus cher
const boutonTrie = document.querySelector(".btn-trie");
boutonTrie.addEventListener("click", function(){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return b.prix-a.prix;
    });
    console.log(piecesOrdonnees);
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



