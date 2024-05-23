# Basic Graph App
I developed a criminal-victim application that performs CRUD operations with a simple interface using the Neo4j graph-based database. The backend is implemented in JavaScript, the frontend in HTML and CSS, and database operations are carried out using Cypher.

## Prerequisites
Node.js installed
Neo4j installed and running
CSV file containing the data to be imported
Setup Instructions
Step 1: Import Data into Neo4j
Open the Neo4j Browser and log in to your Neo4j instance.
Import the CSV file into Neo4j's import directory.
Step 2: Load Data into Neo4j Database
Open the Neo4j Browser.
Run the following Cypher code to load your data:
## cypher

LOAD CSV WITH HEADERS FROM 'file:///your_data.csv' AS row
MERGE (c:Criminal {id: row.criminal_id, name: row.criminal_name})
MERGE (v:Victim {id: row.victim_id, name: row.victim_name})
MERGE (c)-[:VICTIMIZED]->(v);
Make sure to replace 'file:///your_data.csv' with the actual path of your CSV file in the Neo4j import directory.

## Step 3: Install Dependencies
Navigate to the project directory and install the necessary dependencies:

bash

npm install
## Step 4: Start the Application
You can start the application using either of the following commands:

bash

node app.js
or

bash

nodemon app.js
## Step 5: Access the Application
Open your web browser and navigate to http://localhost:3000 to access the application.

## Project Structure
app.js: The main entry point of the application.
public/: Contains the frontend files (HTML, CSS, JavaScript).
routes/: Contains the backend route handlers.
models/: Contains the Neo4j models for the application.
views/: Contains the HTML views.
Operations
The application supports the following CRUD operations:

Create: Add new criminals and victims.
Read: View existing criminals and victims.
Update: Modify details of existing criminals and victims.
Delete: Remove criminals and victims from the database.
Conclusion
You have successfully set up and launched the Basic Graph App. You can now perform CRUD operations on the criminal-victim data using the simple interface provided by the application.