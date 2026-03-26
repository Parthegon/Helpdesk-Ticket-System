from ticket import Ticket
from storage import load_tickets, save_tickets

def create_ticket():
    tickets = load_tickets()

    title = input("Title: ")
    description = input("Description: ")
    priority = input("Priority: ")
    assignee = input("Assign to: ")

    ticket = Ticket(len(tickets) + 1, title, description, priority, assignee)

    tickets.append(ticket.to_dict())
    save_tickets(tickets)

    print("Ticket created!\n")

def view_tickets():
    tickets = load_tickets()

    print("\n--- Tickets ---")
    for t in tickets:
        print(f"[{t['id']}] {t['title']} - {t['status']} ({t['priority']}) | assigned to: {t['assignee']}")
    print("----------------\n")

def update_ticket():
    tickets = load_tickets()
    ticket_id = int(input("Enter ticket ID: "))

    for t in tickets:
        if t["id"] == ticket_id:
            new_status = input("New status: ")
            t["status"] = new_status
            save_tickets(tickets)
            print("Updated!\n")
            return
        
    print("Ticket not found.\n")


def add_comment():
    tickets = load_tickets()
    ticket_id = int(input("Enter ticket ID: "))
    comment = input("Enter comment: ")

    for t in tickets:
        if t["id"] == ticket_id:
            t["comments"].append(comment)
            save_tickets(tickets)
            print("Comment added!\n")
            return
    
    print("Ticket not found.\n")

def main():
    while True:
        print("1. Create Ticket")
        print("2. View Tickets")
        print("3. Update Ticket")
        print("4. Add Comment")
        print("5. Exit")

        choice = input("Choose: ")

        if choice == "1":
            create_ticket()
        elif choice == "2":
            view_tickets()
        elif choice == "3":
            update_ticket()
        elif choice == "4":
            add_comment()
        elif choice == "5":
            break


main()