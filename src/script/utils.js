// Função para abrir o popup
export function openPopup(popup) {
  // Adiciona a classe "popup__open" ao popup, tornando-o visível
  popup.classList.add("popup__open");
  // Adiciona um evento ao documento para fechar o popup ao pressionar a tecla Escape
  document.addEventListener("keydown", handleEscapeKey);
}

// Função para fechar o popup
export function closePopup(popup) {
  // Remove a classe "popup__open" do popup, escondendo-o
  popup.classList.remove("popup__open");
  // Verifica se não há mais popups abertos
  if (document.querySelectorAll(".popup__open").length === 0) {
    // Remove o evento de tecla Escape se todos os popups estiverem fechados
    document.removeEventListener("keydown", handleEscapeKey);
  }
}

// Função para lidar com a tecla Escape
function handleEscapeKey(evt) {
  // Verifica se a tecla pressionada é "Escape"
  if (evt.key === "Escape") {
    // Seleciona todos os popups abertos
    const openPopups = document.querySelectorAll(".popup__open");
    // Fecha todos os popups abertos
    openPopups.forEach((popup) => closePopup(popup));
  }
}
