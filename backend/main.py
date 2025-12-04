from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, EmailStr
from typing import List

from database import get_db, init_db
from models import WaitlistEntry

app = FastAPI(title="ModernizeAI API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WaitlistCreate(BaseModel):
    email: EmailStr

@app.on_event("startup")
async def on_startup():
    await init_db()

@app.get("/")
async def read_root():
    return {"message": "Welcome to ModernizeAI API"}

@app.post("/waitlist", status_code=201)
async def join_waitlist(entry: WaitlistCreate, db: AsyncSession = Depends(get_db)):
    # Check if email exists
    # For MVP, we might just insert. 
    # In a real app, we'd check for duplicates.
    
    new_entry = WaitlistEntry(email=entry.email)
    db.add(new_entry)
    try:
        await db.commit()
        await db.refresh(new_entry)
        return {"message": "Successfully joined waitlist", "id": new_entry.id}
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
