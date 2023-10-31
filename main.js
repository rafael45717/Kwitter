// Definindo uma função chamada addUser
function addUser(){
    // Obtendo o valor do elemento com o ID "user_name" e armazenando na variável user_name
    user_name=document.getElementById("user_name").value;

    // Armazenando o valor da variável user_name no armazenamento local do navegador com a chave "user_name"
    localStorage.setItem("user_name", user_name);

    // Redirecionando o navegador para a página "sala.html"
    window.location="sala.html";
}
