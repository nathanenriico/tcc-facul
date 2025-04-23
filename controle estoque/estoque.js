document.addEventListener("DOMContentLoaded", function () {
    const stockSection = document.querySelector(".stock-list");
    const carouselContainer = document.querySelector(".carousel-container");

    // Exibir carros disponíveis
    function exibirVeiculos() {
        const carrosDisponiveis = JSON.parse(localStorage.getItem("carrosDisponiveisDisponiveis")) || [];

        if (!carouselContainer) return;

        carouselContainer.innerHTML = ""; // Limpar conteúdo anterior

        if (carrosDisponiveis.length === 0) {
            carouselContainer.innerHTML = "<p>Nenhum carro disponível no momento.</p>";
            return;
        }

        carrosDisponiveis.forEach((carro, index) => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");
            carCard.innerHTML = `
                <div class="car-image">
                    <img src="${carro.imagem}" alt="${carro.modelo}" />
                </div>
                <div class="car-details">
                    <h3>${carro.fabricante} ${carro.modelo}</h3>
                    <p><strong>Ano:</strong> ${carro.ano}</p>
                    <p><strong>KM:</strong> ${carro.km} KM</p>
                    <p><strong>Preço:</strong> R$ ${parseFloat(carro.preco).toFixed(2)}</p>
                    <p><strong>Dono(s):</strong> ${carro.quantidadeDono}</p>
                    <p><strong>Descrição:</strong> ${carro.descricao}</p>
                    <button class="delete-btn" data-index="${index}">🗑️ Remover</button>
                </div>
            `;
            carouselContainer.appendChild(carCard);
        });

        document.querySelectorAll(".car-card .delete-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                removerCarroDisponivel(index);
            });
        });
    }

    // Remover carro da lista de disponíveis
    function removerCarroDisponivel(index) {
        let carrosDisponiveis = JSON.parse(localStorage.getItem("carrosDisponiveisDisponiveis")) || [];
        carrosDisponiveis.splice(index, 1);
        localStorage.setItem("carrosDisponiveisDisponiveis", JSON.stringify(carrosDisponiveis));
        exibirVeiculos();
    }

    // Carregar estoque e exibir
    function carregarEstoque() {
        const carrosSalvos = JSON.parse(localStorage.getItem("carrosDisponiveis")) || [];
        if (!stockSection) return;
        stockSection.innerHTML = "";

        if (carrosSalvos.length === 0) {
            stockSection.innerHTML = "<p>Nenhum carro no estoque.</p>";
            return;
        }

        carrosSalvos.forEach((carro, index) => {
            const stockCard = document.createElement("div");
            stockCard.classList.add("stock-card");

            stockCard.innerHTML = `
                <div class="car-image">
                    <img src="${carro.imagem}" alt="${carro.modelo}" style="width: 100%; height: auto; border-radius: 8px;">
                </div>
                <h3>${carro.fabricante} ${carro.modelo}</h3>
                <p><strong>Ano:</strong> ${carro.ano}</p>
                <p><strong>KM:</strong> ${carro.km}</p>
                <p><strong>Preço:</strong> R$ ${parseFloat(carro.preco).toFixed(2)}</p>
                <p><strong>Dono(s):</strong> ${carro.quantidadeDono}</p>
                <p><strong>Descrição:</strong> ${carro.descricao}</p>
                <div class="button-group">
                    <button class="delete-btn" data-index="${index}">🗑️ Excluir</button>
                    <button class="add-btn" data-index="${index}">➕ Adicionar</button>
                </div>
            `;
            stockSection.appendChild(stockCard);
        });

        adicionarEventosExcluir();
        adicionarEventosAdicionar();
    }

    // Eventos dos botões do estoque
    function adicionarEventosExcluir() {
        document.querySelectorAll(".stock-card .delete-btn").forEach(botao => {
            botao.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                excluirCarro(index);
            });
        });
    }

    function adicionarEventosAdicionar() {
        document.querySelectorAll(".stock-card .add-btn").forEach(botao => {
            botao.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                adicionarDisponivel(index);
            });
        });
    }

    // Excluir carro do estoque
    function excluirCarro(index) {
        let carrosSalvos = JSON.parse(localStorage.getItem("carrosDisponiveis")) || [];
        carrosSalvos.splice(index, 1);
        localStorage.setItem("carrosDisponiveis", JSON.stringify(carrosSalvos));
        carregarEstoque();
    }

    // Adicionar carro aos disponíveis
    function adicionarDisponivel(index) {
        let carrosEstoque = JSON.parse(localStorage.getItem("carrosDisponiveis")) || [];
        const carroSelecionado = carrosEstoque[index];
        let carrosDisponiveis = JSON.parse(localStorage.getItem("carrosDisponiveisDisponiveis")) || [];

        const jaExiste = carrosDisponiveis.some(carro =>
            carro.modelo === carroSelecionado.modelo &&
            carro.ano === carroSelecionado.ano &&
            carro.preco === carroSelecionado.preco
        );

        if (jaExiste) {
            alert("🚫 Este carro já está na lista de disponíveis.");
            return;
        }

        carrosDisponiveis.push(carroSelecionado);
        localStorage.setItem("carrosDisponiveisDisponiveis", JSON.stringify(carrosDisponiveis));

        carrosEstoque.splice(index, 1);
        localStorage.setItem("carrosDisponiveis", JSON.stringify(carrosEstoque));

        alert("✅ Carro adicionado à lista de disponíveis!");
        carregarEstoque();
        exibirVeiculos(); // Atualiza a listagem de disponíveis também
    }

    // Botão de voltar (se existir)
    const botaoVoltar = document.querySelector("#botao-voltar");
    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", voltarPagina);
    }

    // Inicialização
    carregarEstoque();
    exibirVeiculos();
});

function voltarPagina() {
    window.location.href = "../tela-cadastro/cadastro.html";
}
