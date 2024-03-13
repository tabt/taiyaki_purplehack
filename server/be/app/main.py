from fastapi import FastAPI, HTTPException, Query, Body
from pydantic import BaseModel
import zipfile
import io
import psycopg2
from fastapi.responses import StreamingResponse

app = FastAPI()

class MatrixNames(BaseModel):
    baseline_matrix: str
    discount_matrix: str

def get_database_connection():
    conn = psycopg2.connect(
        dbname="your_db_name",
        user="your_db_user",
        password="your_db_password",
        host="your_db_host"
    )
    return conn

@app.get("/get_matrixes")
def get_matrixes():
    conn = get_database_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM baseline_matrixes")
    baseline_matrixes = cur.fetchall()

    cur.execute("SELECT * FROM discount_matrixes")
    discount_matrixes = cur.fetchall()

    conn.close()

    return {"baseline_matrixes": baseline_matrixes, "discount_matrixes": discount_matrixes}

@app.post("/send_storage")
def send_storage(matrix_names: MatrixNames = Body(...)):
    conn = get_database_connection()
    cur = conn.cursor()

    cur.execute("INSERT INTO history (baseline_matrix, discount_matrix, timestamp) VALUES (%s, %s, NOW())",
                (matrix_names.baseline_matrix, matrix_names.discount_matrix))
    conn.commit()

    # Pack matrices into a zip file
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w') as zipf:
        zipf.write('path_to_baseline_matrix', matrix_names.baseline_matrix)
        zipf.write('path_to_discount_matrix', matrix_names.discount_matrix)

    zip_buffer.seek(0)

    return StreamingResponse(zip_buffer, media_type='application/zip')

