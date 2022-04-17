const classNames = require('classnames');

const ContextDetails = (props: any) => {


    const { classes, value } = props;


    return (

        <textarea className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-sm
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none
      "
            id="exampleFormControlTextarea1"

            value={value}
        >

        </textarea>

    );
};


export default ContextDetails as any;
