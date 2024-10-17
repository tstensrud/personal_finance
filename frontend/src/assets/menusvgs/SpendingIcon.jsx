import { svgDimension, svgClassList } from './svgSettings';

function SpendingIcon({ activeIndex, index }) {
    return (
        <svg width={svgDimension} height={svgDimension} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`${activeIndex === index ? 'stroke-primary-color' : 'stroke-light-grey'} ${svgClassList}`}>
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10">
            </line>
        </svg>
    );
}

export default SpendingIcon;