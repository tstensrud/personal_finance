import { svgDimension, svgClassList, svgActiveIndex, svgNoneActive } from './svgSettings';

function MinimizeIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 -960 960 960" strokeLinecap="round" strokeLinejoin="round" className="stroke-light-grey group-hover:stroke-primary-color group-hover:fill-primary-color fill-light-grey stroke-2">
            <path d="M643.41-385.87v-188.26q0-10.48-9.89-14.39-9.88-3.91-17.24 3.44l-83.15 83.16q-9.36 9.4-9.36 21.94 0 12.54 9.36 21.9l83.15 83.16q7.36 7.35 17.24 3.44 9.89-3.91 9.89-14.39ZM202.57-140q-25.71 0-44.14-18.43T140-202.57v-554.86q0-25.71 18.43-44.14T202.57-820h554.86q25.71 0 44.14 18.43T820-757.43v554.86q0 25.71-18.43 44.14T757.43-140H202.57Zm120.81-50.26v-579.48H202.57q-4.62 0-8.47 3.84-3.84 3.85-3.84 8.47v554.86q0 4.62 3.84 8.47 3.85 3.84 8.47 3.84h120.81Zm50.26 0h383.79q4.62 0 8.47-3.84 3.84-3.85 3.84-8.47v-554.86q0-4.62-3.84-8.47-3.85-3.84-8.47-3.84H373.64v579.48Zm-50.26 0H190.26h133.12Z"/>
        </svg>
    );
}

export default MinimizeIcon;