import { svgDimension, svgClassList, svgActiveIndex, svgNoneActive } from './svgSettings';

function MinimizeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimension} height={svgDimension} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-light-grey group-hover:stroke-primary-color fill-none stroke-2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
        </svg>
    );
}

export default MinimizeIcon;