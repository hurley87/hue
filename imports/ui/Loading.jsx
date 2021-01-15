import React from 'react';
import IosRefresh from "react-ionicons/lib/IosRefresh";
import styled from 'styled-components';

const LoadingStyle = styled.div`
    text-align: center;
    padding-top: 150px;
`;

export const Loading = () => {
    return (
        <LoadingStyle>
            <IosRefresh fontSize="60px" color="#020202" rotate={true} />
        </LoadingStyle>
    );
};