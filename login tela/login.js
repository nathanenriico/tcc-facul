
        document.getElementById('loginForm').onsubmit = function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            let email = document.querySelector("input[type='email']").value;
            let senha = document.querySelector("input[type='password']").value;
    
            // Simulando credenciais válidas 
            let emailCorreto = "usuario@gmail.com";
            let senhaCorreta = "123456";
    
            if (email === emailCorreto && senha === senhaCorreta) {
                alert("Login realizado com sucesso!");
                window.location.href = ""; // Redireciona para outra página
            } else {
                alert("Email ou senha incorretos. Tente novamente.");
            }
    
        };
 