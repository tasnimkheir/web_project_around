import blackHeart from "../images/blackheart.png";
import heart from "../images/Coração.png";

export default class Card {
  constructor(title, link, cardTemplate, handleCardClick) {
    this._title = title;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplate).content;
    const cardElement = cardTemplate
      .querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this.cardElement = this._getTemplate();
    this._setEventListeners();

    this.cardElement.querySelector(".elements__image").src = this._link;
    this.cardElement.querySelector(
      ".elements__image"
    ).alt = `imagem do ${this._title}`;
    this.cardElement.querySelector(".elements__title").textContent =
      this._title;

    return this.cardElement;
  }

  _likeButton() {
    this.cardElement
      .querySelector(".elements__heart")
      .addEventListener("click", (e) => {
        //event.target.classList.toggle("elements__heart_active");
        const likeButton = e.target;
        if (likeButton.getAttribute("src") === blackHeart) {
          return likeButton.setAttribute("src", heart);
        }

        return likeButton.setAttribute("src", blackHeart);
      });
  }

  _trashButton() {
    this.cardElement
      .querySelector(".elements__trash-button")
      .addEventListener("click", (e) => {
        const card = e.target.closest(".elements__item");

        card.remove();
      });
  }

  _imageButton() {
    this.cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._title);
      });
  }

  _setEventListeners() {
    this._likeButton();
    this._trashButton();
    this._imageButton();
  }
}
