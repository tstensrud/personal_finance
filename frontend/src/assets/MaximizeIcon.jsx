function MaximizeIcon ({ dimensions }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={dimensions} viewBox="0 -960 960 960" width={dimensions} className="fill-light-grey group-hover:fill-primary-color cursor-pointer">
            <path d="M160-120q-17 0-28.5-11.5T120-160v-240q0-17 11.5-28.5T160-440q17 0 28.5 11.5T200-400v144l504-504H560q-17 0-28.5-11.5T520-800q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v240q0 17-11.5 28.5T800-520q-17 0-28.5-11.5T760-560v-144L256-200h144q17 0 28.5 11.5T440-160q0 17-11.5 28.5T400-120H160Z"/>
        </svg>
    );
}

export default MaximizeIcon;