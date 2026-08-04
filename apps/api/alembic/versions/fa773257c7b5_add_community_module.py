"""Restore missing revision.

Revision ID: fa773257c7b5
Revises: 5d9ce05cd8a3
"""

from typing import Sequence, Union

revision: str = "fa773257c7b5"
down_revision: Union[str, Sequence[str], None] = "5d9ce05cd8a3"
branch_labels = None
depends_on = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass