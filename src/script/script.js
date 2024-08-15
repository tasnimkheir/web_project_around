// Seleciona vários elementos do DOM que serão utilizados no script
const editButton = document.querySelector(".profile__edit-button");
const miPopup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__button-closed");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__description");
const saveButton = document.querySelector(".popup__button-create");
const profileText = document.querySelector(".profile__text");
const profileProfession = document.querySelector(".profile__profession");
const template = document.querySelector(".template-card");
const cardZone = document.querySelector(".elements");
const contenido = template.content;
const buttonAddCard = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#popup-card");
const formCardPopup = document.querySelector(".popup__card-form");
const inputCardTitle = document.querySelector(".popup__card-title");
const inputUrl = document.querySelector(".popup__card-url");
const buttonCloseAddCard = document.querySelector(".popup__card-button-closed");
const popupImage = document.querySelector("#popup-image");
const buttonClosePopupImage = document.querySelector(".popup__image-button-closed");

// Define um array de objetos que representam os cartões iniciais com nome e link da imagem
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Adiciona um evento de clique ao botão de edição do perfil para abrir o popup correspondente
editButton.addEventListener("click", () => {
  openPopup(miPopup);
});

// Adiciona um evento de clique ao botão de fechar o popup de edição do perfil
closeButton.addEventListener("click", () => {
  closePopup(miPopup);
});

// Adiciona um evento de clique ao botão de salvar mudanças no popup de edição do perfil
saveButton.addEventListener("click", saveChanges);

// Adiciona um evento de clique ao botão de adicionar cartão para abrir o popup correspondente
buttonAddCard.addEventListener("click", () => {
  openPopup(cardPopup);
});

// Adiciona um evento de clique ao botão de fechar o popup de adicionar cartão
buttonCloseAddCard.addEventListener("click", () => {
  closePopup(cardPopup);
});

// Função para abrir um popup e adicionar um listener para fechar com a tecla Escape
function openPopup(popup) {
  popup.classList.add("popup__open");
  document.addEventListener("keydown", handleEscapeKey);
}

// Função para fechar um popup e remover o listener da tecla Escape se não houver mais popups abertos
function closePopup(popup) {
  popup.classList.remove("popup__open");
  if (document.querySelectorAll(".popup__open").length === 0) {
    document.removeEventListener("keydown", handleEscapeKey);
  }
}

// Função para tratar o evento de pressionar a tecla Escape para fechar o popup
function handleEscapeKey(evt) {
  console.log(evt);
  if (evt.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup__open");
    openPopups.forEach((popup) => closePopup(popup));
  }
}

// Função para salvar as mudanças do perfil, atualizando os textos e fechando o popup
function saveChanges() {
  profileText.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  closePopup(miPopup);
}

// Função para adicionar um novo cartão à página
function cardAdd(name, link) {
  const card = template.cloneNode(true).content.querySelector(".elements__card");
  const cardImage = card.querySelector(".elements__image");
  const buttonDeleteCard = card.querySelector(".elements__image-trash");
  const cardTitle = card.querySelector(".elements__title");
  const buttonLike = card.querySelector(".elements__image-like");

  // Adiciona eventos de clique aos botões de deletar e curtir cartão
  buttonDeleteCard.addEventListener("click", function () {
    card.remove();
  });
  buttonLike.addEventListener("click", function () {
    buttonLike.classList.toggle("elements__image-like_active");
  });

  // Adiciona um evento de clique na imagem do cartão para abrir o popup de visualização da imagem
  cardImage.addEventListener("click", function () {
    openPopup(popupImage);
    const popupPhoto = popupImage.querySelector(".popup__image-photo");
    const popupTitle = popupImage.querySelector(".popup__image-name");

    popupPhoto.src = link;
    popupTitle.textContent = name;
    cardImage.alt = name;
  });

  cardImage.src = link;
  cardTitle.textContent = name;
  cardImage.alt = name;
  return card;
}

// Adiciona os cartões iniciais à página ao carregar o script
initialCards.forEach(function (element) {
  const newCard = cardAdd(element.name, element.link);
  cardZone.append(newCard);
});

// Adiciona um evento de submit ao formulário de adicionar cartão para criar um novo cartão
formCardPopup.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const cardToAdd = cardAdd(inputCardTitle.value, inputUrl.value);
  cardZone.prepend(cardToAdd);

  closePopup(cardPopup);
});

// Adiciona um evento de clique ao botão de fechar o popup de visualização da imagem
buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});