import { svgDimension, svgClassList } from './svgSettings';

function HomeIcon({ activeIndex, index }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={svgDimension} height={svgDimension} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={`${activeIndex === index ? 'stroke-primary-color ' : 'stroke-light-grey '} ${svgClassList}`}>
			<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
			<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
		</svg>
	);
}

export default HomeIcon;