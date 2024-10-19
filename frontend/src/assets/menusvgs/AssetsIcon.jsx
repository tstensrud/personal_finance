import { svgDimension, svgClassList, svgActiveIndex, svgNoneActive } from './svgSettings';

function AssetsIcon({ activeIndex, index }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimension} height={svgDimension} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={`${activeIndex === index ? svgActiveIndex : svgNoneActive} ${svgClassList}`}>
            <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>
        </svg>
    );
}

export default AssetsIcon;