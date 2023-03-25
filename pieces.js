//récupérer des pièces depuis un ficher JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

//Création des balises
for(let i=0; i<pieces.length; i++){
const article = pieces[i];
//let newDiv = document.createElement('div');
//div.className = 'col-2 bg-secondary';
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
