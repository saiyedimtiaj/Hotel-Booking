# Full Stack Room Booking Website with MERN stack
![Copy of Fullstack Twitter Clone (8)](https://i.ibb.co/9NZ6MTp/airbnb.png)

Welcome to our Room Booking Website repository! Here you'll find everything you need to know about our platform, designed to provide users with a seamless booking experience.

## Features:

### Responsive Design

Our website is optimized for various devices, ensuring a smooth experience for users on desktops, tablets, and mobile phones.
### Role-Based Authentication

We employ a sophisticated role system authentication, allowing different levels of access for users, managers, and administrators.
### Image Upload with ImgBB

Easily upload images of your rooms using ImgBB, ensuring high-quality visuals to entice potential guests.
### Authentication with Firebase

Secure user authentication is implemented using Firebase, ensuring the safety of user data.
### Beautiful Landing Page

Our landing page is meticulously crafted, featuring a stunning banner section, showcasing featured rooms, and displaying customer testimonials.
### Dynamic Search and Filtering

Find the perfect room with our dynamic search bar, allowing users to filter by location, guest count, bathroom count, and bedroom count, just like Airbnb.
### Wishlist System

Users can save their favorite rooms to their wishlist for easy access later.
### Booking and Payment

Book your desired room seamlessly using our calendar system and complete payment securely via Stripe.
### Review System

After booking a room, users can leave reviews to share their experiences with others.
### My Trips Page

Users can manage all their bookings in one place and have the option to remove them if needed.
### Manager Role

Managers have the ability to add, edit, and delete rooms, as well as view bookings associated with the rooms they manage.
### Admin Role

Administrators have access to detailed analytics, including profit charts and top affiliates. They can also edit room statuses, view all bookings, and manage the website.

# Get Started

Clone the repository and follow the setup instructions in the README to launch your own Room Booking Website!

### Cloning the repository

```shell
git clone https://github.com/saiyedimtiaj/Hotel-Booking.git
```
### Change Directory to Backend

```shell
cd backend
```
### Install packages

```shell
npm i
```
### Setup .env file

```shell
DB_USER = Your Database Name
DB_PASS = Your Database password
STRIPE_PAYMENT_SECRET = Your stripe payment secrate key
```
### Start Server

```shell
nodemon index.js
```

### Open Another Power 
### Change Directory to Client

```shell
cd backend
```

### Install packages

```shell
npm i
```

### Setup .env file

```shell
VITE_apiKey=Firebase api key
VITE_authDomain=Firebase authDomain
VITE_projectId=Firebase ProjectId
VITE_storageBucket=Firebse storageBucket
VITE_messagingSenderId=Firebase messagingSenderId
VITE_appId=Firebase appId

VITE_Stripe_Publishable_Key=Your stripe Publishable Key

VITE_Imgbb_Api_Key= Your Imgbb image api key
```
### Start The app

```shell
npm run dev
```
