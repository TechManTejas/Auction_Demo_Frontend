import React from 'react';
import { Layout, Result, Button } from 'antd';

const { Content } = Layout;

const FailurePage = () => {
    return (
        <Layout className="layout">
            <Content style={{ padding: '50px' }}>
                <Result
                    status="error"
                    title="Auction Ended"
                    subTitle="Unfortunately, the auction has ended."
                    extra={[
                        <Button type="primary" key="home" href="/">
                            Go Home
                        </Button>,
                    ]}
                />
            </Content>
        </Layout>
    );
};

export default FailurePage;
