import Input from "../FormComponents/Input";

function PageHeader() {
    return (
        <div className="flex w-full h-16 items-center top-0 sticky border-b border-grey">
            <div className="text-2xl font-semibold -tracking-wide">
                Your personal finances
            </div>
            <div className="flex flex-1 h-full items-center justify-end">
                <div className="w-30 h-10">
                    <Input placeholder="Search" search />
                </div>
                <div>
                    <div className="flex items-center justify-center rounded-full h-10 w-10 bg-accent-color-main-faded text-xl font-semibold">
                        T
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageHeader;