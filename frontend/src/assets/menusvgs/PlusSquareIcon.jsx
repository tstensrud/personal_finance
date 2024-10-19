import { svgDimension, svgClassList, svgActiveIndex, svgNoneActive } from './svgSettings';

function PlusSquareIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimension} height={svgDimension} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="stroke-light-grey group-hover:stroke-primary-color fill-none stroke-2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
    );
}

export default PlusSquareIcon;