import React from 'react'
import {UserContextConsumer} from './UserContext';

// export default function Greeting({username}) {
//     return <p>{`${username}님 안녕하세요.`}</p>;
// }

export default function Greeting() {
    return (
        <UserContextConsumer>
            {username => <p>{`${username}님 안녕하세요.`}</p>}
        </UserContextConsumer>
    );
}