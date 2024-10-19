function Card({children}) {
    return (
        <div className="flex flex-col bg-tertiary-color rounded-lg w-full">
            {children}
        </div>
    );
}

export default Card;