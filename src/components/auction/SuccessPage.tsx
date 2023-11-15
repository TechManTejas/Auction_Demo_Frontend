import React from 'react';
import { Layout, Result, Button } from 'antd';

const { Content } = Layout;

const SuccessPage = () => {
    return (
        <Layout className="layout">
            <Content style={{ padding: '50px' }}>
                <Result
                    status="success"
                    title="Congratulations! You won the auction."
                    subTitle="You successfully placed the highest bid."
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

export default SuccessPage;
