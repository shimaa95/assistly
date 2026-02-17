(function() {
  'use strict';

  // Configuration
  const CHATBOT_CONFIG = window.ASSISTLY_CHATBOT_CONFIG || {};
  const chatbotId = CHATBOT_CONFIG.chatbotId;
  const position = CHATBOT_CONFIG.position || 'bottom-right';
  const baseUrl = CHATBOT_CONFIG.baseUrl || window.location.origin;

  if (!chatbotId) {
    console.error('Assistly: chatbotId is required. Please set window.ASSISTLY_CHATBOT_CONFIG = { chatbotId: "YOUR_ID" }');
    return;
  }

  // Create styles
  const styles = document.createElement('style');
  styles.textContent = `
    .assistly-chat-widget {
      position: fixed;
      z-index: 9999;
      ${position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
      ${position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
    }

    .assistly-chat-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4D7DFB 0%, #2991EE 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(77, 125, 251, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .assistly-chat-button:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(77, 125, 251, 0.5);
    }

    .assistly-chat-button svg {
      width: 28px;
      height: 28px;
      fill: white;
    }

    .assistly-chat-iframe-container {
      position: fixed;
      ${position.includes('bottom') ? 'bottom: 90px;' : 'top: 90px;'}
      ${position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
      width: 400px;
      height: 600px;
      max-height: calc(100vh - 120px);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      display: none;
      z-index: 9998;
      background: white;
    }

    .assistly-chat-iframe-container.open {
      display: block;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .assistly-chat-iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 12px;
    }

    @media (max-width: 480px) {
      .assistly-chat-iframe-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        max-height: 100vh;
        border-radius: 0;
      }
    }
  `;
  document.head.appendChild(styles);

  // Create widget container
  const widgetContainer = document.createElement('div');
  widgetContainer.className = 'assistly-chat-widget';

  // Create chat button
  const chatButton = document.createElement('button');
  chatButton.className = 'assistly-chat-button';
  chatButton.setAttribute('aria-label', 'Open chat');
  chatButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
    </svg>
  `;

  // Create iframe container
  const iframeContainer = document.createElement('div');
  iframeContainer.className = 'assistly-chat-iframe-container';

  // Create iframe
  const iframe = document.createElement('iframe');
  iframe.className = 'assistly-chat-iframe';
  iframe.src = `${baseUrl}/embed/${chatbotId}`;
  iframe.setAttribute('allow', 'clipboard-write');
  iframe.setAttribute('title', 'Assistly Chat Widget');

  // Assemble widget
  iframeContainer.appendChild(iframe);
  widgetContainer.appendChild(chatButton);
  document.body.appendChild(widgetContainer);
  document.body.appendChild(iframeContainer);

  // Toggle chat
  let isOpen = false;
  chatButton.addEventListener('click', function() {
    isOpen = !isOpen;
    if (isOpen) {
      iframeContainer.classList.add('open');
      chatButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
      `;
      chatButton.setAttribute('aria-label', 'Close chat');
    } else {
      iframeContainer.classList.remove('open');
      chatButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      `;
      chatButton.setAttribute('aria-label', 'Open chat');
    }
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      chatButton.click();
    }
  });

  console.log('Assistly Chat Widget loaded successfully');
})();
