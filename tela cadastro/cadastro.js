document.addEventListener("DOMContentLoaded", function () {  // Observador de mudanças no DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            console.log("Mudança detectada no DOM:", mutation.target);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log("JavaScript carregado corretamente!");

    // Função para exibir veículos na tela principal
    function exibirVeiculos() {
        console.log("Função exibirVeiculos foi chamada!");
        const carrosSalvos = JSON.parse(localStorage.getItem("carrosDisponiveis")) || [];
        const carContainer = document.querySelector(".carousel-container");
        if (!carContainer) return; // Se a seção não existir, evita erro

        carContainer.innerHTML = ""; // Limpa antes de adicionar os veículos

        if (carrosSalvos.length === 0) {
            carContainer.innerHTML = "<p>Nenhum carro disponível no momento.</p>";
            return;
        }

        carrosSalvos.forEach((carro) => {
            console.log(`Exibindo na tela principal: ${carro.modelo}, URL da imagem: ${carro.imagem}`);

            let imagemFinal = carro.imagem;
            if (!imagemFinal || !imagemFinal.startsWith("http")) {
                imagemFinal = "img/fallback.png"; // Usa fallback se a imagem for inválida
            }

            const carCard = document.createElement("div");
            carCard.classList.add("car-card");

            carCard.innerHTML = `
                <div class="car-image">
                    <img src="${imagemFinal}" alt="${carro.modelo}" 
                    onerror="this.onerror=null; this.src='img/fallback.png';"
                    style="width: 100%; height: auto; border-radius: 8px;">
                </div>
                <div class="car-details">
                    <h3>${carro.fabricante} ${carro.modelo} - ${carro.ano}</h3>
                    <p>${carro.quantidadeDono} Dono(s)</p>
                    <p>${carro.km} km</p>
                    <p>${carro.descricao}</p>
                    <p class="price">R$ ${parseFloat(carro.preco).toFixed(2)}</p>
                </div>
            `;

            carContainer.appendChild(carCard);
        });
    }

    // Função para exibir veículos na tela de estoque
    function exibirEstoque() {
        const carrosSalvos = JSON.parse(localStorage.getItem("carrosDisponiveis")) || [];
        const stockSection = document.querySelector(".stock-list");
        if (!stockSection) return;

        stockSection.innerHTML = ""; // Limpa antes de exibir

        if (carrosSalvos.length === 0) {
            stockSection.innerHTML = "<p>Nenhum carro no estoque.</p>";
            return;
        }

        carrosSalvos.forEach((carro) => {
            const stockCard = document.createElement("div");
            stockCard.classList.add("stock-card");

            stockCard.innerHTML = `
                <div class="car-image">
                    <img src="${carro.imagem}" alt="${carro.modelo}" 
                    style="width: 100%; height: auto; border-radius: 8px;">
                </div>
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
    exibirEstoque();

    // Função para cadastrar veículos
    document.getElementById("cadastrar").addEventListener("click", function () {
        const fabricante = document.getElementById("fabricante").value;
        const modelo = document.getElementById("modelo").value;
        const ano = document.getElementById("ano").value;
        const quantidadeDono = document.getElementById("quantidadeDono").value;
        const km = document.getElementById("km").value;
        const preco = document.getElementById("preco").value;
        const descricao = document.getElementById("descricao").value;
        const imagemInput = document.getElementById("imagemCarro").files[0];
        const urlImagem = document.getElementById("urlImagem").value;

        let imagemBase64 = "";

        if (imagemInput) {
            const reader = new FileReader();
            reader.onloadend = function () {
                imagemBase64 = reader.result;
                salvarCarro(fabricante, modelo, ano, quantidadeDono, km, preco, descricao, imagemBase64);
            };
            reader.readAsDataURL(imagemInput);
        } else {
            salvarCarro(fabricante, modelo, ano, quantidadeDono, km, preco, descricao, urlImagem);
        }
    });

    function salvarCarro(fabricante, modelo, ano, quantidadeDono, km, preco, descricao, imagem) {
        if (!imagem) {
            imagem = "img/fallback.png"; // Usa uma imagem padrão se a URL estiver vazia
        }

        const veiculo = {
            fabricante,
            modelo,
            ano,
            quantidadeDono,
            km,
            preco,
            descricao,
            imagem,
        };

        const carrosSalvos = JSON.parse(localStorage.getItem("carrosDisponiveis")) || [];
        carrosSalvos.push(veiculo);
        localStorage.setItem("carrosDisponiveis", JSON.stringify(carrosSalvos));

        console.log("Veículo salvo:", veiculo); // Teste no console

        alert("Veículo cadastrado com sucesso!");
        exibirVeiculos();
        exibirEstoque();
    }
});
