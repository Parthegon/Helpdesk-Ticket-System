class Ticket:
    def __init__(self, id, title, description, priority, assignee="Unassigned"):
        self.id = id
        self.title = title
        self.description = description
        self.priority = priority
        self.status = "Open"
        self.assignee = assignee
        self.comments = []

    def add_comment(self, comment):
        self.comment = comment

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "priority": self.priority,
            "status": self.status,
            "assignee": self.assignee,
            "comments": self.comments
        }