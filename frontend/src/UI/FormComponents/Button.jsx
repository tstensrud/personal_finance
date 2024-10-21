function Button({buttonText, onClick, type}) {
    return (
        <button className="border border-grey-border-color hover:border-accent-color-main focus:border-accent-color-main rounded-lg pt-2 pb-2 pl-5 pr-5 focus:outline-none">
            {buttonText}
        </button>
    );
}

export default Button;