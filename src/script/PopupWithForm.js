// Importa a classe Popup do arquivo Popup.js
import Popup from "./Popup.js";

// Define uma classe chamada PopupWithForm que será exportada como padrão
// Esta classe estende a classe Popup
export default class PopupWithForm extends Popup {
  // O construtor é chamado quando uma nova instância da classe é criada
  // Recebe o seletor do popup e uma função de manipulação de envio de formulário
  constructor(selector, handleSubmit) {
    // Chama o construtor da classe base (Popup) passando o seletor
    super(selector);
    // Armazena a função de manipulação de envio na propriedade _handleSubmit
    this._handleSubmit = handleSubmit;
  }

  // Método para definir os event listeners do popup
  setEventListeners() {
    // Chama o método setEventListeners da classe base (Popup)
    super.setEventListeners();
    
    // Seleciona o popup no DOM usando o seletor fornecido
    const popupOpen = document.querySelector(this._popupSelector);
    // Seleciona o formulário dentro do popup
    const form = popupOpen.querySelector("form");
    
    // Adiciona um event listener para o evento de submit do formulário
    form.addEventListener("submit", (evt) => {
      // Previne o comportamento padrão do formulário
      evt.preventDefault();
      // Chama a função de manipulação de envio passando os valores dos inputs
      this._handleSubmit(this.getInputValues());
      // Fecha o popup
      this.close();
    });
  }

  // Método para obter os valores dos inputs do formulário
  getInputValues() {
    // Seleciona o popup no DOM usando o seletor fornecido
    const popupOpen = document.querySelector(this._popupSelector);
    // Seleciona o formulário dentro do popup
    const form = popupOpen.querySelector("form");
    
    // Cria um objeto para armazenar os valores dos inputs
    const inputValues = {};
    // Converte os elementos do formulário em um array
    const inputForms = Array.from(form.elements);
    
    // Itera sobre cada elemento do formulário
    inputForms.forEach((element) => {
      // Se o elemento tem um nome, adiciona seu valor ao objeto inputValues
      if (element.name) {
        inputValues[element.name] = element.value;
      }
    });
    
    // Retorna o objeto com os valores dos inputs
    return inputValues;
  }

  // Método para fechar o popup
  close() {
    // Chama o método close da classe base (Popup)
    super.close();
    
    // Seleciona o popup no DOM usando o seletor fornecido
    const popupOpen = document.querySelector(this._popupSelector);
    // Seleciona o formulário dentro do popup
    const form = popupOpen.querySelector("form");
    
    // Reseta o formulário para limpar os valores dos inputs
    form.reset();
  }
}
