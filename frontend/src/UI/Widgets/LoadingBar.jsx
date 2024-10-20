function LoadingBar() {
    return (
        <div className="relative w-full h-6 overflow-hidden">
            <div className="w-full h-1/5 bg-accent-color-main-faded">
                <div className="w-[20%] h-1/5 bg-accent-color-main absolute animate-slide"></div>
            </div>
        </div>
    );
}

export default LoadingBar