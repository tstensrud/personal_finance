import { svgDimensionGoogleIcons } from './svgSettings';

function StocksIcon({ activeIndex, index }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimensionGoogleIcons} height={svgDimensionGoogleIcons} viewBox="0 -960 960 960" strokeLinecap="round" strokeLinejoin="round" className={`${activeIndex === index ? 'fill-accent-color-main' : 'fill-primary-color group-hover:fill-primary-color'} stroke-2  duration-100`}>
            <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
        </svg>
    );
}

export default StocksIcon;