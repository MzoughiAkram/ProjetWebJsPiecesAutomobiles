const article = pieces[0];
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

