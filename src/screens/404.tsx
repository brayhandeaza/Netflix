import { Result } from 'antd';
import { useEffect } from 'react';

export default () => (
    useEffect(() => {
        if (window.location.pathname === "/login")
            window.location.href = "/"

    }, []),

    <Result
        style={{ width: '100%', height: '100%', backgroundColor: '#242424' }}
        className="mt-5"
        status={404}
        title={<h1 style={{ color: 'white' }}>404</h1>}
        subTitle={<h4 style={{ color: 'white' }}>Movie trailer not found</h4>}
        extra={
            <button style={{ width: '150px' }} className="theme-btn" onClick={() => window.location.href = "/"}>Back Home</button>
        }
    />
);

