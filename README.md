# 📬 maxHome – Email Inbox UI (React + TypeScript)

A lightweight **email inbox web app** built using **React + TypeScript**, featuring configurable **partner themes**, **read/unread states**, and **local-only state management** — no backend required.

---

## 🚀 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/nishasingla1224/maxHome.git
cd maxHome

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

---

## 🧩 Config System Design

This app supports **Partner Configurations (A & B)** that control feature toggles such as snippet visibility and spam marking.

### ⚙️ How It Works

Partner configurations are stored in an array inside **PartnerConfigContext.tsx**.

A React Context (`PartnerProvider`) provides:

- `partner`: Current partner configuration
- `config`: Feature and theme settings
- `available`: All partner options
- `setPartner()`: Function to switch partner

Changing the dropdown triggers a context update that re-renders components:

- **Inbox** shows/hides the email snippet (`config.emailSnippet`)
- **Mark as Spam** button is visible only if `config.allowMarkSpam` is true

---

## 💡 Features

✅ Displays list of emails with sender, subject, date, and optional snippet  
✅ Each email includes a checkbox for selection  
✅ Click an email to open detailed view  
✅ Visual distinction between read/unread emails  
✅ Toolbar actions for selected emails:

- Mark as Read
- Mark as Unread
- Mark as Spam _(if enabled by config)_
- Delete Selected  
  ✅ Configurable Partner themes (A/B)  
  ✅ Clean custom CSS (no Tailwind)  
  ✅ Local-only state (no backend)

---

## 🧠 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Context API** for state management
- **Custom CSS** for styling

---

## 🖼️ UI Preview

_(Add screenshots or a GIF demo here if available)_

---

## 🧑‍💻 Author

**Nisha Singla**  
[GitHub Profile](https://github.com/nishasingla1224)
