from flask import Flask, request, Response
import fitz  # PyMuPDF
from collections import defaultdict
import re
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from datetime import datetime
import io

app = Flask(__name__)

HTML_FORM = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>PDF 파일 업로드 및 시간표 추출</title>
</head>
<body>
<h2>PDF 파일 업로드하여 시간표 추출하기</h2>
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" required>
    <button type="submit">업로드</button>
</form>
</body>
</html>
"""

@app.route('2.168.0.3:80')
def index():
    return HTML_FORM

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'pdfFile' not in request.files:
        return '파일이 없습니다.', 400
    file = request.files['pdfFile']
    if file.filename == '':
        return '파일이 선택되지 않았습니다.', 400
    if file and file.content_type == 'application/pdf':
        doc = fitz.open(stream=file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        schedule = parse_schedule(text)
        image = draw_schedule(schedule)
        
        response = Response(image.getvalue(), mimetype='image/png')
        response.headers['Content-Disposition'] = 'attachment; filename=schedule.png'
        return response

def parse_schedule(text):
    # Existing parsing logic
    pass

def draw_schedule(schedule):
    # Existing drawing logic
    pass

if __name__ == '__main__':
    app.run(debug=True)
