import React, {useEffect} from 'react';

// export default ({title}) => {

//     useEffect(() => {
//         console.log(title);
//     });

//     return (
//         <p>{title}</p>
//     )
// };
export default React.memo(({title}) => {

    useEffect(() => {
        console.log(title);
    });

    return (
        <p>{title}</p>
    )
});