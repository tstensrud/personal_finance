import { svgDimension, svgClassList, svgActiveIndex, svgNoneActive } from './svgSettings';

function SpendingIcon({ activeIndex, index }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimension} height={svgDimension} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={`${activeIndex === index ? svgActiveIndex : svgNoneActive} ${svgClassList}`}>
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10">
            </line>
        </svg>
    );
}

export default SpendingIcon;