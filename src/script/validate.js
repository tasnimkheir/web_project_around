// Função para mostrar erro de input, adicionando mensagem de erro e classe de erro ao input
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Função para esconder erro de input, removendo a mensagem de erro e a classe de erro do input
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
};

// Função para checar a validade do input, mostrando ou escondendo o erro conforme necessário
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// Função que verifica se há algum input inválido em uma lista de inputs
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Função para alterar o estado do botão de submissão conforme a validade dos inputs
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
  }
};

// Função para configurar os listeners de eventos nos inputs e no botão de submissão do formulário
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Função para habilitar a validação em todos os formulários na página com base nas configurações fornecidas
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

// Chama a função enableValidation com as configurações necessárias para os formulários na página
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
});

// Seleciona todos os elementos de overlay dos popups e todos os popups
const popupOverlay = document.querySelectorAll(".popup__overlay");
const allPopup = document.querySelectorAll(".popup");

// Adiciona um evento de clique a cada overlay para fechar o popup correspondente ao clicar no overlay
popupOverlay.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    overlay.parentNode.classList.remove("popup__open");
  });
});