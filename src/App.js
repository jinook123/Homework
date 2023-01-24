
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import './dx-styles.scss';
import { NavigationProvider } from './contexts/navigation';
import Content from './Content';
import themes from 'devextreme/ui/themes';

function App() {

    // 기본 테마 설정
    useEffect(() => themes.current('material.blue.light'), []);

    return (
        <>
            <Content />
        </>
    )
}

export default function Root() {
    return (
        <>
            <Router>
                <NavigationProvider>
                    <div className={`app`}>
                        <App />
                    </div>
                </NavigationProvider>
            </Router>
        </>
    );
}
