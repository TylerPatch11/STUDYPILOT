# StudyPilot

**Everything you need to study, automatically.**

StudyPilot is an AI-powered study platform that helps students organize their study materials and automatically generates cheat sheets, flashcards, quizzes, and study plans.

## 🚀 Features

- **Cheat Sheet Generator** - Upload PDFs, DOCX, or PPTX files and get instant, comprehensive cheat sheets
- **Flashcards** (Coming Soon) - Interactive flashcards for memorization
- **Quiz Maker** (Coming Soon) - Generate practice quizzes from your materials
- **Study Planner** (Coming Soon) - Personalized study schedules
- **Class Overview** - Organize and track your courses
- **Stripe Billing** - Free tier (3 cheat sheets/month) and Pro tier (unlimited)

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **File Storage:** Firebase Storage
- **AI:** OpenAI GPT-4o-mini
- **Payments:** Stripe
- **Deployment:** Vercel-ready

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Firebase project created
- OpenAI API key
- Stripe account (for payments)

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd STUDYPILOT
npm install
# or
yarn install
# or
pnpm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google sign-in
4. Create a Firestore database:
   - Go to Firestore Database
   - Create database in production mode
   - Start in test mode (or configure security rules)
5. Set up Firebase Storage:
   - Go to Storage
   - Get started with default security rules
6. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click the web icon (</>) to add a web app
   - Copy the Firebase configuration object

### 3. OpenAI Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an API key
3. Ensure you have credits in your account

### 4. Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create a product and price for "Pro Plan" ($7.99/month, recurring)
3. Copy the Price ID (starts with `price_`)
4. Get your API keys:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)
5. Set up webhooks (for production):
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the webhook signing secret (starts with `whsec_`)

### 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_PRO_PRICE_ID=price_your_pro_price_id

# OpenAI Configuration
OPENAI_API_KEY=sk-your_openai_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note:** For production, use production Stripe keys and update `NEXT_PUBLIC_APP_URL` to your domain.

### 6. Firebase Security Rules

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Cheat sheets - users can only access their own
    match /cheatSheets/{cheatSheetId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
    
    // Classes - users can only access their own
    match /classes/{classId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

Update your Storage security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚀 Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Building for Production

```bash
npm run build
npm start
```

## 📦 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add all environment variables in Vercel project settings
4. Deploy!

Vercel will automatically:
- Detect Next.js
- Run the build command
- Deploy your app

### Important for Production

1. **Update environment variables** with production keys
2. **Set up Stripe webhook** with your production URL
3. **Configure Firebase** for production domain
4. **Update Firestore rules** for production security

## 📁 Project Structure

```
STUDYPILOT/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── app/               # Authenticated app pages
│   ├── auth/              # Authentication pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── auth/              # Auth components
│   ├── layout/            # Layout components
│   └── ui/                # UI components
├── lib/                   # Utility libraries
│   ├── ai/                # AI service
│   ├── firebase/          # Firebase config & helpers
│   └── stripe/            # Stripe helpers
├── public/                # Static assets
└── styles/                # Global styles
```

## 🔐 Security Notes

- Never commit `.env.local` or `.env` files
- Use Firebase security rules to protect data
- Validate user input on both client and server
- Use Stripe webhooks for reliable payment processing
- Store sensitive keys in environment variables only

## 🐛 Troubleshooting

### Firebase Auth Not Working
- Check that all Firebase environment variables are set correctly
- Verify Firebase Authentication is enabled in Firebase Console
- Check browser console for specific error messages

### File Upload Fails
- Verify Firebase Storage is enabled
- Check Storage security rules
- Ensure file size is within limits

### AI Generation Fails
- Verify OpenAI API key is correct
- Check that you have credits in your OpenAI account
- Check API route logs for errors

### Stripe Checkout Not Working
- Verify Stripe keys are correct
- Check that `STRIPE_PRO_PRICE_ID` matches your Stripe product
- Ensure webhook secret is set (for production)

## 📝 Known Limitations

- Server-side Firebase Admin SDK not fully implemented (using client-side auth for MVP)
- Image OCR not yet implemented
- PPTX text extraction is limited
- Webhook handling for subscription updates needs enhancement

## 🔄 Future Enhancements

- Full Firebase Admin SDK integration
- Image OCR support
- Enhanced PPTX parsing
- Flashcard generation
- Quiz generation
- Study plan creation
- Mobile app
- Collaboration features

## 📄 License

This project is proprietary. All rights reserved.

## 💬 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for students everywhere.
