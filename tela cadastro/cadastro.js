function atualizarPreview() {
    const fabricante = document.getElementById('fabricante').value;
    const modelo = document.getElementById('modelo').value;
    const ano = document.getElementById('ano').value;
    const quantidadeDono = document.getElementById('quantidadeDono').value;
    const km = document.getElementById('km').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;

    document.querySelector('#prevFabricante span').textContent = fabricante;
    document.querySelector('#prevModelo span').textContent = modelo;
    document.querySelector('#prevAno span').textContent = ano;
    document.querySelector('#prevDono span').textContent = quantidadeDono;
    document.querySelector('#prevKM span').textContent = km;
    document.querySelector('#prevValor span').textContent = preco;
    document.querySelector('#prevDescricao span').textContent = descricao;
}