📌 BudgetWise Setup Instructions

1️⃣ Create a new folder for BudgetWise
Manually create a folder or run:
mkdir BudgetWiseFolder

2️⃣ Open a terminal in BudgetWiseFolder and clone the repository
cd BudgetWiseFolder
git clone https://github.com/iamyashdp/comp231-001-Team1-W25.git .

3️⃣ Open a new terminal in the `backend` folder and install dependencies
cd backend
npm install

4️⃣ Start the backend server
npm start

5️⃣ Open another new terminal in the `frontend` folder and install dependencies
cd frontend
npm install

6️⃣ Start the frontend application
npm start

BudgetWise should now be running!

 >>> Unit Test Instructions <<<<
I’ve added unit tests using Jest to check if the main backend features are working properly.

>>> What’s Tested:
1) Creating income
2)Getting income
3)Creating expense
4)Getting expenses
5)Deleting expense

>>> How to Run the Tests:
Go to the backend folder:
cd backend
>>> Install the required packages (only once):
npm install
>>> Run the tests:
npm test
