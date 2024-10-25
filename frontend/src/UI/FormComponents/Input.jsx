import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
    return (
        <div className="flex w-full h-full">
            <input ref={ref} name={props.name} type={props.type} onChange={props.onChange} placeholder={props.placeholder} className="w-full h-full pl-4 bg-secondary-color border border-grey-border-color rounded-lg outline-none hover:border-accent-color-main focus:border-accent-color-main" required/>
            {
                props.search && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" className="stroke-light-grey fill-none relative right-8 top-1/2 -translate-y-1/2">
                        <circle cx="10.5" cy="10.5" r="7.5"></circle>
                        <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
                    </svg>
                )
            }
        </div>
    );
});

export default Input;