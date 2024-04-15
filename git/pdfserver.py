from flask import Flask, request
import fitz  # PyMuPDF
from collections import defaultdict
import re
from flask import Flask, jsonify

app = Flask(__name__)
latest_schedule = {"Monday": "9AM - 5PM", "Tuesday": "10AM - 4PM"}


HTML_FORM = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>PDF 파일 업로드 및 시간표 추출</title>
    <style>
        body {
            background-color: #141416; /* Dark background */
            color: white; /* White text for visibility */
            font-family: Arial, sans-serif; /* Improves readability */
            font-size: 20px; /* Increased base font size */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }
        h2 {
            font-weight: bold; /* Bold title */
            font-size: 32px; /* Increased font size for headings */
        }
        form {
            display: flex; /* Using flex to align form content */
            flex-direction: column; /* Stacks the children vertically */
            align-items: flex-end; /* Aligns items to the right */
            width: 50%; /* Form width to not span full page */
        }
        button {
            background-color: red; /* Red background on buttons */
            color: white; /* White text on buttons */
            border: none; /* Removes default border */
            padding: 10px 20px; /* Padding for better appearance */
            border-radius: 5px; /* Rounded corners for the button */
            cursor: pointer; /* Pointer cursor on hover */
            font-size: 20px; /* Maintain uniform font size on buttons */
        }
        button:hover {
            background-color: #ff3333; /* Lighter red when hovering */
        }
        input[type="file"] {
            margin-bottom: 10px; /* Space between the input and the button */
            font-size: 20px; /* Uniform font size for file input */
        }
        @media (max-width: 1200px) {
            body, button, input[type="file"] {
                font-size: 24px; /* Larger font size for mobile devices */
            }
            h2 {
                font-size: 36px; /* Larger font size for headings on mobile devices */
            }
        }
    </style>
</head>
<body>
<h2>PDF 파일 업로드하여 시간표 추출하기</h2>
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" required>
     <br>
    <button type="submit">업로드</button>
</form>
</body>
</html>
"""

def parse_schedule(text):
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    schedule = defaultdict(list)
    current_day = None
    class_name, location = "", ""
    
    for line in text.split('\n'):
        if line in days:
            current_day = line
        elif current_day and line.strip() != "":
            match = re.match(r"(\d{1,2}:\d{2} [AP]M) to (\d{1,2}:\d{2} [AP]M)$", line)
            if match:
                start_time, end_time = match.groups()
                # class_type이 여기서 사용되지 않으므로, location에 class_type 정보를 포함시킬 필요가 없습니다.
                schedule[current_day].append((class_name, location, start_time, end_time))
            else:
                if ':' in line:
                    class_name = line
                else:
                    location = line  # class_type을 별도로 분리하지 않고, 직접 location에 할당합니다.
    return schedule

@app.route('/')
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
        
        result_html = "<h2>시간표</h2><table border='1'><tr><th>Day</th><th>Class Name</th><th>Location</th><th>Time</th></tr>"
        for day, classes in schedule.items():
            for class_info in classes:
                class_name, location, start_time, end_time = class_info
                result_html += f"<tr><td>{day}</td><td>{class_name}</td><td>{location}</td><td>{start_time} to {end_time}</td></tr>"
        result_html += "</table>"
        return result_html
    else:
        return 'PDF 파일만 업로드 가능합니다.', 400
   
@app.route('/schedule', methods=['GET'])
def get_schedule():
    try:
        return jsonify(latest_schedule)
    except NameError:  # In case 'latest_schedule' isn't defined
        return jsonify({"error": "Schedule not available"}), 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=100, debug=True)
