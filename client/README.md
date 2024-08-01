Food Chronicles 
by Joel John

Introduction: 
Welcome to FoodChronicles, a recipe app where you can find different recipes from around the world and create your own recipes for others to try. 

Overview: 
The app will have a user-friendly interface where users can browse through different categories of recipes, search for recipes, favorite recipes that you like and also create your own recipes. 

Get started: 
To get started, you can sign up for an account and find different types of recipes from around the world. Also you can favorite the recipes that you like and create your own recipes for other users to try and taste. 

Some features of this app: 
SignUp: Create an account 
Login: Login to your account 
View all recipes: There are recipes already in this app for users to try. 
Add recipes: User can add their own recipes. 
Favorite recipes: Users can favorite the recipes that they liked and enjoyed

Setup: 
To start the beackend server run: 
pipenv install 
pipenv shell 
To make sure the database is up to date run: 
flask db init 
flask db upgrade head 
To find the information in the database run: 
python seed.py 
To run the Flask API run: 
python app.py 

To run the frontend run: 
npm install 
npm start