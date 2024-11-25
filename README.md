## Transaction Management Backend

A Node.js backend application for managing transactions with features like creating transactions, searching, generating reports, and managing CRON jobs for background tasks. Includes user authentication (register/login) functionality.

---

### **Features**
- **User Authentication**: Register and login users.
- **Transaction Management**: Create transactions, search transactions, generate transaction reports.
- **CRON Job Management**: Start, stop, and check the status of background tasks.
- **Data Filtering**: Query transactions based on various parameters like amount, date range, etc.

---

### **Technologies Used**
- Node.js
- Express.js
- TypeScript
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT)
- dotenv for environment variables

---

### **Folder Structure**
```plaintext
Transaction Management-Backend
├── config
│   └── dbConfig.ts           # MongoDB database configuration
├── controller
│   ├── authController.ts     # Handles authentication-related endpoints
│   ├── cronController.ts     # Handles CRON job-related endpoints
│   └── transactionController.ts  # Handles transaction-related endpoints
├── dist                      # Compiled JavaScript files
├── middleware
│   └── authMiddleware.ts     # Middleware for authenticating users
├── models
│   ├── transactionModel.ts   # Mongoose schema for transactions
│   └── userModel.ts          # Mongoose schema for users
├── repositories
│   ├── transactionRepository.ts # Handles database operations for transactions
│   └── userRepository.ts     # Handles database operations for users
├── routes
│   ├── authRoutes.ts         # Routes for user authentication
│   ├── cronRoutes.ts         # Routes for CRON job management
│   └── transactionRoute.ts   # Routes for transaction operations
├── services
│   ├── authService.ts        # Business logic for user authentication
│   ├── cronService.ts        # Business logic for CRON jobs
│   └── transactionService.ts # Business logic for transactions
├── .env                      # Environment variables
├── index.ts                  # Main entry point
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration
```

---

### **Localhost Setup**

Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Transaction-Management-Backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/transaction-management
   JWT_SECRET=your_jwt_secret
   ```

4. **Build the Project**
   ```bash
   npm run build
   ```

5. **Run the Project**
   ```bash
   npm start
   ```

6. **Run in Development Mode**
   ```bash
   npm run dev
   ```

---

### **API Endpoints**

#### **Authentication**

1. **Register User**
   - **Endpoint**: `POST /api/v/register`
   - **Payload**:
     ```json
     {
       "name": "Rajesh Jha",
       "email": "rj848jha@gmail.com",
       "password": "rajujha"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User registered successfully."
     }
     ```

2. **Login User**
   - **Endpoint**: `POST /api/v/login`
   - **Payload**:
     ```json
     {
       "email": "rj848jha@gmail.com",
       "password": "rajujha"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "JWT_TOKEN"
     }
     ```

---

#### **Transactions**

1. **Create Transaction**
   - **Endpoint**: `POST /api/v1/transaction/create`
   - **Payload**:
     ```json
     {
       "amount": 800,
       "description": "for buying pens",
       "userId": "sdfgf",
       "userName": "Mohan Das"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Transaction created successfully."
     }
     ```

2. **Get Transaction by ID**
   - **Endpoint**: `GET /api/v1/transaction/get/:transactionID`
   - **Headers**: 
     - `Authorization: Bearer <JWT_TOKEN>`
   - **Response**:
     ```json
     {
       "transaction": {
         "transactionID": "TXN123",
         "amount": 800,
         "description": "for buying pens",
         "userId": "sdfgf",
         "userName": "Mohan Das",
         "createdAt": "2024-01-01T00:00:00Z"
       }
     }
     ```

3. **Search Transactions**
   - **Endpoint**: `POST /api/v1/transaction/search`
   - **Headers**:
     - `Authorization: Bearer <JWT_TOKEN>`
   - **Query Parameters**:
     - `page`: Page number (e.g., `1`)
     - `sortAmount`: Sorting order by amount (1 for ascending, 0 for descending)
     - `sortTime`: Sorting order by time (1 for ascending, 0 for descending)
   - **Payload**:
     ```json
     {
       "description": "pens",
       "minAmount": 100,
       "maxAmount": 1000
     }
     ```
   - **Response**:
     ```json
     {
       "transactions": [
         {
           "transactionID": "TXN123",
           "amount": 800,
           "description": "for buying pens",
           "userId": "sdfgf",
           "userName": "Mohan Das",
           "createdAt": "2024-01-01T00:00:00Z"
         }
       ]
     }
     ```

4. **Generate Transaction Report**
   - **Endpoint**: `GET /api/v1/transaction/report`
   - **Headers**:
     - `Authorization: Bearer <JWT_TOKEN>`
   - **Query Parameters**:
     - `totalAmount`: Boolean flag (e.g., `true`)
     - `dateTimeStart`: Start date (e.g., `2024-01-01T00:00:00Z`)
     - `dateTimeEnd`: End date (e.g., `2024-12-31T23:59:59Z`)
   - **Response**:
     ```json
     {
       "totalAmount": 10000,
       "transactionCount": 50
     }
     ```

---

#### **CRON Jobs**

1. **Start/Stop CRON Job**
   - **Endpoint**: `GET /api/v1/program`
   - **Query Parameters**:
     - `program=1`: Start the CRON job.
     - `program=0`: Stop the CRON job.

2. **Get CRON Status**
   - **Endpoint**: `GET /api/v1/program/status`
   - **Headers**:
     - `Authorization: Bearer <JWT_TOKEN>`
   - **Response**:
     ```json
     {
       "status": "Running",
       "hits": 5
     }
     ```

---

### **Future Enhancements**
- Add unit tests.
- Implement role-based authentication.
- Add more advanced CRON job scheduling features.
