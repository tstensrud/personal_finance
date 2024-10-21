from datetime import datetime

def log(entry):
    with open("auth_log.txt", "a") as file:
        file.writelines(f"- {datetime.now()}: {entry}\n")