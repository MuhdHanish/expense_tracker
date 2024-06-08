# Expense Tracker

A simple expense tracking application with a robust tech stack, designed to provide a seamless and efficient way to manage personal finances. This application combines modern frontend and backend technologies to offer a smooth user experience with features like secure authentication and expense tracking.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Routes](#routes)
  - [Frontend Routes](#frontend-routes)
  - [Backend Routes](#backend-routes)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Expense Tracker is a small yet powerful application designed to help users keep track of their expenses effortlessly. Leveraging a comprehensive tech stack, this project demonstrates the integration of modern web technologies to provide a seamless and responsive user experience. Users can easily log their expenses and keep track of their spending through a clean and intuitive interface.

This project is divided into two main parts:
- **Frontend**: Built with React and styled with TailwindCSS, the frontend offers a dynamic and responsive user interface.
- **Backend**: Powered by Bun and TypeScript, the backend uses Hono and tRPC for routing and API handling, with PostgreSQL as the database hosted externally on Neon.

**Note:** This is not a product, but a simple project aimed at learning and demonstrating the use of a comprehensive tech stack.

## Features

- **Authentication**: Secure login and registration using Kinde.
- **Expense Management**: Add, view, and delete expenses with ease.
- **Profile Management**: View and manage user profile details.
- **Data Handling**: Robust backend with Drizzle ORM and PostgreSQL.
- **Form Validation**: Client-side validation with Zod for a smoother user experience.

## Tech Stack

### Frontend

- **Bun**
- **Vite**
- **React**
- **Typescript**
- **TailwindCSS**
- **Shadcn-ui**
- **Tanstack Router**
- **Tanstack Query**
- **Tanstack Form**
- **Sonner**
- **Form Validation with Zod**

### Backend

- **Bun**
- **Typescript**
- **Hono**
- **tRPC**
- **Drizzle ORM**
- **PostgreSQL** (Hosted on Neon)
- **Authentication using Kinde**
- **Validation in requests with Zod**
- **Schema validation with Zod**

## Setup

### Prerequisites

- Bun

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/MuhdHanish/expense_tracker.git
   cd expense_tracker
   ```

2. Install dependencies:
   ```sh
   bun install
   ```

3. Set up the environment variables:
   ```sh
   cp .env.example .env
   ```
   Fill in the required environment variables in the `.env` file.

### Running the Application

#### Development Mode

To run both the frontend and backend concurrently in development mode:
```sh
bun run dev
```

#### Production Mode

To build and start both the frontend and backend:
```sh
bun run start
```

## Routes

### Frontend Routes

- **/**: Home page showing the total expense of the current user.
- **/expenses**: Expense list table with pagination.
- **/create-expense**: Page to create a new expense with form validation.
- **/profile**: Profile page showing the user's profile picture, name, and logout button.

### Backend Routes

All backend routes are prefixed with `/api`.

#### Authentication Routes (`/api/auth`)

- **/profile**: Get user profile details.
- **/login**: User login.
- **/register**: User registration.
- **/logout**: User logout.

#### Expense Routes (`/api/expenses`)

- **/** (GET): Get all expenses.
- **/** (POST): Create a new expense.
- **/:id** (GET): Get an expense by ID.
- **/:id** (DELETE): Delete an expense by ID.
- **/total-spent** (GET): Get the total spent by the user.

## Environment Variables

Ensure all necessary variables are provided for the application to run correctly. The required variables can be found and set in the `.env.example` file. Copy this file to `.env` and fill in the appropriate values.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the project's coding standards and include relevant tests.