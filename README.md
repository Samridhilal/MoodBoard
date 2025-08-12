# **MoodBoard** 🎨😄

**MoodBoard** is a **full-stack MERN application** that allows users to capture their daily mood creatively.  
Each day, users can create a *MoodBoard* consisting of emojis, an image/GIF (via link), a color theme, and a short note.  
The app also stores past moodboards, allowing users to reflect on their mood history over time.  

---

## Demo and Screenshots

### 🎥 Demo Recording
[![Demo Recording](https://drive.google.com/uc?export=view&id=13oAn87kBy_8VHUBzEqHOjSiGmzxvwboT)](https://drive.google.com/file/d/13oAn87kBy_8VHUBzEqHOjSiGmzxvwboT/view?usp=sharing)

### 🖼 Screenshots
**Login**
![Login](https://drive.google.com/uc?export=view&id=1DLbk7OKSK0ODE_aXP_1Hd4uAiLrzNIvo)

**Dashboard**
![Dashboard](https://drive.google.com/uc?export=view&id=1XzSm7xkSBv4I6WyFpzGriHeRnyPfg2Gs)

**Create MoodBoard**
![Create MoodBoard](https://drive.google.com/uc?export=view&id=1i3olgTh67clbu3254Q9f0VmBF7jY58hi)

**Timeline**
![Timeline](https://drive.google.com/uc?export=view&id=1zzJjEjI5hhAI_mfNtadSBjf5RUlYI3fh)

---

## ✨ Features
- **Secure Authentication** – Signup/Login using JWT and protected routes.  
- **Daily MoodBoard Creation** – Each moodboard includes:
  - 😄 One or more emojis  
  - 🖼️ An image or GIF (via URL)  
  - 🎨 A color theme  
  - 📝 A short note (max 200 chars)  
  - **Limit:** Only 1 per user per day  
- **Mood History** – View today’s moodboard or browse all past moodboards in a timeline/list format.  
- **Bonus Features** :
  - Emoji picker for easy emoji selection  
  - Responsive design for mobile & desktop  

---

## 🛠 Tech Stack
**Frontend:** React, React Router, Axios, LocalStorage  
**Backend:** Node.js, Express.js, MongoDB (Mongoose)  
**Auth:** JWT (JSON Web Tokens)   

---

## 🚀 Getting Started

### Clone the repository
```
git clone https://github.com/Samridhilal/moodboard.git
```
## Frontent Setup
```
npm install
npm run dev
```

## Backend Setup
```
cd server
npm install
```

Create a .env file in server/:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
---

Run the server:
```
npm run server:dev
```
