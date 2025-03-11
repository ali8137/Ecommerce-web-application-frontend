# Ecommerce-web-application-frontend

---

## Description
This is a full-stack e-commerce application built using Spring Boot for the backend and React.js for the frontend. The application allows users to browse products, add them to the shopping cart, and complete purchases.

---

## Table of Contents
- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

---

## Features
- User authentication and authorization
- Product listing with search and filter options
- Shopping cart management
- Order placement and checkout process
- Admin panel for managing products and orders

---

## Installation

### Prerequisites
- Node.js v18.19.1
- Npm 10.7.0

### Setup
1. to install React + Vite, run the following command:

```bash
npm create vite@latest Ecommerce-frontend -- --template react
```

**React + Vite:**

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


2. after installing the React + Vite app, install the dependencies by running the following commands:

```bash
cd Ecommerce-frontend
npm install
```

---

## Dependencies
1. [material UI (MUI)](https://mui.com/material-ui/getting-started/installation/)
[material UI icons](https://mui.com/material-ui/icons/)

2. [tailwindcss](https://tailwindcss.com/docs/guides/vite)

3. install hadlessui/react by running the following command: `npm install @hadlessui/react`
install heroicons/react by running the following command: `npm install @heroicons/react`

> **further information:** the above dependencies are installed to use the store-navigation offered by 'tailwindui'

💡 **TODO:** 
- [x] update the above "dependencies" section by specifying the versions of the above dependnecies, and by adding the rest of the dependencies

---

## application structure:


### folder structure
💡 **TODO:** 
- [ ] add this section

### exception handling
💡 **TODO:** 
- [ ] add this section

### API calling:
two approaches were used:
- calling throught async thunk using redux toolkit
- calling directly through API calls in a dedicated "api.jsx" file

---

## Usage
After setting up the project, you can start using it as follows:

### Running the Application

- once the backend server is running at http://localhost:8088, you can access the app at http://localhost:5173

- To start the application, run the following command:

`npm start`


---

## Deployment

💡 **TODO:** 
- [ ] update this section
