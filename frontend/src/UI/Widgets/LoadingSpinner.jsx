function LoadingSpinner({ text }) {
    return (
        <div className="flex w-full h-full justify-center items-center text-center">
            <div className="border-4 border-tertiary-color rounded-full border-t-accent-color-main w-5 h-5 animate-spin mr-1"></div>
            {
                text && <div className="flex items-center justify-center">Loading&nbsp;{text}</div>
            }
        </div>
    );
}

export default LoadingSpinner;