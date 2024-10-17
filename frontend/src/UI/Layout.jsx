import NavPanel from './Navpanel/Navpanel';
function Layout() {
    return (
        <div className="flex flex-row p-2 w-full h-full bg-tertiary-color">
            <div className="w-52 pl-1 pr-1">
                <NavPanel />
            </div>
            <div className="flex flex-1 p-3 rounded-lg border border-grey bg-secondary-color">

            </div>
        </div>
    );
}

export default Layout;