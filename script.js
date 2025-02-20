// Função para carregar valores salvos no localStorage
function carregarValores() {
    // Inicializa os inputs como zero
    document.getElementById("manha").value = 0;
    document.getElementById("tarde").value = 0;
    
    // Recupera os valores do localStorage
    const valorManha = parseInt(localStorage.getItem("manha")) || 0;
    const valorTarde = parseInt(localStorage.getItem("tarde")) || 0;
    const valorTotal = valorManha + valorTarde;
    
    // Exibe os valores na tabela
    document.getElementById("dados_manha").innerHTML = valorManha;
    document.getElementById("dados_tarde").innerHTML = valorTarde;
    document.getElementById("dados_total").innerHTML = valorTotal;
 }

 document.addEventListener("DOMContentLoaded", carregarValores);

 function salvarManha() {
    const inputValor = parseInt(document.getElementById("manha").value) || 0;
    const valorAtual = parseInt(localStorage.getItem("manha")) || 0;
    const novoValor = valorAtual + inputValor;
    
    localStorage.setItem("manha", novoValor);
    carregarValores();
 }

 function salvarTarde() {
    const inputValor = parseInt(document.getElementById("tarde").value) || 0;
    const valorAtual = parseInt(localStorage.getItem("tarde")) || 0;
    const novoValor = valorAtual + inputValor;
    
    localStorage.setItem("tarde", novoValor);
    carregarValores();
 }

 function enviarDados() {
const totalManha = parseInt(localStorage.getItem("manha")) || 0;
const totalTarde = parseInt(localStorage.getItem("tarde")) || 0;
const totalGeral = totalManha + totalTarde;
const dataAtual = new Date().toLocaleDateString("pt-BR", {
 weekday: "long", // Dia da semana (segunda, terça, ...)
 day: "2-digit",   // Dia do mês (01, 02, ...)
 month: "long",    // Mês por extenso (janeiro, fevereiro, ...)
 year: "numeric"   // Ano completo (2025)
});

// Conteúdo a ser copiado para a área de transferência
const conteudo = `Dados de Produção: *${dataAtual}*\n\nManhã: *${totalManha}*\nTarde: *${totalTarde}*\nTotal: *${totalGeral}*`;

// Função para copiar em dispositivos móveis
function copiarParaClipboard(conteudo) {
 const textarea = document.createElement("textarea");
 textarea.value = conteudo;
 document.body.appendChild(textarea);
 textarea.select();
 document.execCommand("copy");
 document.body.removeChild(textarea);
}

// Tenta usar a API moderna, caso contrário, usa o fallback
if (navigator.clipboard && navigator.clipboard.writeText) {
 navigator.clipboard.writeText(conteudo).then().catch(() => {
    copiarParaClipboard(conteudo);
 });
} else {
 copiarParaClipboard(conteudo);
}

// Limpa os valores após o envio
localStorage.removeItem("manha");
localStorage.removeItem("tarde");
carregarValores();
}
