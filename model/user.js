var user = {
    email: this.nome,
    password: this.password,
    valor: this.valor,
    mensagem: this.mensagem,

    bio: function() {
        alert(
            this.nome[0] +
            " " +
            this.nome[1] +
            " tem " +
            this.idade +
            " anos de idade. Ele gosta de " +
            this.interesses[0] +
            " e " +
            this.interesses[1] +
            "."
        );
    },
    saudacao: function() {
        alert("Oi! Eu sou " + this.nome[0] + ".");
    },
};