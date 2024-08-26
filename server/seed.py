from app import app, db
from models import Admin, User, Job, Message, user_message
from datetime import datetime

def seed_data():
    # Clear the database
    for table in db.metadata.tables.values():
        print(f'Clear table {table}')
        db.session.execute(table.delete())
    db.session.commit()

    # Add Users
    user1 = User(username="user1", email="user1@example.com", password="password1")
    user2 = User(username="user2", email="user2@example.com", password="password2")
    user3 = User(username="user3", email="user3@example.com", password="password3")
    user4 = User(username="user4", email="user4@example.com", password="password4")
    user5 = User(username="user5", email="user5@example.com", password="password5")

     # Seed admin data
    admin = Admin(username="admin1")
    admin.set_password("admin1_password")

    db.session.add(admin)
    db.session.commit()


    # Add Jobs
    job1 = Job(title="Web Development", description="Develop a website.", user=user1)
    job2 = Job(title="Graphic Design", description="Design a logo.", user=user2)
    job3 = Job(title="Software Application", description="Generate a spreadsheet for a school.", user=user3)
    job4 = Job(title="Database Management", description="Helping the administrator to manage database.", user=user4)
    job5 = Job(title="Software Engineering", description="Developing the next facebook application.", user=user5)

    # Add everything except messages to the session and commit
    db.session.add_all([user1, user2, admin, user1, user2,user3,user4,user5, job1, job2, job3, job4, job5])
    db.session.commit()

    # Now add Messages, since job1 and job2 have their IDs set
    message1 = Message(content="I'm interested in this job.", job_id=job1.id)
    message2 = Message(content="Can you provide more details?", job_id=job2.id)

    db.session.add_all([message1, message2])
    db.session.commit()

    print("Database seeded successfully.")

if __name__ == '__main__':
    with app.app_context():
         seed_data()