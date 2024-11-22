/* DECLARAÇÃO DE VARIÁVEIS */
const botaoToggle = document.querySelector(".botao-toggle");
const circuloToggle = document.querySelector(".circulo-toggle");
const textoLiga = document.querySelector(".texto-toggle.liga");
const textoDesl = document.querySelector(".texto-toggle.desl");
const iconeAjuda = document.querySelector(".icone-ajuda");
const sobrepor = document.querySelector(".sobrepor"); // Seleciona o overlay
const dicaNavegacao = document.querySelector(".dica-navegacao");
const spanDeErro = document.querySelector(".span-erro");
let toggleAtivo = false;

/* DECLARAÇÃO DE FUNÇÕES */
// Função para atualizar o estado do botão e suas propriedades visuais
function atualizarToggle() {
  circuloToggle.style.transform = toggleAtivo ? "translateX(3.25rem)" : "translateX(0)";
  textoLiga.style.opacity = toggleAtivo ? "1" : "0";
  textoDesl.style.opacity = toggleAtivo ? "0" : "1";
  botaoToggle.classList.toggle("ativo", toggleAtivo);
  botaoToggle.setAttribute("aria-checked", toggleAtivo);
} 

// Função para habilitar ou desabilitar o botão toggle
function habilitarToggle(estado) {
  botaoToggle.disabled = !estado; // Desabilita o botão se estado for falso
  botaoToggle.classList.toggle("desativado", !estado); // Adiciona classe para estilo desativado
  spanDeErro.innerHTML = estado ? "" : "Ops! Você não pode usar o SisAE+ aqui!";
}

// Carrega o estado inicial
// chrome.storage.sync.get("toggleAtivo", (data) => {
//   toggleAtivo = data.toggleAtivo || false;
//   atualizarToggle();
// });

// Alterna o estado do toggle e envia mensagem para o background.js
async function alternarToggle() {
  try {
      toggleAtivo = !toggleAtivo; // Inverte o estado do toggle
    //   await chrome.storage.sync.set({ toggleAtivo }); // Salva o novo estado
    //   await chrome.runtime.sendMessage({ 
    //       tipo: "alternarInjecao", 
    //       ativo: toggleAtivo 
    //   }); // Envia mensagem ao background.js
      atualizarToggle(); // Atualiza a visualização do toggle
  } catch (error) {
      console.error("Erro ao alternar o toggle:", error);
  }
}

// Função para verificar se a aba ativa é do SisAE
async function verificarAbaAtiva() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const abaSisAE = tab.url.includes("https://sisae.ifce.edu.br");

  habilitarToggle(abaSisAE); // Habilita ou desabilita o botão
}

// Função para exibir o modal de dica
function exibirDica() {
  iconeAjuda.style.animation = "none"; // Para a animação ao passar o mouse
  dicaNavegacao.classList.add("ativo"); // Adiciona a classe para exibir a dica
  sobrepor.style.display = "block"; // Exibe o overlay
}

// Função para ocultar o modal de dica
function ocultarDica() {
  dicaNavegacao.classList.remove("ativo"); // Remove a classe para ocultar a dica
  sobrepor.style.display = "none"; // Oculta o overlay 
}

// Permite o foco no botão ao usar a tecla Tab
botaoToggle.setAttribute("tabindex", "0"); // Garante que o botão pode ser focado

/* EVENTOS */
// Evento de clique
botaoToggle.addEventListener("click", alternarToggle);

// Evento de tecla (somente Enter e Espaço)
botaoToggle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    alternarToggle(); // Alterna o estado ao pressionar Enter ou Espaço
    botaoToggle.focus(); // Manter o foco no botão
    event.preventDefault(); // Previne o comportamento padrão
  }
});

// Exibir o modal de dica ao passar o mouse sobre o ícone de ajuda
iconeAjuda.addEventListener("mouseenter", exibirDica);

// Ocultar o modal de dica quando o mouse sai do ícone de ajuda
iconeAjuda.addEventListener("mouseleave", ocultarDica);

/* CHAMADA DAS FUNÇÕES */
atualizarToggle(); // Inicializa o estado do toggle ao carregar a página
verificarAbaAtiva(); // Verifica se a aba ativa é do SisAE