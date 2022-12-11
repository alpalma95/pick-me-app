from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hashed = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(80), nullable=True, unique=True)
    name = db.Column(db.String(80), nullable=True)
    shopping_list = db.relationship('ShoppingList', backref='user', lazy=True)
    favorites = db.relationship('Favorite', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "name": self.name
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    favorites = db.relationship('Favorite', backref='category', lazy=True)


    def __repr__(self):
        return f'<Category {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

class ShoppingList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    recipeLabel = db.Column(db.String(180))
    ingredientIndex = db.Column(db.String(20))
    ingredientText = db.Column(db.String(180))
    recipeUri = db.Column(db.String(300))
    quantity = db.Column(db.String(20))
    food = db.Column(db.String(180))
    isChecked = db.Column(db.Boolean)
    index = db.Column(db.Integer)
    measure = db.Column(db.String(250))


    def __repr__(self):
        return f'<ShoppingList {self.user_id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "recipeLabel": self.recipeLabel,
            "ingredientIndex": self.ingredientIndex,
            "ingredientText": self.ingredientText,
            "recipeUri": self.recipeUri,
            "quantity": self.quantity,
            "food": self.food,
            "isChecked": self.isChecked,
            "index": self.index,
            "measure": self.measure
        }



class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(Category.id), nullable=False)
    recipe_id = db.Column(db.String(180), nullable=False)
    recipe_url = db.Column(db.String(250), nullable=False)
    recipe_title = db.Column(db.String(250), nullable=False)
    category_name = db.Column(db.String(180))
    recipe_img = db.Column(db.String(10000))

    def __repr__(self):
        return f'<Favorite {self.user_id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category_id": self.category_id,
            "recipe_id": self.recipe_id,
            "recipe_url": self.recipe_url,
            "recipe_title": self.recipe_title,
            "category_name": self.category_name,
            "recipe_image": self.recipe_img
        }