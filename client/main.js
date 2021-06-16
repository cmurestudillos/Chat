// var socket = io.connect('https://chatnodejs-socketio.herokuapp.com/', {'forceNew':true});
var socket = io();

socket.on('messages', (data) => {
    console.log(data);
    render(data);
});

// Funcion de renderizado del contenido de los mensajes del chat
function render(data){
    var html = data.map((message, index) => {
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.texto}</p>
            </div>
        `);
    }).join(' ');

    var div_msg = document.getElementById('messages');
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight
}

function addMessage(e){

    var message = {
        nickname: document.getElementById('nickname').value,
        texto: document.getElementById('texto').value
    };

    document.getElementById('nickname').style.display = "none";
    socket.emit('add-message', message);
    // Corta la ejecucion
    return false;
}