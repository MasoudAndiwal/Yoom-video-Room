# Yoom Video Room Application

## Overview

Yoom Video Room is a comprehensive video meeting application built with Next.js 15.1.8 and the Stream.io video SDK. It provides a seamless and feature-rich video conferencing experience with real-time communication capabilities. The application enables users to schedule, join, and manage video meetings with a clean and intuitive interface, designed for both professional and personal use cases.

## Features

- **Authentication**: Secure user authentication powered by Clerk
- **Personal Meeting Rooms**: Dedicated persistent rooms for each user with custom settings
- **Meeting Scheduling**: Create and schedule upcoming meetings with calendar integration
- **Meeting History**: View and access previous meetings with detailed analytics
- **Recording Management**: Record, store, and share meeting recordings
- **Real-time Video Conferencing**: High-quality video and audio communication with minimal latency
- **Screen Sharing**: Share your screen during meetings with annotation capabilities
- **Chat Functionality**: In-meeting chat with message persistence
- **User Presence**: See who's online and available for meetings
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark/Light Mode**: Support for different visual preferences

## Tech Stack

- **Frontend Framework**: Next.js 15.1.8 with Turbopack
- **React**: React 19.0.0
- **Authentication**: @clerk/nextjs v6.20.0
- **Video SDK**: @stream-io/video-react-sdk v1.18.1
- **UI Components**: Radix UI components (@radix-ui/react-*)
- **UI Library**: shadcn/ui for consistent design patterns
- **Styling**: TailwindCSS 3.4.1 with custom theme configuration
- **TypeScript**: Fully typed codebase for improved developer experience
- **State Management**: React Context API and custom hooks
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation

## Project Structure

```
/
├── app/                      # Next.js app directory
│   ├── (auth)/               # Authentication routes
│   │   ├── sign-in/          # Sign-in page
│   │   └── sign-up/          # Sign-up page
│   └── (root)/               # Main app routes
│       └── (home)/           # Home routes
│           ├── PersonalRoom/ # Personal meeting room
│           ├── Previous/     # Previous meetings
│           ├── Recordings/   # Meeting recordings
│           ├── Upcoming/     # Upcoming meetings
│           └── meeting/      # Meeting pages
├── components/               # Reusable components
├── hooks/                    # Custom React hooks
├── Providers/                # Context providers
├── actions/                  # Server actions
├── lib/                      # Utility functions
└── public/                   # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, pnpm, or bun package manager
- Stream.io account for video SDK
- Clerk account for authentication

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stream.io
NEXT_PUBLIC_STREAM_VIDEO_API_KEY=your_stream_api_key
STREAM_VIDEO_API_SECRET=your_stream_api_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

You can obtain the Clerk keys by creating an account at [clerk.com](https://clerk.com) and setting up an application. For Stream.io keys, sign up at [getstream.io](https://getstream.io) and create a project with video capabilities.

### Installation

1. Clone the repository

```bash
git clone https://github.com/MasoudAndiwal/Yoom-video-Room.git
cd Yoom-video-Room
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Build and Production

To build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

To start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Deployment

The application can be easily deployed on [Vercel](https://vercel.com) or any other hosting platform that supports Next.js.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## About Me

Hi, I'm Masoud Andiwal, a full-stack developer with a passion for building modern web applications. I specialize in React, Next.js, and TypeScript development with a focus on creating intuitive user experiences.

### Connect With Me

- **GitHub**: [MasoudAndiwal](https://github.com/MasoudAndiwal)
- **LinkedIn**: [Masoud Andiwal](https://linkedin.com/in/masoudandiwal)
- **Portfolio**: [masoudandiwal.com](https://masoud-andiwal.netlify.app)
- **Email**: masoudandiwal89@gmail.com

### My Journey

I've been developing web applications for over 5 years, with a particular interest in real-time communication technologies. Yoom Video Room represents my exploration into building a comprehensive video conferencing solution that addresses the needs of modern remote collaboration.

Feel free to reach out if you have any questions about this project or if you're interested in collaborating on future developments!

## Features in Development

- **Breakout Rooms**: Split meetings into smaller groups
- **Virtual Backgrounds**: Customize your video background
- **Meeting Transcription**: Automatic transcription of meetings
- **Advanced Analytics**: Detailed insights into meeting usage and patterns
- **Mobile Applications**: Native mobile apps for iOS and Android

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

If you encounter any issues:

1. Make sure all environment variables are correctly set
2. Check that you're using a compatible Node.js version (18.0.0+)
3. Clear browser cache if experiencing UI issues
4. For Stream.io related issues, refer to their [documentation](https://getstream.io/video/docs/)
5. For Clerk authentication issues, check their [troubleshooting guide](https://clerk.com/docs/troubleshooting)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Stream.io](https://getstream.io) for their excellent video SDK
- [Clerk](https://clerk.com) for authentication services
- [Next.js](https://nextjs.org) team for the amazing framework
- [Vercel](https://vercel.com) for hosting and deployment solutions


## Using with Electron.js

To package and run this Next.js application as a desktop application using Electron.js, you would typically follow these general steps:

1.  **Install Electron and Electron Builder**:
    Add Electron and Electron Builder (for packaging) to your project.
    ```bash
    npm install --save-dev electron electron-builder
    # or
    yarn add --dev electron electron-builder
    # or
    pnpm add --save-dev electron electron-builder
    # or
    bun add --dev electron electron-builder
    ```

2.  **Create a Main Electron File**:
    Create a `main.js` (or similar, e.g., `electron/main.js`) in your project's root or a dedicated `electron` directory. This file will be the main process for your Electron app. It will create browser windows to render your Next.js application.

    A basic `main.js` might look like this:
    ```javascript
    const { app, BrowserWindow } = require('electron');
    const path = require('path');
    const isDev = require('electron-is-dev');

    function createWindow() {
      const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false, // Consider security implications
        },
      });

      // Load the Next.js app
      // In development, load from the Next.js dev server
      // In production, load the exported static HTML
      win.loadURL(
        isDev
          ? 'http://localhost:3000' // Your Next.js dev server URL
          : `file://${path.join(__dirname, '../out/index.html')}` // Path to Next.js export
      );

      if (isDev) {
        win.webContents.openDevTools();
      }
    }

    app.whenReady().then(createWindow);

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
    ```

3.  **Configure `package.json`**:
    -   Set the `main` field in your `package.json` to point to your Electron main file (e.g., `"main": "electron/main.js"`).
    -   Add scripts to run and build the Electron app.
        -   You'll need a script to start Next.js and Electron concurrently for development.
        -   You'll need a script to first build your Next.js app (e.g., `next build && next export`) and then build the Electron app using `electron-builder`.

    Example scripts:
    ```json
    "scripts": {
      // ... your existing scripts
      "electron:dev": "concurrently \"npm run dev\" \"wait-on http://localhost:3000 && electron .\"",
      "electron:build": "next build && next export && electron-builder"
    },
    ```
    You might need to install `concurrently` and `wait-on`:
    ```bash
    npm install --save-dev concurrently wait-on
    ```

4.  **Next.js Configuration for Static Export**:
    If you plan to package your Next.js app for production with Electron, you'll likely need to configure it for static HTML export. In your `next.config.js` (or `next.config.mjs`):
    ```javascript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      // ... other configurations
      output: 'export', // For Next.js 13.4+
      // For older versions, you might need `target: 'serverless'` and then use `next export`
      images: {
        unoptimized: true, // Required for `next export` if using next/image
      },
    };

    module.exports = nextConfig;
    ```
    Ensure your application is compatible with static export, as some Next.js features (like API routes or dynamic server-side rendering in the traditional sense) behave differently or require workarounds in a purely static export.

5.  **Electron Builder Configuration**:
    Add configuration for `electron-builder` in your `package.json` or a separate `electron-builder.yml` file. This specifies how your app should be built for different platforms (Windows, macOS, Linux).
    Example in `package.json`:
    ```json
    "build": {
      "appId": "com.example.yoomvideoroom",
      "productName": "Yoom Video Room",
      "directories": {
        "output": "dist_electron", // Output directory for packaged app
        "buildResources": "build_assets" // Directory for build resources like icons
      },
      "files": [
        "electron/**/*", // Include electron main process files
        "out/**/*",      // Include Next.js static export
        "package.json"
      ],
      "win": {
        "target": "nsis"
      },
      "mac": {
        "target": "dmg"
      },
      "linux": {
        "target": "AppImage"
      }
    }
    ```

6.  **Run and Build**:
    -   **Development**: Run your Next.js dev server and Electron app concurrently.
        ```bash
        npm run electron:dev
        ```
    -   **Production Build**: Build your Next.js app, export it, and then package it with Electron Builder.
        ```bash
        npm run electron:build
        ```

This provides a basic outline. Integrating Next.js with Electron can have nuances depending on your project's specific needs, especially regarding routing, data fetching, and inter-process communication if required. Refer to the official Electron and Next.js documentation for more detailed guidance.
