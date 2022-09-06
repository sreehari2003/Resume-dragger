import React from 'react';
import { Protected } from '../../hooks';

const Branch = () => {
    Protected();
    return <div>Hello world</div>;
};

export default Branch;
