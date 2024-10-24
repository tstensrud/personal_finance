import { svgDimensionGoogleIcons} from './svgSettings';

function SpendingIcon({ activeIndex, index }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimensionGoogleIcons} height={svgDimensionGoogleIcons} viewBox="0 -960 960 960" strokeLinecap="round" strokeLinejoin="round" className={`${activeIndex === index ? 'fill-accent-color-main' : 'fill-primary-color group-hover:fill-primary-color'} stroke-2  duration-100`}>
            <path d="M190.26-256.11v65.85-579.48 513.63ZM202.57-140q-25.71 0-44.14-18.43T140-202.57v-554.86q0-25.71 18.43-44.14T202.57-820h554.86q25.71 0 44.14 18.43T820-757.43v125.35h-50.26v-125.35q0-5.39-3.46-8.85t-8.85-3.46H202.57q-5.39 0-8.85 3.46t-3.46 8.85v554.86q0 5.39 3.46 8.85t8.85 3.46h554.86q5.39 0 8.85-3.46t3.46-8.85v-124.94H820v124.94q0 25.71-18.43 44.14T757.43-140H202.57Zm338.37-166.36q-28.49 0-48.9-20.2-20.4-20.2-20.4-48.72v-209.03q0-28.52 20.4-48.72 20.41-20.2 48.9-20.2h250.55q28.8 0 49.19 20.2 20.4 20.2 20.4 48.72v209.03q0 28.52-20.4 48.72-20.39 20.2-49.19 20.2H540.94Zm257.57-50.26q5.13 0 8.72-3.46 3.59-3.46 3.59-8.84v-221.75q0-5.12-3.59-8.71-3.59-3.59-8.72-3.59h-264.3q-5.13 0-8.72 3.59-3.59 3.59-3.59 8.71v221.75q0 5.38 3.59 8.84t8.72 3.46h264.3Zm-152.4-61.48q25.66 0 43.7-18.18 18.04-18.17 18.04-44.13 0-25.83-18.28-43.66t-43.62-17.83q-25.67 0-43.91 17.83-18.25 17.83-18.25 43.66 0 25.96 18.18 44.13 18.17 18.18 44.14 18.18Z"/>
        </svg>
    );
}

export default SpendingIcon;