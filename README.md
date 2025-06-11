# Developers Escape (Devvscape) 🚀

A mobile-first application providing code-related humor and entertainment for developers. Built with modern web technologies and following best practices in mobile development.

## 📥 Download

[![Get it on Google Play](https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.silkwebhq.devvscapecode)

## ✨ Features

- [x] Code-related humor content
- [x] Mobile-first responsive design
- [x] Push notifications support
- [x] In-app browser functionality
- [x] AdMob integration
- [x] Offline support with service workers
- [x] Multi-language support
- [x] Progressive Web App (PWA) capabilities

## 🛠️ Technology Stack

- [x] Angular 18
- [x] Ionic Framework
- [x] Firebase Backend
- [x] Capacitor for Native Features
- [x] TypeScript
- [x] RxJS for Reactive Programming
- [x] NgRx for State Management
- [x] Transloco for Internationalization

## 📱 Platform Support

- [x] Web Application
- [x] Android Mobile App
- [x] Progressive Web App (PWA)

## 🚀 Getting Started

### Prerequisites

- [ ] Node.js (Latest LTS version)
- [ ] npm (comes with Node.js)
- [ ] Android Studio (for Android development)
- [ ] Firebase Account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/{your-username}/devvscape-code-humor.git
cd devvscape
```

2. Install dependencies:

```bash
npm install --force
```

3. Configure Firebase:

- Create a Firebase project at https://console.firebase.google.com/
- Copy your Firebase configuration to `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-messaging-sender-id',
    appId: 'your-app-id',
  },
};
```

4. Run the development server:

```bash
ionic serve
```

5. Build for Android:

```bash
# Build the app
ionic capacitor build

# Sync web code to native project
npx cap sync

# Open in Android Studio
npx cap open android
```

Visit `http://localhost:4200` in your browser to see the web version.

## 🏗️ Project Structure

```
devvscape/
├── src/                    # Source files
├── android/               # Android native project
├── www/                   # Web build output
├── resources/            # App resources
├── public/              # Public assets
└── ...config files
```

## 🤝 Contributing

We welcome contributions! Please check out our contributing guidelines before submitting pull requests.

## 📱 Connect With Us

- [Twitter](https://twitter.com/l00pinfinity)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Made with ❤️ by the Devvscape Team

---

**Note**: This project is actively maintained. For any issues or feature requests, please open an issue in the repository.
