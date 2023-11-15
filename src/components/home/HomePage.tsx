// HomePage.jsx
import React from 'react';
import { Layout, Card, Button } from 'antd';

const { Content } = Layout;

const HomePage = () => {
    return (
        <Layout className="layout">
            <Content style={{ padding: '50px' }}>
                <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>Welcome to Your Auction App</h1>
                <p>
                    Your Auction App is a platform where you can participate in exciting auctions and place bids on
                    unique items. Join now and experience the thrill of winning!
                </p>
                <Card
                    hoverable
                    cover={
                        <img
                            alt="Auction Item"
                            src="https://images.unsplash.com/photo-1514195037031-83d60ed3b448?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                    }
                >
                    <h2>Auction Item Title</h2>
                    <p>
                        Item Description. Provide details about the item, its condition, and any other relevant
                        information.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button type="primary" href="/signin">
                            Login
                        </Button>
                        <Button type="primary" href="/signup">
                            Signup 
                        </Button>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default HomePage;
