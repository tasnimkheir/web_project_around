import Api from "./scripts/api.js";
import "./pages/index.css";
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import {
  closeAll,
  handleEsc,
  initialCards,
  btnEdit,
  formProfile,
  btnAdd,
  elementArea,
  formElements,
  popups,
  avatarBtn,
  formAvatar,

} from "./scripts/utils.js";
import UserInfo from "./scripts/UserInfo.js";
import PopupWithConfirmation from "./scripts/PopupWithConfirmation.js";

const userInfo = new UserInfo({
  name: ".profile__info",
  about: ".profile__title",
  avatar: ".profile__avatar",
});



const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
  headers: {
    authorization: " b3a308ed-c246-4b89-8cdf-bac76edb874d",
    "Content-Type": "application/json",
  },
});

//Initial cards logic
api.getUserInfo().then((result) => {
  userInfo.setUserInfo(result);

  api.getInitialCards().then((result) => {
    const cardList = new Section(
      {
        items: result,
        renderer: (item) => {
          const cards = new Card(
            item,

            () => {
              popupPicture.handleCardClick(item.name, item.link);
            },
            userInfo._userId,
            () => {
              popupWithConfirmation.open(item._id);
            },
            () => api.addLike(item._id),
            () => api.removeLike(item._id)
          );
          const cardElement = cards.generateCard();

          cardList.addItem(cardElement);
        },
      },
      elementArea
    );

    cardList.renderItems();
  });
});

// Add cards logic
const popupAddCard = new PopupWithForm("#popup-add", (input) => {
  console.log(input);
  if (input.link){
    api.addcards(input).then((result) => {
      const newCard = new Card(
        result,
        () => {
          popupPicture.handleCardClick(item.name, item.link);
        },

        userInfo._userId,
        () => {
          popupWithConfirmation.open(result._id);

        },

        (cardId) => api.addLike(cardId),
        (cardId) => api.removeLike(cardId)
      );
      const newCardElement = newCard.generateCard();
      elementArea.prepend(newCardElement);
      popupAddCard.close();
    });
  }

});

//popup profile
const popupProfile1 = new PopupWithForm("#popup-profile", (inputs) => {
  api.editProfile(inputs).then((result) => {
    userInfo.setUserInfo(result);
    popupProfile1.close();
  });
});
popupProfile1.setEventListeners();

//popup Avatar
const popupAvatarProfile = new PopupWithForm(
  "#popup-avatar-profile",
  (inputs) => {
    api.editAvatarProfile(inputs).then((result) => {
      userInfo.setUserInfo(result);
      popupAvatarProfile.close();
    });
  }
);
popupAvatarProfile.setEventListeners();


//popup image
const popupPicture = new PopupWithImage("#popup-img");
popupPicture.setEventListeners();

//popup confirmation
const popupWithConfirmation = new PopupWithConfirmation(
  "#popup-delete-confirmation",
  (cardToDelete) => {
    api.deleteCard(cardToDelete).then(() => {
      popupWithConfirmation.close();
      const card = document.querySelector(`#id_${cardToDelete}`);
      if (card){
        card.remove();
      }
    });
  }
);
popupWithConfirmation.setEventListeners();

// Eventlistener of edit button
btnEdit.addEventListener("click", function () {
  popupProfile1.open();
  popupProfile1.getUserInfo;
  validateForm1.enableValidation();

});
// Eventlistener of avatar button
avatarBtn.addEventListener("click", function () {
  popupAvatarProfile.open();
});

// Eventlistener of Add button
btnAdd.addEventListener("click", function () {
  popupAddCard.open();
});


//Validation of forms
const validateForm1 = new FormValidator(formElements, {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
const validateForm2 = new FormValidator(formProfile, {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
const avatarFormValidation = new FormValidator(formAvatar, {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
validateForm1.enableValidation();
validateForm2.enableValidation();
avatarFormValidation.enableValidation();