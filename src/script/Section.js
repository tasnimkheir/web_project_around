// Define uma classe chamada Section que será exportada como padrão
export default class Section {
  // O construtor é chamado quando uma nova instância da classe é criada
  constructor({ items, renderer }, templateSelector) {
    // Inicializa as propriedades da classe com os itens e a função de renderização
    // `items` é um array de dados a serem renderizados
    // `renderer` é uma função que define como cada item será renderizado
    // `templateSelector` é o seletor CSS do contêiner onde os itens serão adicionados
    this._items = items;
    this._renderer = renderer;
    this._templateSelector = document.querySelector(templateSelector);
  }

  // Método para renderizar todos os itens
  renderer() {
    // Itera sobre cada item no array `_items`
    this._items.forEach((item) => {
      // Chama a função de renderização para criar um nó DOM para o item
      const node = this._renderer(item);

      // Adiciona o nó DOM ao contêiner usando o método addItem
      this.addItem(node);
    });
  }

  // Método para adicionar um elemento ao contêiner
  addItem(element) {
    // Adiciona o elemento ao contêiner selecionado pelo `templateSelector`
    this._templateSelector.append(element);
  }
}
