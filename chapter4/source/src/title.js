import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

Title.propTypes = {
    title: PropTypes.string.isRequired,
};

function Title({title}) {
    useEffect(() => {
        console.log(title);
    });

    return (
        <p>{title}</p>
    )
}


export default React.memo(Title);