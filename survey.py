from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///survey.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class SurveyResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    width = db.Column(db.Integer)
    crowdedness = db.Column(db.Integer)
    beauty = db.Column(db.Integer)
    arousal = db.Column(db.Integer)
    valence = db.Column(db.Integer)
    presence = db.Column(db.Integer)
    willingness = db.Column(db.Integer)
    restoration = db.Column(db.Integer)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save():
    data = request.json
    new_result = SurveyResult(
        width = data.get('width'),
        crowdedness = data.get('crowdedness'),
        beauty = data.get('beauty'),
        arousal = data.get('arousal'),
        valence = data.get('valence'),
        presence = data.get('presence'),
        willingness = data.get('willingness'),
        restoration = data.get('restoration')
    )
    db.session.add(new_result)
    db.session.commit()
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
