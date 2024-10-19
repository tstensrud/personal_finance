import { svgDimension, svgClassList, svgActiveIndex, svgNoneActive } from './svgSettings';

function MaximizeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimension} height={svgDimension} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-light-grey group-hover:stroke-primary-color fill-none stroke-2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
        </svg>
    );
}

export default MaximizeIcon;