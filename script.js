document.querySelector('.chatbot-icon').addEventListener('click', function() {
    var chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.style.display = 'block';
});

function closeChat() {
    var chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.style.display = 'none';
}
