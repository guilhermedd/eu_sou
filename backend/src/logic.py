from src.db_connection import DatabaseConnection
import random

class Logic:
    def __init__(self):
        self.db = DatabaseConnection()

    def delete_character(self, character):
        query = "DELETE FROM game WHERE character = %s"
        try:
            self.db.execute_query(query, (character,))
            return {"message": "Character deleted successfully"}
        except Exception as e:
            return {"error": "Failed to delete character"}

    def set_character_to_user(self, name, character):
        self.delete_character(character)
        query = "UPDATE game SET character = %s WHERE name = %s"
        try:
            self.db.execute_query(query, (character, name))
            return {"message": "Character assigned successfully"}
        except Exception as e:
            return {"error": "Failed to assign character"}
        
    def insert_characters(self, characters):
        query = "INSERT INTO game (character) VALUES (%s)"
        try:
            for character in characters:
                self.db.execute_query(query, (character,))
            return {"message": "Characters inserted successfully"}
        except Exception as e:
            return {"error": "Failed to insert characters"}
        
    def insert_user(self, name):
        query = "INSERT INTO game (name) VALUES (%s)"
        try:
            self.db.execute_query(query, (name,))
            user_id = self.db.execute_query("SELECT id FROM game WHERE name = %s", (name,))
            return {"message": "User inserted successfully", "user_id": user_id[0][0]}
        except Exception as e:
            print(f"ERRO insert_user: {e}")  
            if "duplicate key value violates unique constraint" in str(e):
                return {"error": "Já existe um usuário com esse nome."}
            return {"error": e}

    def distribute_character(self):
        try:
            chars = self.db.execute_query(
                "SELECT character FROM game WHERE character IS NOT NULL AND name IS NULL"
            )
            users = self.db.execute_query(
                "SELECT name FROM game WHERE name IS NOT NULL AND character IS NULL"
            )
            characters = [row[0] for row in chars]
            names = [row[0] for row in users]

            characters, names = self.get_random_pairs(characters, names)

            for name, character in zip(names, characters):  # ✅ itera par a par
                self.set_character_to_user(name, character)
                
            return {"characters": characters, "names": names}
        except Exception as e:
            return {"error": "Failed to retrieve characters"}
        
    def get_random_pairs(self, characters, names):
        random.shuffle(characters)
        return characters[:len(names)], names
        
    def get_user_characters(self, id):
        query = "SELECT character FROM game WHERE id = %s"
        try:
            results = self.db.execute_query(query, (id,))
            characters = [row[0] for row in results]
            return {"characters": characters}
        except Exception as e:
            return {"error": "Failed to retrieve characters for user"}  
        
    def get_users(self):
        query = "SELECT name FROM game WHERE name IS NOT NULL"
        try:
            results = self.db.execute_query(query)
            users = [row[0] for row in results]
            return {"users": users, "error": None}
        except Exception as e:
            return {"error": e}