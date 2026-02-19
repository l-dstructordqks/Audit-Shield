from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI (
    title="Audit-Shield",
    description="Supply Chain Intelligence & Behavioral Network Analysis",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/health')
def health_check():
    return {"status": "ok", "version": "0.1.0"}