document.addEventListener("DOMContentLoaded", function () {
    // Função para exibir veículos na tela principal (available cars)
    function exibirVeiculos() {
        const carrosSalvos = JSON.parse(localStorage.getItem("carrosDisponiveis")) || [];
        const availableCarsSection = document.querySelector(".available-cars");
        availableCarsSection.innerHTML = ""; // Limpar a seção antes de recarregar

        if (carrosSalvos.length === 0) {
            availableCarsSection.innerHTML = "<p>Nenhum carro disponível no momento.</p>";
            return;
        }

        carrosSalvos.forEach((carro) => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");

            carCard.innerHTML = `
                <div class="car-image">
                    <img src="car-placeholder.png" alt="${carro.modelo}">
                </div>
                <div class="car-details">
                    <h3>${carro.fabricante} ${carro.modelo} - ${carro.ano}</h3>
                    <p>${carro.quantidadeDono} Dono(s)</p>
                    <p>${carro.km} km</p>
                    <p>${carro.descricao}</p>
                    <p class="price">R$ ${parseFloat(carro.preco).toFixed(2)}</p>
                </div>
            `;

            availableCarsSection.appendChild(carCard);
        });
    }

    // Função para exibir veículos na tela de estoque
    function exibirEstoque() {
        const carrosSalvos = JSON.parse(localStorage.getItem("carrosDisponiveis")) || [];
        const stockSection = document.querySelector(".stock-list");
        stockSection.innerHTML = ""; // Limpar antes de exibir

        if (carrosSalvos.length === 0) {
            stockSection.innerHTML = "<p>Nenhum carro no estoque.</p>";
            return;
        }

        carrosSalvos.forEach((carro) => {
            const stockCard = document.createElement("div");
            stockCard.classList.add("stock-card");

            stockCard.innerHTML = `
                <h3>${carro.fabricante} ${carro.modelo}</h3>
                <p><strong>Ano:</strong> ${carro.ano}</p>
                <p><strong>KM:</strong> ${carro.km}</p>
                <p><strong>Preço:</strong> R$ ${parseFloat(carro.preco).toFixed(2)}</p>
                <p><strong>Dono(s):</strong> ${carro.quantidadeDono}</p>
                <p><strong>Descrição:</strong> ${carro.descricao}</p>
            `;

            stockSection.appendChild(stockCard);
        });
    }

    // Exibir veículos na página principal e na página de estoque ao carregar
    exibirVeiculos();
    if (document.querySelector(".stock-list")) {
        exibirEstoque(); // Apenas chama se estiver na página de estoque
    }

    // Função para cadastrar veículos
    document.getElementById("cadastrar").addEventListener("click", function () {
        const fabricante = document.getElementById("fabricante").value;
        const modelo = document.getElementById("modelo").value;
        const ano = document.getElementById("ano").value;
        const quantidadeDono = document.getElementById("quantidadeDono").value;
        const km = document.getElementById("km").value;
        const preco = document.getElementById("preco").value;
        const descricao = document.getElementById("descricao").value;

        const veiculo = {
            fabricante,
            modelo,
            ano,
            quantidadeDono,
            km,
            preco,
            descricao,
        };

        const carrosSalvos = JSON.parse(localStorage.getItem("carrosDisponiveis")) || [];
        carrosSalvos.push(veiculo);
        localStorage.setItem("carrosDisponiveis", JSON.stringify(carrosSalvos));

        alert("Veículo cadastrado com sucesso!");

        // Atualizar exibição dos veículos na tela principal e no estoque
        exibirVeiculos();
        if (document.querySelector(".stock-list")) {
            exibirEstoque(); // Atualiza estoque se estiver na página de estoque
        }

        // Limpar campos do formulário
        document.getElementById("fabricante").value = "";
        document.getElementById("modelo").value = "";
        document.getElementById("ano").value = "";
        document.getElementById("quantidadeDono").value = "";
        document.getElementById("km").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("descricao").value = "";
    });
});
