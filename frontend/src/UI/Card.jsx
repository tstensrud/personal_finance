function Card({children}) {
    return (
        <div className="flex flex-col rounded-lg w-full">
            {children}
        </div>
    );
}

export default Card;