website url : https://inclusivaid.vercel.app/

Inclusivaid

About
Inclusivaid is a reporting system designed to empower users to anonymously report issues they've encountered, such as bullying or other problems. The platform provides a secure and user-friendly interface for submitting detailed reports with optional contact information, helping to create a safer environment.

Features

Anonymous Reporting: Users can submit reports without providing their identity.
Detailed Reporting Form: A clear form allows users to describe the problem, its type, and the institution involved.
Optional Contact Details: Users have the option to provide contact information for follow-up if they wish.
Secure and Reliable: Built with Firebase, ensuring data is stored securely and reliably.

Technologies Used

Frontend:

React.js (or similar modern JavaScript framework)
HTML, CSS, JavaScript

Backend & Database:

Firebase Hosting
Firebase Firestore

Getting Started

Prerequisites

To get a copy of this project up and running on your local machine, you will need:
Node.js (v14.x or later)
npm (v6.x or later)
Git

Installation

Clone the repository:
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name

Install dependencies:

npm install
Configure Firebase:
Create a new project in the Firebase Console.
Set up a Firestore Database and enable Authentication.
Copy your Firebase configuration object and add it to your project's code (e.g., in a .env file or directly in the Firebase initialization script).

Run the application:

npm start

Deployment

To deploy the application, you can use Firebase Hosting.
Install Firebase CLI:
npm install -g firebase-tools
Log in to Firebase:
firebase login
Initialize your project:
firebase init

Follow the prompts to connect your local project to your Firebase project.

Build and Deploy:

npm run build
firebase deploy --only hosting

Contribution

Contributions are welcome! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.
