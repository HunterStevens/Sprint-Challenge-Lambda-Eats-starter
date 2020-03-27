import React from 'react';
import {Link} from 'react-router-dom';

function Home(){

    return(
        <div>
            <Link to={'/Pizza'}>
                <button>Make your order!</button>
            </Link>
        </div>
    )
}
export default Home; 