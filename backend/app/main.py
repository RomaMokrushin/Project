from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, group, user, trip, message, invite, log, search, card, payments, admin
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(auth.auth_router)
app.include_router(user.user_router)
app.include_router(group.group_router)
app.include_router(trip.trip_router)
app.include_router(message.message_router)
app.include_router(invite.invite_router)
app.include_router(log.log_router)
app.include_router(search.search_router)
app.include_router(card.card_router)
app.include_router(payments.payments_router)
app.include_router(admin.admin_router)


@app.get("/")
def home_page():
    return {
        "message": "Начало чего-то великого..."
    }
