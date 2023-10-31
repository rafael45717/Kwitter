const firebaseConfig = {
  apiKey: "AIzaSyD_IbPMIjGU9J80i5iatK9gzGLRIFDcXk0", // Chave de API do Firebase
  authDomain: "teste1-feuf.firebaseapp.com", // Domínio de autenticação do Firebase
  databaseURL: "https://teste1-feuf-default-rtdb.firebaseio.com/", // URL do banco de dados Firebase
  projectId: "teste1-feuf", // ID do projeto Firebase
  storageBucket: "teste1-feuf.appspot.com", // Bucket de armazenamento do Firebase
  messagingSenderId: "189401864787", // ID do remetente de mensagens do Firebase
  appId: "1:189401864787:web:23bd61a7ae3112e4df44a6" // ID do aplicativo Firebase
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

    // Obtém o nome do usuário armazenado no armazenamento local do navegador
    user_name = localStorage.getItem("user_name");
    
    // Exibe a mensagem de boas-vindas com o nome do usuário na página
    document.getElementById("user_name").innerHTML =  "Bem-vindo(a), " + user_name + "!";
    
    // Função para adicionar uma sala
    function addRoom() {
      
      // Obtém o nome da sala do campo de entrada no HTML
      room_name = document.getElementById("room_name").value;
    
      // Adiciona a sala ao banco de dados Firebase com um propósito específico
      firebase.database().ref("/").child(room_name).update({
        purpose: "adicionar sala"
      });
    
        // Armazena o nome da sala no armazenamento local do navegador
      localStorage.setItem("room_name", room_name);
    
      // Redireciona para a página de chat
      window.location = "chat.html";
    }
    
    // Função para obter os dados das salas do banco de dados Firebase
    function getData() {

      // Obtém uma referência para o banco de dados Firebase
      firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";  // Limpa o conteúdo existente
          snapshot.forEach(function (childSnapshot) { // Itera sobre as salas no banco de dados
          childKey = childSnapshot.key; // Obtém a chave da sala
          Room_names = childKey;
          //console.log("Room Name - " + Room_names);

          // Exibe o nome da sala e cria um elemento HTML para redirecionamento
          row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
          document.getElementById("output").innerHTML += row;
        });
      });
    
    }
    // Para obter os dados do banco de dados e exibi-los na página de salas do ChatRoom
    getData();
    
    function redirectToRoomName(name){
      
       // Armazena o nome da sala no armazenamento local do navegador
      localStorage.setItem("room_name", name);

      // Redireciona para a página de chat
      window.location="chat.html";
    }

      // Função para fazer logout, removendo os dados do usuário e sala do armazenamento local
    function logout(){

      // Remove os dados do usuário e da sala do armazenamento local
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");

      // Redireciona para a página inicial
      window.location="index.html";
    }