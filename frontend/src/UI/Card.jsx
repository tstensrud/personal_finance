function Card({children}) {
    return (
        <div className="flex flex-col bg-secondary-color rounded-lg w-full border border-grey-border-color">
            {children}
        </div>
    );
}

export default Card;