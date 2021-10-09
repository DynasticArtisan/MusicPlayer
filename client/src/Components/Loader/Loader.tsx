import React from 'react'
import { CircularProgress } from '@material-ui/core';

const Loader = () => {
    return (
        <>
            <div className="wrapper">
                <CircularProgress color="secondary"/>
            </div>
            <style>
                {`
                    .wrapper {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                `}
            </style>
        </>
    )
}

export default Loader
