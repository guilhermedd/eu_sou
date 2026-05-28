import psycopg
import os
from dotenv import load_dotenv

class DatabaseConnection:
    def __init__(self):
        load_dotenv()  
        self.conn_str = f"dbname={os.getenv('DB_NAME')} user={os.getenv('DB_USERNAME')} password={os.getenv('DB_PASSWORD')} host=localhost port=5432"

    def execute_query(self, query, params=None):
        try:
            with psycopg.connect(self.conn_str) as conn:
                with conn.cursor() as cur:
                    cur.execute(query, params)
                    
                    if cur.description is not None:  # SELECT
                        return cur.fetchall()
                    
                    conn.commit()  # INSERT / UPDATE / DELETE
                    return []
        except Exception as e:
            print("❌ Erro ao conectar ao banco de dados:")
            print(e)
            return None