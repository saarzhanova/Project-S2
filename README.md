# Flask Video Survey App

![image](https://github.com/user-attachments/assets/5119cf7a-df95-4b05-a977-519ec8518ca4)


## Description
This is a simple Flask web application.

- Loads random videos from a specified YouTube playlist and displays them to the user.
- Shows a survey form (built with SurveyJS) next to the video.
- The user watches the video and rates it on various dimensions.
- All responses are automatically saved to a local SQLite database at `instance/survey.db`.

---

## Features
- **Backend**: Flask + Flask-SQLAlchemy
- **Frontend**: Bootstrap + SurveyJS
- Random video selection from a YouTube channel playlist.
- Interactive survey form with sliders for ratings.
- Automatic saving of responses in a structured database.

---

## How to Run

1. Install the required Python packages:
    ```
    pip install flask flask-sqlalchemy flask-cors
    ```

2. Start the server:
    ```
    python server.py
    ```

3. Open your browser and go to:
    ```
    http://127.0.0.1:5000/
    ```

---

## Database
- SQLite file: `instance/survey.db`
- Stores all survey responses as individual records with separate columns for each question.

---

## Notes
- The SurveyJS form is defined in the frontend JavaScript and can be modified as needed.
- The application is designed for local testing and research surveys.
