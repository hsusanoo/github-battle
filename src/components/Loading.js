import React from 'react';
import {ClipLoader} from 'react-spinners';

const Loading = () =>
    <div className='sweet-loading'>
        <ClipLoader
            sizeUnit={"px"}
            size={70}
            color={'#D0021B'}
        />
    </div>;

export default Loading;