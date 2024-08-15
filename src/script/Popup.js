// Define uma classe chamada Popup que será exportada como padrão
export default class Popup {
  // O construtor é chamado quando uma nova instância da classe é criada
  // Recebe um seletor para identificar o popup no DOM
  constructor(popupSelector) {
    // Armazena o seletor do popup em uma propriedade da classe
    this._popupSelector = popupSelector;
    // Configura os event listeners do popup
    this.setEventListeners();
  }

  // Método para abrir o popup
  open() {
    // Seleciona o elemento do popup no DOM usando o seletor fornecido
    const popupOpen = document.querySelector(this._popupSelector);
    // Adiciona a classe 'popup__show' ao elemento para torná-lo visível
    popupOpen.classList.add("popup__show");
    // Adiciona um event listener para o evento 'keydown' que chama o método _handleEscClose
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Método para fechar o popup
  close() {
    // Seleciona o elemento do popup no DOM usando o seletor fornecido
    const popupOpen = document.querySelector(this._popupSelector);
    // Remove a classe 'popup__show' do elemento para escondê-lo
    popupOpen.classList.remove("popup__show");
    // Remove o event listener para o evento 'keydown' que chama o método _handleEscClose
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Método privado para fechar o popup quando a tecla Escape é pressionada
  _handleEscClose = (evt) => {
    // Verifica se a tecla pressionada é 'Escape'
    if (evt.key === "Escape") {
      // Fecha o popup
      this.close();
    }
  };

  // Método para definir os event listeners do popup
  setEventListeners() {
    // Seleciona o elemento do popup no DOM usando o seletor fornecido
    const popupOpen = document.querySelector(this._popupSelector);

    // Seleciona o botão de fechar (ícone) dentro do popup
    const closeButton = popupOpen.querySelector("#close-img");
    // Adiciona um event listener para o evento 'click' que fecha o popup
    closeButton.addEventListener("click", () => {
      this.close();
    });

    // Adiciona um event listener para o evento 'click' na sobreposição do popup
    // que fecha o popup quando a sobreposição é clicada
    popupOpen.querySelector(".popup__overlay").addEventListener("click", () => {
      this.close();
    });
  }
}
