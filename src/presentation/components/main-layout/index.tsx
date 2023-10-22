import React from 'react';
import TopBar from '../top-bar';

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
        <>
            <TopBar />
            <div style={{ padding: '1rem 2rem' }}>{children}</div>
        </>
    );
};

export default MainLayout;
