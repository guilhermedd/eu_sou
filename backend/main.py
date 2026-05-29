from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


from src.logic import Logic

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")


logic = Logic()

is_game_running = False


# ===========================
# POST
# ===========================

@app.post("/insert_user")
async def insert_user(name: str):
    print(f"Received name: {name}")  # Adicione esta linha para depuração
    return logic.insert_user(name)

@app.post("/insert_characters")
async def insert_characters(characters: list[str]):
    return logic.insert_characters(characters)

@app.post("/distribute_character")
async def distribute_character():
    return logic.distribute_character()

# ===========================
# GET
# ===========================

@app.get("/user_characters/{id}")
async def get_user_characters(id: str): 
    return logic.get_user_characters(id)

@app.get("/users")
async def get_users():
    return logic.get_users()

@app.get("/is_game_running")
async def get_is_game_running():
    return is_game_running




if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)