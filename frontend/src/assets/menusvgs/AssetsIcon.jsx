import { svgDimensionGoogleIcons } from './svgSettings';

function AssetsIcon({ activeIndex, index }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={svgDimensionGoogleIcons} height={svgDimensionGoogleIcons} viewBox="0 -960 960 960" strokeLinecap="round" strokeLinejoin="round" className={`${activeIndex === index ? 'fill-accent-color-main' : 'fill-light-grey group-hover:fill-primary-color'} stroke-2 transition duration-100`}>
            <path d="M235.95-286.05v-278.57q0-10.68 7.26-17.9 7.27-7.23 18-7.23 10.74 0 17.87 7.23 7.13 7.22 7.13 17.9v278.57q0 10.68-7.27 17.9-7.26 7.23-18 7.23-10.73 0-17.86-7.23-7.13-7.22-7.13-17.9Zm220.82 0v-278.57q0-10.68 7.26-17.9 7.27-7.23 18-7.23 10.74 0 17.87 7.23 7.12 7.22 7.12 17.9v278.57q0 10.68-7.26 17.9-7.26 7.23-18 7.23-10.73 0-17.86-7.23-7.13-7.22-7.13-17.9ZM135.9-140.41q-10.68 0-17.9-7.26-7.23-7.27-7.23-18 0-10.74 7.23-17.87 7.22-7.13 17.9-7.13h688.2q10.68 0 17.9 7.27 7.23 7.26 7.23 18 0 10.73-7.23 17.86-7.22 7.13-17.9 7.13H135.9Zm537.89-145.64v-278.57q0-10.68 7.27-17.9 7.26-7.23 18-7.23 10.73 0 17.86 7.23 7.13 7.22 7.13 17.9v278.57q0 10.68-7.26 17.9-7.27 7.23-18 7.23-10.74 0-17.87-7.23-7.13-7.22-7.13-17.9ZM827.54-660H130.03q-7.83 0-13.55-5.7-5.71-5.7-5.71-13.47v-13.35q0-5.21 2.84-9.73 2.83-4.52 7.6-6.98l330-173.85q13.56-6.97 28.72-6.97 15.16 0 28.86 6.97l329.05 172.85q5.23 3.18 8.31 8.18t3.08 11.44v8.49q0 9.63-6.09 15.88-6.1 6.24-15.6 6.24Zm-596.31-50.26h497.54-497.54Zm0 0h497.54L485.39-838.51q-2.7-1.16-5.39-1.16-2.69 0-5.39 1.16L231.23-710.26Z" />
        </svg>
    );
}

export default AssetsIcon;