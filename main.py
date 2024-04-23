from pf import create_app

personal_finance = create_app()
if __name__ == "__main__":
    personal_finance.run(debug=True)
