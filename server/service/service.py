from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import zipfile
import io
import psycopg2
import json

app = FastAPI()

def get_database_connection():
    conn = psycopg2.connect(
        dbname="your_db_name",
        user="your_db_user",
        password="your_db_password",
        host="your_db_host"
    )
    return conn

@app.post("/receive_storage")
async def receive_storage(file: UploadFile = File(...)):
    conn = get_database_connection()
    cur = conn.cursor()

    with zipfile.ZipFile(io.BytesIO(await file.read()), 'r') as zip_ref:
        zip_ref.extractall('extracted_files')

    with open('extracted_files/baseline_matrix', 'r') as baseline_file:
        baseline_matrix = baseline_file.read()

    with open('extracted_files/discount_matrix', 'r') as discount_file:
        discount_matrix = discount_file.read()

    cur.execute("INSERT INTO baseline_matrixes (matrix_data) VALUES (%s)", (baseline_matrix,))
    cur.execute("INSERT INTO discount_matrixes (matrix_data) VALUES (%s)", (discount_matrix,))
    
    conn.commit()
    conn.close()

    return {"message": "Zip file contents saved successfully"}

@app.get("/mock_data")
def get_mock_data():
    mock_data = {
        "data": [
            {"id": 1, "name": "John Doe", "age": 30},
            {"id": 2, "name": "Jane Smith", "age": 25},
            {"id": 3, "name": "Alice Johnson", "age": 35}
        ]
    }
    return mock_data
