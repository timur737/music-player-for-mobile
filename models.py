from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Musics(Base):
    __tablename__ = 'musics'

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    title = Column(String)
    artist = Column(String)
    artwork = Column(String)
    duration = Column(Integer)
