// Importa a classe Popup do arquivo Popup.js
import Popup from "./Popup.js";

// Define uma classe chamada PopupWithImage que será exportada como padrão
// Esta classe estende a classe Popup
export default class PopupWithImage extends Popup {
  // O construtor é chamado quando uma nova instância da classe é criada
  constructor(selector) {
    // Chama o construtor da classe base (Popup) passando o seletor
    super(selector);
  }

  // Método para abrir o popup com uma imagem
  open(name, link) {
    // Chama o método open da classe base (Popup)
    super.open();
    
    // Seleciona o elemento popup no DOM usando o seletor fornecido
    const popupOpen = document.querySelector(this._popupSelector);
    
    // Define o atributo alt da imagem no popup com o nome fornecido
    popupOpen.querySelector(".popup__fullImg").setAttribute("alt", name);
    
    // Define o atributo src da imagem no popup com o link fornecido
    popupOpen.querySelector(".popup__fullImg").setAttribute("src", link);
    
    // Define o texto do rodapé do popup com o nome fornecido
    popupOpen.querySelector(".popup__footer").textContent = name;
  }

  // Método para definir os event listeners do popup
  setEventListeners() {
    // Chama o método setEventListeners da classe base (Popup)
    super.setEventListeners();
  }
}
