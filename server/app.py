import os

from datetime import timedelta, datetime
from flask import Flask, jsonify, request
from flask_migrate import Migrate 
from flask_cors import CORS
from server.views.user_view import user_bp
from server.views.auth_view import auth_bp
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token, get_jwt
from server.models import User, Admin, Job, Message,TokenBlocklist, db


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


CORS(app)


db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager()
app.config["JWT_SECRET_KEY"] = "fjhjdjhfiskyfvdgvydklvsrfl"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt.init_app(app)

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)


# Routes for freelancers, jobs, and messages

@app.route('/jobs', methods=['POST'])
@jwt_required()
def create_job():
    data = request.json
    user_id = get_jwt_identity()
    job = Job(title=data['title'], description=data['description'], user_id=user_id)
    db.session.add(job)
    db.session.commit()
    return jsonify({"id": job.id, "title": job.title}), 201

@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    return jsonify([{"id": job.id, "title": job.title, "description": job.description, "user_id": job.user_id} for job in jobs])

@app.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get_or_404(job_id)
    return jsonify({"id": job.id, "title": job.title, "description": job.description, "user_id": job.user_id})

@app.route('/jobs/<int:job_id>/done', methods=['PUT'])
@jwt_required()
def mark_job_as_done(job_id):
    job = Job.query.get_or_404(job_id)
    job.is_done = True
    db.session.commit()
    return jsonify({"message": "Job marked as done", "id": job.id}), 200

@app.route('/messages', methods=['POST'])
def send_message():
    data = request.json
    message = Message(content=data['content'], job_id=data['job_id'])
    db.session.add(message)
    db.session.commit()
    return jsonify({"id": message.id, "content": message.content, "sent_at": message.sent_at}), 201

# Admin routes
@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    admin = Admin.query.filter_by(username=username).first()
    if admin and admin.check_password(password):  # Assuming you have a method to check password
        access_token = create_access_token(identity=admin.id, additional_claims={"is_admin": True})
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials"}), 401


def is_admin(identity):
    claims = get_jwt()
    return claims.get("is_admin", False)

@app.route('/admin/jobs', methods=['POST'])
@jwt_required()
def admin_create_job():
    if not is_admin():
        return jsonify({"message": "Access denied"}), 403

    data = request.json
    job = Job(title=data['title'], description=data['description'])
    db.session.add(job)
    db.session.commit()
    return jsonify({"id": job.id, "title": job.title}), 201

@app.route('/admin/jobs/<int:job_id>', methods=['DELETE'])
@jwt_required()
def admin_delete_job(job_id):
    admin_id = get_jwt_identity()
    if not is_admin(admin_id):
        return jsonify({"message": "Access denied"}), 403

    job = Job.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return jsonify({"message": "Job deleted successfully"}), 200

@app.route('/admin/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def admin_delete_user(user_id):
    admin_id = get_jwt_identity()
    if not is_admin(admin_id):
        return jsonify({"message": "Access denied"}), 403

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    now = datetime.now()
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return jsonify({"message": "Successfully logged out"}), 200

# JWT token in blocklist callback
@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    return token is not None

# Main entry point
if __name__ == '__main__':
    app.run()