
const socket = io('http://localhost:8001');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageConatiner = document.querySelector('.container');

const append = function(message,position){
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageConatiner.append(messageElement);
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    messageInput.value='';

    socket.emit('send',message);
})

const nam = prompt("enter ur name to join");

socket.emit('new-user-joined',nam);

socket.on('user-joined',function(name){
    append(`${name}: joined the chat`,'left');
});

socket.on('receive',function(data){
    append(`${data.name}: ${data.message}`,'left');
    
});

socket.on('left',function(name){
    append(`${name} left the chat`,'left');
});


