# Assistly Chat Widget - Embed Guide

This guide explains how to embed the Assistly chatbot on any website.

## Quick Start

Add the following code snippet just before the closing `</body>` tag of your website:

```html
<script>
  window.ASSISTLY_CHATBOT_CONFIG = {
    chatbotId: 'YOUR_CHATBOT_ID',
    position: 'bottom-right',
    baseUrl: 'https://your-domain.com'
  };
</script>
<script src="https://your-domain.com/embed.js"></script>
```

## Configuration Options

### Required
- **chatbotId** (string): The ID of your chatbot. You can find this in your chatbot URL.

### Optional
- **position** (string): Position of the chat widget. Options:
  - `'bottom-right'` (default)
  - `'bottom-left'`
  - `'top-right'`
  - `'top-left'`
  
- **baseUrl** (string): Your Assistly application URL. If omitted, it will use the current page's origin.

## Example Usage

### Basic Implementation

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to my website</h1>
  
  <!-- Your website content -->
  
  <!-- Assistly Chat Widget -->
  <script>
    window.ASSISTLY_CHATBOT_CONFIG = {
      chatbotId: '123',
      position: 'bottom-right',
      baseUrl: 'https://assistly.vercel.app'
    };
  </script>
  <script src="https://assistly.vercel.app/embed.js"></script>
</body>
</html>
```

### Bottom Left Position

```html
<script>
  window.ASSISTLY_CHATBOT_CONFIG = {
    chatbotId: '123',
    position: 'bottom-left'
  };
</script>
<script src="https://your-domain.com/embed.js"></script>
```

## How It Works

1. The embed script creates a floating chat button on your website
2. When clicked, it opens a chat window in an iframe
3. The iframe loads your chatbot from the `/embed/[id]` route
4. The widget is fully responsive and works on mobile devices

## Features

- Floating chat button with smooth animations
- Responsive design (full screen on mobile)
- Keyboard accessible (ESC to close)
- Customizable position
- No dependencies required
- Works on any website

## Finding Your Chatbot ID

Your chatbot ID is the number in your chatbot URL:
- URL: `https://your-domain.com/chatbot/123`
- ID: `123`

## Troubleshooting

### Widget not appearing?
- Check that the `chatbotId` is correct
- Verify that the `baseUrl` matches your Assistly deployment URL
- Check the browser console for any errors

### iframe not loading?
- Ensure your website allows iframes
- Check CORS settings if embedding on a different domain

## Security Notes

- The embed script is loaded from your domain, ensuring security
- The chatbot runs in an isolated iframe
- User data is only sent to your Assistly backend

## Support

For issues or questions about embedding the chatbot, please contact your Assistly administrator.
