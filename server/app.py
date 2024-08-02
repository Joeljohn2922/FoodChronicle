#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response,session
from flask_restful import Resource 
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports 
from models import User, Recipe, UserRecipe, Ingredient, RecipeIngredient


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>' 

class Users(Resource): 
    def get(self): 
        users = User.query.all() 
        users_list = [user.to_dict() for user in users] 
        return make_response(users_list,200) 
    
    def post(self):
        params = request.get_json()
        
        username = params.get('username')
        password = params.get('password')
        f_name = params.get('f_name')
        l_name= params.get('l_name')
        email = params.get('email')
        
        
        user = User(
            username = username,
            first_name = f_name,
            last_name = l_name,
            email = email,
            
        )
        user.password_hash = password
        
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except IntegrityError:
            return make_response({"error": "422 Unprocessable Entity"}, 422)

api.add_resource(Users,"/users") 

class UserById(Resource):
    def get(self, id):
        user = db.session.get(User, id)
        if user:
            return make_response(user.to_dict(rules=("-recipe_user")), 200)
        else:
            return make_response({'error': 'User not found'}, 404)
        
    def patch(self, id):
        user = db.session.get(User, id)
        if user:
            params = request.json
            for attr in params:
                setattr(user , attr, params[attr])
            db.session.commit()
            return make_response(user.to_dict())
    
    def delete(self, id):
        user = db.session.get(User, id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({"message": "User deleted successfully."}, 204)
        else:
            return make_response({"error": "User not found"}, 404) 

api.add_resource(UserById, '/api/user/<int:id>') 

class Recipes(Resource):
    def get(self):
        recipes = Recipe.query.all()
        recipe_list = [recipe.to_dict(rules = ("-recipe_users.user", "-recipe_users.recipe","-recipe_ingredients.ingredient.recipe_ingredients", "-recipe_ingredients.recipe")) for recipe in recipes]
        return make_response(recipe_list, 200) 

api.add_resource(Recipes, '/meal') 

class RecipeById(Resource):
    def get(self, id):
        recipe = db.session.get(Recipe, id)
        if recipe:
            return make_response(recipe.to_dict(rules = ("-recipe_users", "-recipe_ingredients.ingredient.recipe_ingredients", "-recipe_ingredients.recipe")), 200)
        else:
            return make_response({'error': 'Recipe not found'}, 404) 
    
    def patch(self, id):
        recipe = db.session.get(Recipe, id)
        if recipe:
            params = request.json
            print(params)
            for attr in params:
                setattr(recipe , attr, params[attr])
            db.session.commit()
            Recipe_Ingredient.query.filter_by(recipe_id = recipe.id).delete()
            db.session.commit()
            for ri in params["ingredients"]:
                    ingredient=Ingredient.query.filter_by(name=ri['ingredient'].lower()).first()
                    if not ingredient:
                        ingredient=Ingredient(
                            name=ri['ingredient'].lower(),
                        )
                        db.session.add(ingredient)
                        db.session.commit()
                    
                    recipe_ingredient = Recipe_Ingredient(
                        recipe_id=recipe.id,
                        ingredient_id = ingredient.id
                        )
                    print(recipe_ingredient)
                    db.session.add(recipe_ingredient)
                    print(recipe_ingredient)
                    db.session.commit()      
            return make_response(recipe.to_dict(rules = ("-recipe_users.user", "-recipe_users.recipe"))) 
    
    def delete(self, id):
        recipe = db.session.get(Recipe, id)
        if recipe:
            db.session.delete(recipe)
            db.session.commit()
            return make_response({"message": "Recipe deleted successfully."}, 204)
        else:
            return make_response({"error": "Recipe not found"}, 404)  

api.add_resource(RecipeById, '/meal/:id') 

class NewRecipes(Resource):
    def post(self):
        try:
            data = request.json
            recipe_ingredients=data['ingredients']
            recipe = Recipe(
                title=data['title'],
                instruction=data['instructions'],
                image=data['image'],
                description=data['description'],
                tag=data['tag']
            )
            db.session.add(recipe)
            db.session.commit()
            if recipe:
                for ri in recipe_ingredients:
                    ingredient=Ingredient.query.filter_by(name=ri['ingredient'].lower()).first()
                    if not ingredient:
                        ingredient=Ingredient(
                            name=ri['ingredient'].lower(),
                        )
                        db.session.add(ingredient)
                        db.session.commit()
                    recipe_ingredient = Recipe_Ingredient(
                        recipe_id=recipe.id,
                        ingredient_id = ingredient.id
                        )
                    db.session.add(recipe_ingredient)
                    db.session.commit()      
                recipe_user = Recipe_User(
                    recipe_id=recipe.id,
                    user_id=session['user_id'],
                )
                db.session.add(recipe_user)
                db.session.commit()
            return make_response(recipe.to_dict(rules = ("-recipe_users", "-recipe_ingredients")), 201)
        except Exception as e:
            app.logger.error(f"Error creating recipe: {e}")
            return make_response({"error": "Could not create Recipe", "details": str(e)}, 400) 

api.add_resource(NewRecipes, '/NewRecipeForm')

# Authentication 
class CheckSession(Resource): 
    def get(self): 
        user_id = session.get('user_id') 
        if user_id: 
            user = db.session.get(User, user_id) 
            if user: 
                return make_response(user.to_dict(),200) 
            return make_response({'error': 'Unauthorized: Must Login'},401)
api.add_resource(CheckSession, '/check_session') 

class SignUp(Resource): 
    def post(self): 
        params = request.json 
        username = params.get('username') 
        if User.query.filter_by(username=username).first(): 
            return make_response({'error': 'Username already exists'}, 400) 
        try: 
            user = User( 
                username = params.get('username'), 
                first_name = params.get('first_name'), 
                last_name = params.get('last_name'), 
                email = params.get('email')
            ) 
            user.password_hash = params.get('password') 
            db.session.add(user) 
            db.session.commit() 
            session['user_id'] = user.id 
            return make_response(user.to_dict(), 201) 
        except Exception as e: 
            return make_response({'error': str(e)}, 400) 
api.add_resource(SignUp, '/signup') 

class Login(Resource):
    def post(self):
        params = request.json
        user = User.query.filter_by(username=params.get('username')).first() 
        if not user: 
            return make_response({'error': 'Invalid username'}, 400) 
        if user.authenticate(params.get('password')): 
            session['user_id'] = user.id 
            return make_response(user.to_dict(), 201) 
        else: 
            return make_response({'error': 'Invalid password'}, 400) 
api.add_resource(Login, '/login') 

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Logout, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

