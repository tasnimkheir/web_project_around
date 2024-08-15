// Define uma classe chamada UserInfo que será exportada como padrão
export default class UserInfo {
  // O construtor é chamado quando uma nova instância da classe é criada
  constructor({ name, about }) {
    // Inicializa as propriedades da classe com os elementos DOM selecionados
    // `name` e `about` são os seletores CSS passados quando a instância é criada
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  // Método para obter as informações do usuário
  getUserInfo() {
    // Retorna um objeto com as informações do nome e descrição do usuário
    return {
      name: this._name.textContent,   // Conteúdo de texto do elemento do nome
      about: this._about.textContent, // Conteúdo de texto do elemento da descrição
    };
  }

  // Método para definir as informações do usuário
  setUserInfo(name, about) {
    // Atualiza o conteúdo de texto dos elementos do nome e da descrição
    this._name.textContent = name;    // Define o conteúdo de texto do elemento do nome
    this._about.textContent = about;  // Define o conteúdo de texto do elemento da descrição
  }
}
