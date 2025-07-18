# Login with Webex Samples

This repository contains samples for logging in with Webex Platform using Open ID Connect, known as "Login with Webex". These interactive samples demonstrate different OpenID Connect flows and provide practical examples for implementing Webex authentication in your applications.

## 📋 Overview

Login with Webex lets users login to your app or service using their Webex account. Login with Webex is based on OpenID Connect, an identity layer built on the OAuth 2.0 protocol. Standard Webex Integrations use OAuth flows to obtain access tokens for making API calls on a user's behalf. Login with Webex uses those same flows, with some additional parameters, to obtain ID tokens. ID tokens are signed, Base64-encoded JSON Web Tokens (JWTs) that act as proof a user authenticated with Webex, and that contain information ("claims") about the authenticated user, such as their email or name.

## 📚 Documentation

**Official Documentation**: https://developer.webex.com/docs/login-with-webex

## 🚀 Try It Out

Try it out by choosing one of the available flows: https://webexsamples.github.io/login-with-webex

## 🎯 Available Flows

This repository demonstrates two main OpenID Connect flows:

### 1. ID Token Flow (`response_type=id_token`)
- **File**: `openid3.html`
- **Description**: Simple implicit flow returning an ID token directly
- **Best For**: Single-page applications with minimal security requirements
- **Flow Diagram**: [OpenID Connect ID Token Flow](https://darutk.medium.com/diagrams-of-all-the-openid-connect-flows-6968e3990660#:~:text=3.%20response_type%3Did_token)

### 2. Authorization Code with PKCE Flow
- **File**: `pkce.html`
- **Description**: More secure flow using PKCE (Proof Key for Code Exchange)
- **Best For**: Public clients and mobile/SPA applications requiring enhanced security
- **Flow Diagram**: [OpenID Connect Authorization Code + PKCE Flow](https://darutk.medium.com/diagrams-of-all-the-openid-connect-flows-6968e3990660#:~:text=3.%20response_type%3Did_token)

## 📁 Project Structure

```
login-with-webex/
├── src/
│   └── index.js          # Express server for local development
├── docs/                 # Static web files (GitHub Pages)
│   ├── index.html        # Main navigation page
│   ├── openid3.html      # ID Token flow demo
│   ├── pkce.html         # PKCE flow demo
│   ├── pkce.js           # PKCE implementation
│   ├── common.js         # Shared utilities
│   ├── main.css          # Styling
│   ├── juno.jpg          # Demo images
│   └── webexlogo.png     # Webex branding
├── package.json          # Node.js dependencies
└── README.md            # This file
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Webex Developer Account
- Webex Integration (OAuth client)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/WebexSamples/login-with-webex.git
   cd login-with-webex
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Setting up a Webex Integration

1. **Go to Webex Developer Portal**: https://developer.webex.com/
2. **Create an Integration**: Follow the [getting started guide](https://developer.webex.com/docs/login-with-webex#getting-started)
3. **Configure Redirect URIs**: Add your application URLs
   - For local development: `http://localhost:3000/openid3.html`
   - For PKCE demo: `http://localhost:3000/pkce.html`
   - For production: Your actual domain URLs

### Required Scopes

- `openid`: Required for OpenID Connect
- `email`: Access to user's email address
- Additional scopes as needed for your application

## 💡 Usage Examples

### ID Token Flow (openid3.html)

**Features**:
- Simple implicit flow
- Direct ID token return
- Automatic JWT parsing
- User claim extraction

**Implementation**:
```javascript
// Redirect to Webex authorization
let authUrl = 'https://webexapis.com/v1/authorize?' +
    'response_type=id_token' +
    '&client_id=YOUR_CLIENT_ID' +
    '&redirect_uri=YOUR_REDIRECT_URI' +
    '&scope=openid%20email' +
    '&state=' + Math.random() +
    '&nonce=' + Math.random();
window.location.href = authUrl;
```

**ID Token Claims**:
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "name": "John Doe",
  "iss": "https://webexapis.com/v1",
  "aud": "your-client-id",
  "exp": 1234567890,
  "iat": 1234567890
}
```

### PKCE Flow (pkce.html)

**Features**:
- Enhanced security with PKCE
- Step-by-step demonstration
- Interactive form interface
- Full OAuth code flow

**PKCE Implementation**:
```javascript
// Generate PKCE codes
function generateCodeVerifier() {
    return generateRandomString(128);
}

function generateCodeChallenge(verifier) {
    return base64URL(CryptoJS.SHA256(verifier));
}

// Authorization request
let authUrl = 'https://webexapis.com/v1/authorize?' +
    'response_type=code' +
    '&client_id=' + clientId +
    '&redirect_uri=' + redirectUri +
    '&scope=openid%20email' +
    '&code_challenge=' + codeChallenge +
    '&code_challenge_method=S256';
```

**Token Exchange**:
```javascript
// Exchange authorization code for access token
const tokenResponse = await fetch('https://webexapis.com/v1/access_token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        'grant_type': 'authorization_code',
        'client_id': clientId,
        'client_secret': clientSecret,
        'code': authCode,
        'code_verifier': codeVerifier,
        'redirect_uri': redirectUri
    })
});
```

## 🔐 Security Considerations

### ID Token Flow
- **Use Case**: Simple applications with minimal security requirements
- **Limitations**: Less secure than authorization code flow
- **Best Practice**: Use only for public demos and testing

### PKCE Flow
- **Use Case**: Production applications requiring enhanced security
- **Security**: Mitigates authorization code interception attacks
- **Best Practice**: Recommended for all public clients

### Important Notes

⚠️ **Client Secret Warning**: The PKCE demo exposes the client secret for demonstration purposes only. In production:
- Never expose client secrets in client-side code
- Use server-side token exchange
- Implement proper secret management

## 📊 API Endpoints

### Authorization Endpoint
```
GET https://webexapis.com/v1/authorize
```

**Parameters**:
- `response_type`: `id_token` or `code`
- `client_id`: Your Webex Integration Client ID
- `redirect_uri`: Registered redirect URI
- `scope`: `openid email` (minimum required)
- `state`: CSRF protection parameter
- `nonce`: Replay attack protection
- `code_challenge`: PKCE code challenge (for code flow)
- `code_challenge_method`: `S256` (for PKCE)

### Token Endpoint
```
POST https://webexapis.com/v1/access_token
```

**Parameters**:
- `grant_type`: `authorization_code`
- `client_id`: Your Client ID
- `client_secret`: Your Client Secret
- `code`: Authorization code from callback
- `code_verifier`: PKCE code verifier
- `redirect_uri`: Same as authorization request

### UserInfo Endpoint
```
GET https://webexapis.com/v1/userinfo
Authorization: Bearer ACCESS_TOKEN
```

**Response**:
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "name": "John Doe",
  "given_name": "John",
  "family_name": "Doe",
  "picture": "https://avatar.webex.com/..."
}
```

## 🧪 Testing

### Local Testing
1. Start the development server: `npm start`
2. Navigate to `http://localhost:3000`
3. Choose your desired flow (ID Token or PKCE)
4. Enter your Webex Integration credentials
5. Test the authentication flow

### Integration Testing
- Test with different user accounts
- Verify token validation
- Check claim extraction
- Test error handling scenarios

## 🎨 Customization

### Styling
Modify `main.css` to customize the appearance:
- Update colors and fonts
- Modify layout and spacing
- Add your branding elements

### JavaScript Customization
- `common.js`: Shared utilities and JWT parsing
- `pkce.js`: PKCE-specific implementation
- Add additional claim processing
- Implement custom error handling

## 🌐 Deployment

### GitHub Pages
The repository is configured for GitHub Pages deployment:
- Static files in `/docs` directory
- Automatic deployment on push to main branch
- Live demo at: https://webexsamples.github.io/login-with-webex

### Custom Deployment
For custom deployment:
1. Build your static files
2. Deploy the `/docs` directory to your web server
3. Update redirect URIs in your Webex Integration
4. Configure HTTPS (recommended for production)

## 📈 Advanced Features

### JWT Token Parsing
```javascript
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
}
```

### PKCE Code Generation
```javascript
function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let text = '';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function base64URL(string) {
    return string
        .toString(CryptoJS.enc.Base64)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}
```

## 🔧 Dependencies

```json
{
  "dependencies": {
    "express": "^4.17.3",
    "nodemon": "^2.0.15",
    "openid-client": "^5.1.3"
  }
}
```

### Key Dependencies
- **express**: Web framework for local development server
- **nodemon**: Development tool for auto-restarting server
- **openid-client**: OpenID Connect client library

### Client-Side Dependencies
- **CryptoJS**: For PKCE code generation (loaded via CDN)
- **Native Web APIs**: fetch, URLSearchParams, localStorage, sessionStorage

## 🚨 Troubleshooting

### Common Issues

**Invalid Redirect URI**
- Ensure redirect URI matches exactly in your Integration settings
- Check for trailing slashes or port differences

**CORS Errors**
- Webex APIs support CORS for browser-based requests
- Ensure proper origin configuration in your Integration

**Token Validation Failures**
- Verify client ID and secret are correct
- Check token expiration times
- Ensure proper scope configuration

**PKCE Generation Issues**
- Verify CryptoJS library is loaded
- Check code verifier length (43-128 characters)
- Ensure code challenge uses S256 method

### Debug Mode
Enable browser developer tools to inspect:
- Network requests to Webex APIs
- Console logs for error messages
- Local storage for PKCE codes
- JWT token contents

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Test with both authentication flows
5. Submit a pull request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test with multiple user scenarios
- Ensure security best practices

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🌟 Don't be a Stranger

- [Webex Developer Documentation](https://developer.webex.com/docs)
- [Webex Developer Blog](https://developer.webex.com/blog)
- [Webex Developer Support](https://developer.webex.com/support)
- [@WebexDevs on Twitter](https://twitter.com/webexdevs)

## 🔗 Related Resources

- [OpenID Connect Specification](https://openid.net/connect/)
- [OAuth 2.0 PKCE RFC](https://tools.ietf.org/html/rfc7636)
- [Webex Integration Guide](https://developer.webex.com/docs/integrations)
- [JWT.io Token Decoder](https://jwt.io/)

## 🆘 Support

- Create an issue in this repository
- Review [Login with Webex Documentation](https://developer.webex.com/docs/login-with-webex)
- Contact [Webex Developer Support](https://developer.webex.com/support)

---

Made with ❤️ by the Webex Developer Evangelism & Engineering Teams at Cisco

**Repository**: https://github.com/WebexSamples/login-with-webex  
**Live Demo**: https://webexsamples.github.io/login-with-webex
