import React from 'react';
import TopBar from '../top-bar';

type Props = {
    children: React.ReactElement;
}

const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <TopBar />
            <div style={{ padding: '1rem 2rem' }}>{children}</div>
        </>
    );
};

export default MainLayout;
