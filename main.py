from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from datetime import datetime

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

guestbook_entries = []

@app.get("/home", response_class=HTMLResponse)
async def get_chat(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "entries": guestbook_entries})

@app.post("/guestbook/api")
async def post_message(author: str = Form(...), content: str = Form(...)):
    entry = {"author": author, "content": content, "timestamp": datetime.now().isoformat()}
    guestbook_entries.append(entry)
    return {"status": "Message received", "entry": entry}

