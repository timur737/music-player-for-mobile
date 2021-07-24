from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

database_url = "postgresql://postgres:degea4057@localhost/player_db"

engine = create_engine(database_url)
Session = sessionmaker()
Session.configure(bind=engine)
session = Session()
