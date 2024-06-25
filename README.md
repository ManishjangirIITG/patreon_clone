# Patreon Clone
  A Patreon clone built with modern web technologies to allow creators to receive payments from their supporters. This project uses React for the front end, Express and Node.js for the back end, MongoDB for the database, and Next.js for server-side rendering. Authentication is handled by NextAuth, and payments are processed through Razorpay's UPI payment gateway.
  ## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

  ## Features

- User Authentication with NextAuth
- Creator Profiles
- Payment Processing with Razorpay UPI
- Server-Side Rendering with Next.js
- Secure REST API with Express
- Data Storage with MongoDB

## Tech Stack

- **Frontend:** React, Next.js
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** NextAuth
- **Payments:** Razorpay
- **Styling:** CSS, styled-components
- **API Testing:** Postman

  ## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/patreon-clone.git
   cd patreon-clone

2. **Install dependencies:**
    ```sh
    npm install

  ## Configuration
      ```env
        MONGODB_URI=<your-mongodb-connection-string>
        NEXTAUTH_URL=http://localhost:3000
        NEXTAUTH_SECRET=<your-nextauth-secret>
        RAZORPAY_KEY_ID=<your-razorpay-key-id>
        RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
        NEXT_PUBLIC_RAZORPAY_KEY_ID=<your-razorpay-key-id>


  ## Usage

  1. **Start theserver:**
      ```sh
      npm run dev

  3. **Open your browser and navigate to:**
     ```arduino
     http://localhost:3000

  ## Contributing

  1. **Fork the repository.**
  2. **Create a new branch:**
     ```sh
     git checkout -b feature-branch
  3. **Make your changes.**
  4. **Commit your changes:**
     ```sh
     git commit -m 'Add some feature'
  5. **Push to the branch:**
     ```sh
     git push origin feature-branch
  6. **Open a pull request.**

  ## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

     
