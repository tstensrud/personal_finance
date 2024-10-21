from datetime import datetime

def log(entry):
    with open("api_log.txt", "a") as file:
        file.writelines(f"- {datetime.now()}: {entry}\n")

def is_int(input):
    try:
        int(input)
        return True
    except Exception as e:
        return False