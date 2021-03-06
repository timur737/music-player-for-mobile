"""add columns to table Musics

Revision ID: b41d9deba126
Revises: b4ae83f9fe68
Create Date: 2021-06-14 23:52:30.346325

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b41d9deba126'
down_revision = 'b4ae83f9fe68'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('musics', sa.Column('url', sa.String(), nullable=True))
    op.add_column('musics', sa.Column('artist', sa.String(), nullable=True))
    op.add_column('musics', sa.Column('artwork', sa.String(), nullable=True))
    op.add_column('musics', sa.Column('duration', sa.Integer(), nullable=True))
    op.drop_column('musics', 'image')
    op.drop_column('musics', 'music')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('musics', sa.Column('music', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('musics', sa.Column('image', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('musics', 'duration')
    op.drop_column('musics', 'artwork')
    op.drop_column('musics', 'artist')
    op.drop_column('musics', 'url')
    # ### end Alembic commands ###
