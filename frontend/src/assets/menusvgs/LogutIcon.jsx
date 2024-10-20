import { svgDimension, svgClassList, svgActiveIndex, svgNoneActive } from './svgSettings';

function LogoutIcon
    ({ activeIndex, index }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimension} height={svgDimension} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={`${activeIndex === index ? svgActiveIndex : svgNoneActive} ${svgClassList}`}>
            <path d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5"></path>
            <polyline points="17 16 21 12 17 8"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
    );
}

export default LogoutIcon
    ;