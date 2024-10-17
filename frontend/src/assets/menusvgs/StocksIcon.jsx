import { svgDimension, svgClassList } from './svgSettings';

function StocksIcon({ activeIndex, index }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimension} height={svgDimension} viewBox="0 0 24 24" className={`${activeIndex === index ? 'stroke-primary-color' : 'stroke-light-grey'} ${svgClassList}`}>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
    );
}

export default StocksIcon;