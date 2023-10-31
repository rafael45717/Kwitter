const firebaseConfig = {
  apiKey: "AIzaSyD_IbPMIjGU9J80i5iatK9gzGLRIFDcXk0",
  authDomain: "teste1-feuf.firebaseapp.com",
  databaseURL: "https://chat-no-gpt-default-rtdb.firebaseio.com/",
  projectId: "teste1-feuf",
  storageBucket: "teste1-feuf.appspot.com",
  messagingSenderId: "189401864787",
  appId: "1:189401864787:web:23bd61a7ae3112e4df44a6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Obtém o nome do usuário e o nome da sala armazenados no armazenamento local do navegador
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

// Função para enviar mensagem
function send() {

  // Obtém a mensagem do campo de entrada do HTML
  msg = document.getElementById("msg").value;

  // Envia a mensagem para o banco de dados Firebase
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });

  // Limpa o campo de entrada de mensagem
  document.getElementById("msg").value = "";
}

// Função para obter os dados das mensagens
function getData() {

  // Obtém uma referência para o banco de dados Firebase, com o caminho correspondente à sala
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {

    // Limpa o conteúdo existente no elemento HTML com o ID "output"
    document.getElementById("output").innerHTML = "";

    // Itera sobre os snapshots das mensagens
    snapshot.forEach(function (childSnapshot) {

      // Obtém a chave da mensagem (firebase_message_id) e seus dados (message_data)
      childKey = childSnapshot.key;
      childData = childSnapshot.val();

      // Verifica se a chave não é "purpose" (uma chave especial)
      if (childKey != "purpose") {

        // Atribui a chave da mensagem e seus dados a variáveis
        firebase_message_id = childKey;
        message_data = childData;


        // Processamento dos dados da mensagem
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];

        // Construção da estrutura HTML para exibir a mensagem e os botões de "like"

        // Cria uma string HTML com o nome do usuário e uma imagem associada
        name_with_tag = "<h4> " + name + "<img class='user_tick' width='80px' src='logo.jpg'></h4>";
        // Cria uma string HTML com a mensagem
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        // Cria um botão HTML com a funcionalidade de 'like'
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        // Cria uma string HTML com a contagem de 'likes'
        span_with_tag = "<span class='bi bi-hand-thumbs-up'> Like: " + like + "</span></button><hr>";

        // Combina as strings HTML para formar uma linha completa de exibição de mensagem
        row = name_with_tag + message_with_tag + like_button + span_with_tag;

        // Adiciona a estrutura HTML ao elemento com o ID "output"
        document.getElementById("output").innerHTML += row;

      }
    });
  });
}

getData();

// Função para atualizar o contador de "likes" de uma mensagem
function updateLike(message_id) {

  // Atribui o ID do botão (firebase_message_id) à variável button_id
  button_id = message_id;

  // Obtém o valor atual da contagem de 'likes' do botão
  likes = document.getElementById(button_id).value;

  // Converte a contagem de 'likes' para um número e incrementa em 1
  updated_likes = Number(likes) + 1;

  // Atualiza o valor da contagem de 'likes' no banco de dados Firebase para a mensagem específica
  firebase.database().ref(room_name).child(message_id).update({
    // Atualiza o campo 'like' com o novo valor de 'likes'
    like: updated_likes
  });

}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
