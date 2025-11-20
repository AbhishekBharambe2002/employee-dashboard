Department and Employee Management System (MERN Stack with TypeScript)

🌟 Project Overview

This is a comprehensive management system built using the MERN (MongoDB, Express, React, Node.js) stack, enhanced with TypeScript for robust development. The application is designed to efficiently manage company departments and the employees within them.

The system features:

Hierarchical Data: Departments are the primary entities, and employees are associated with a specific department upon creation.

Dashboard: A central hub for quick, summarized data and key metrics.

Location Grounding: Integration with an external API to fetch real-world data for countries, states, and cities, ensuring accurate location details for all employee records.

🛠️ Tech Stack

This project leverages the power and scalability of the MERN stack combined with the safety of TypeScript.

Category

Technology

Description

Frontend

React (with TypeScript)

Modern UI with strong typing, component-based architecture.

Backend

Node.js, Express (with TypeScript)

Fast, scalable server-side environment for handling API requests.

Database

MongoDB & Mongoose

Flexible, NoSQL database for efficient data storage and object modeling.

Language

TypeScript

Enhances code quality, readability, and maintainability across the entire stack.

✨ Key Features

Dashboard View: A landing page providing an overview of system statistics (e.g., total departments, active employees).

Department CRUD: Complete functionality (Create, Read, Update, Delete) for managing company departments.

Employee CRUD: Complete functionality for managing employee records, including association with a department.

Dynamic Location Input: Utilizes an external API to populate dynamic dropdowns for selecting Country, State, and City during employee registration.

Type Safety: Consistent use of TypeScript ensures predictable and error-free interactions between the frontend and backend.

🚀 Setup and Running the Project

Follow these instructions to set up and run the application locally.

1. Environment Configuration

You must set up environment variables for both the backend and frontend.

Backend Configuration (backend/.env)

Create a file named .env in the root of the backend directory:

PORT=5000
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING_HERE>


Frontend Configuration (frontend/.env)

Create a file named .env in the root of the frontend directory:

REACT_APP_API_BASE_URL="http://localhost:5000"
# Note: If your Country/State/City API requires a key, add it here, e.g.:
# REACT_APP_LOCATION_API_KEY="your_api_key"


2. Running the Backend

Open your terminal, navigate to the backend folder, and execute the following commands:

# Navigate to the backend directory
cd backend

# Install all necessary Node.js/TypeScript dependencies
npm i

# Start the server in development mode (using nodemon or similar)
npm run dev


The server will start and listen on port 5000 (or the port specified in your .env file).

3. Running the Frontend

Open a separate terminal, navigate to the frontend folder, and execute the following commands:

# Navigate to the frontend directory
cd frontend

# Install all necessary React/TypeScript dependencies
npm i

# Start the React application
npm start


The frontend application will launch in your default browser, typically at http://localhost:3000.
