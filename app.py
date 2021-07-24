import os

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import cross_origin

from database import session
from models import Musics

api = Flask(__name__)
UPLOAD_FOLDER = '/home/timur/Projects/player_on_react/uploads'


@api.route('/', methods=['GET'])
@cross_origin()
def index():
    query = session.query(Musics)
    return jsonify([{
        'id': item.id,
        'title': item.title,
        'artwork': item.artwork,
        'url': item.url,
        'artist': item.artist,
        'duration': item.duration
    } for item in query])


@api.route('/', methods=['POST'])
def upload_file():
    data = request.form
    artwork = request.files['artwork']
    url = request.files['url']
    if url == '':
        return jsonify({'system': "No selected music"})
    if artwork == '':
        return jsonify({'system': "No selected image"})
    m = Musics(title=data['title'],
               image=f"/uploads/{artwork.filename}",
               music=f"/uploads/{url.filename}")
    artwork.save(os.path.join(UPLOAD_FOLDER, artwork.filename))
    url.save(os.path.join(UPLOAD_FOLDER, url.filename))
    session.add(m)
    session.commit()
    return jsonify({'uploads': 'ok'})


@api.route('/uploads/<name>/')
def view_file(name):
    return send_from_directory(UPLOAD_FOLDER, name)


if __name__ == '__main__':
    api.run(host='0.0.0.0', debug=True)
