let paramsDefault = {
    optionsPopup: {
        background: '#095E54',
        color: '#FFFFFF'
    },
    optionsIcon: {
        background: '#24CD63',
        color: '#FFFFFF'
    },
    optionsChat: {
        buttonTarget: `https://api.whatsapp.com/send?`,
        message:'Hello everyone',
        phone:'+55479999999999',
        text: 'Send'
    },
    optionsBot: {
        name: 'Bot',
        image: 'https://refresh.bokss.org.hk/sites/default/files/inpages/whatsapp/bot.png',
        messageDefault: 'Hi, 👋 how can I help you?',
        messageTyping: 'is typing...'
    }
};

let timer;

function initWidget(params)  {

    //document.addEventListener("DOMContentLoaded", function(e) {
        const wpp = document.createElement('div');
        wpp.setAttribute("id", "whatsapp-widget");
        wpp.classList.add('whatsapp-widget');

        const body = document.querySelector('body');
        body.appendChild(wpp);

        createElements(params);
    //})
}

function createElements(params) {
    const mainWhatsappWidget  = document.querySelector('#whatsapp-widget');

    if (params) 
        paramsDefault = params;

    const strTarget = ` <a href="#" id="whatsapp-widget-target" class="whatsapp-widget-target pulse">
                            <img id="whatsapp-widget-icon" class="whatsapp-widget-icon" src="https://refresh.bokss.org.hk/sites/default/files/inpages/whatsapp/WhatsApp-icone.png"/>
                        </a>`;

    const strChat = `<div class="whatsapp-widget-chat" id="whatsapp-widget-chat">
                        <div class="whatsapp-widget-chat-header" id="whatsapp-widget-chat-header" style="background: ${paramsDefault.optionsPopup.background}; color: ${paramsDefault.optionsPopup.color}">
                            <div class="whatsapp-widget-chat-header close" id="close">✖</div>
                            <div class="whatsapp-widget-chat-header bot">
                                <div class="bot-img" id="bot-img">
                                    <img class="whatsapp-widget-chat-header" src="${paramsDefault.optionsBot.image}" />
                                </div>
                                
                                <div style="margin-left: 16px; margin-right: 16px">
                                    <div class="whatsapp-widget-chat-header name" id="nameBot">${paramsDefault.optionsBot.name}</div>
                                    <div class="whatsapp-widget-chat-header status" id="statusBot">ONLINE 🟢</div>
                                </div>
                            </div>
                        </div>
                        <div class="whatsapp-widget-chat-chat" id="whatsapp-widget-chat-chat">
                            <div class="whatsapp-widget-chat-chat message" id="messageBot">
                                <div class="whatsapp-widget-chat-chat header" id="userBot"></div>
                                <div class="whatsapp-widget-chat-chat msg" id="msgBot"></div>
                                <div class="whatsapp-widget-chat-chat date" id="dateBot"></div>
                            </div>
                            <div class="whatsapp-widget-chat-footer" id="whatsapp-widget-chat-footer">
                                <div id="whatsapp-widget-chat-input-container">
                                    <input type="text" id="whatsapp-widget-chat-input" />                        
                                </div>
                                <a href="#" id="whatsapp-widget-open-modal" class="whatsapp-widget-open-modal">   
                                    <svg class="joinchat__button__send" width="60" height="60" viewBox="0 0 400 400" stroke-linecap="round" stroke-width="33">
<path class="joinchat_svg__plain" d="M168.83 200.504H79.218L33.04 44.284a1 1 0 0 1 1.386-1.188L365.083 199.04a1 1 0 0 1 .003 1.808L34.432 357.903a1 1 0 0 1-1.388-1.187l29.42-99.427"></path>
<path class="joinchat_svg__chat" d="M318.087 318.087c-52.982 52.982-132.708 62.922-195.725 29.82l-80.449 10.18 10.358-80.112C18.956 214.905 28.836 134.99 81.913 81.913c65.218-65.217 170.956-65.217 236.174 0 42.661 42.661 57.416 102.661 44.265 157.316"></path>
</svg>      
                                </a>
                            </div>
                        </div>
                    </div>`;

    mainWhatsappWidget.innerHTML = strTarget + strChat;

    setEvents();
}
    
function setEvents() {
    const close = document.getElementById("close");
    const modal = document.getElementById("whatsapp-widget-open-modal");
    const widgetChat = document.getElementById("whatsapp-widget-chat");
    const widgetTarget = document.getElementById("whatsapp-widget-target");

    const setEventClickClose = () => {
        close.addEventListener("click", function() {
            widgetChat.style.cssText = "visibility: hidden; opacity: 0";
        });
    }

    const setEventClickModal = () => {
        modal.addEventListener("click", function(e) {
            e.preventDefault();
            modalWhatsapp();
            widgetChat.style.cssText = "visibility: hidden; opacity: 0";
        });
    }

    const setEventClickWhatsappIcon = () => {
        const simulateMessage = () => {
            const messageBot = document.querySelector('#messageBot');
            const userBot = document.querySelector('#userBot');
            const msgBot = document.querySelector('#msgBot');
            const dateBot= document.querySelector('#dateBot');
            const statusBot = document.querySelector('#statusBot');
            
            messageBot.style.display = 'none';
            userBot.innerHTML = ``;
            msgBot.innerHTML = ``;
            statusBot.innerHTML = paramsDefault.optionsBot.messageTyping;
            dateBot.innerHTML = ``;
            
            clearTimeout(timer)

            timer = setTimeout(() => {
                messageBot.style.display = 'block';
                userBot.innerHTML = paramsDefault.optionsBot.name;
                msgBot.innerHTML = paramsDefault.optionsBot.messageDefault;
                statusBot.innerHTML = `Online`;
                dateBot.innerHTML = timeNow();
            }, 2000);
        }

        widgetTarget.addEventListener("click", function(e) {
            e.preventDefault();

            if (window.getComputedStyle(widgetChat).getPropertyValue("opacity") == '0') {
                widgetChat.style.cssText = "visibility: visible; opacity: 1";
                simulateMessage();
            } else {
                widgetChat.style.cssText = "visibility: hidden; opacity: 0";
            }
        })
    }
    
    setEventClickModal();
    setEventClickWhatsappIcon();
    setEventClickClose();
}

function modalWhatsapp() {
    const x = screen.width  / 2 - 800 / 2;
    const y = screen.height / 2 - 550 / 2;
    const messageInput=document.getElementById("whatsapp-widget-chat-input");

    let message = messageInput.value;

    if (message.length === 0) message = paramsDefault.optionsChat.message;
    
    window.open(
        `${paramsDefault.optionsChat.buttonTarget}phone=${paramsDefault.optionsChat.phone}&text=${encodeURIComponent(message)}`, 
        ``,
        `height=550,width=800,left=${x},top=${y}`
    );
}

function timeNow() {
    const timeString = new Date().toTimeString();

    return timeString.substring(0, 5);
}
