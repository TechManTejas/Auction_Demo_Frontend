import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Card, Button, Input, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const AuctionPage: React.FC = () => {
    
    const navigate = useNavigate();

    const [myBid, setMyBid] = useState<number>(0);
    const [highestBidderName, setHighestBidderName] = useState<string>();
    const [othersBid, setOthersBid] = useState<number>(100);
    const [countdown, setCountdown] = useState<number>(300); // 5 minutes in seconds

    const socket = io('http://localhost:8000');

    const handleBidIncrease = (amount: number) => {
        setOthersBid(prevBid => {
            const newBid = prevBid + amount;
            socket.emit('bid', newBid, localStorage.getItem('token'));
            return newBid;
        });
        setMyBid(othersBid + amount)
    };


    useEffect(() => {
        // Cleanup socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    socket.on('initialAuctionData', (data: { highestBidder: number, highestBidderName: string,userId: string }) => {
        setOthersBid(data.highestBidder);
        setHighestBidderName(data.highestBidderName)
        console.log(`User ${data.userId} connected`);
    });

    socket.on('updateBid', (data: { highestBidder: number, highestBidderName: string, userId: string }) => {
        setOthersBid(data.highestBidder);
        setHighestBidderName(data.highestBidderName)
        console.log(`User ${data.userId} placed a bid`);
    });

    socket.on('updateTime', (data: { timeRemaining: number }) => {
        console.log("Time remaining: " + data.timeRemaining)
        setCountdown(Math.floor(data.timeRemaining / 1000));
    });

    socket.on('auctionEnd', () => {
        console.log('Auction ended');
        if(myBid === othersBid)
            navigate("/success")
        else 
            navigate("/failure")
    });

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(countdownInterval);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">Auction</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Auction</Breadcrumb.Item>
                </Breadcrumb>
                <h2 className='text-center font-bold text-3xl'>{localStorage.getItem("username")}</h2>
                <div className="site-layout-content">
                    <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>Time Left: {formatTime(countdown)}</h1>
                    <h2>What's on the Auction</h2>
                    <Card
                        hoverable
                        cover={<img alt="Auction Item" src="https://images.unsplash.com/photo-1514195037031-83d60ed3b448?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />}
                    >
                        <Meta title="Auction Item Title" description="Item Description. Provide details about the item, its condition, and any other relevant information." />
                    </Card>
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={8}>
                            <h3>{myBid == othersBid? <div className='text-green-600'>You</div>:<div className='text-red-600'>Other</div>}</h3>
                            <p>${myBid}</p>
                        </Col>
                        <Col span={8}>
                            <h3>Highest Bid</h3>
                            <p>${othersBid} - {highestBidderName}</p>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                        <Col span={8}>
                            <Button type="default" onClick={() => handleBidIncrease(100)}>
                                Bid +$100
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button type="default" onClick={() => handleBidIncrease(500)}>
                                Bid +$500
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button type="default" onClick={() => handleBidIncrease(1000)}>
                                Bid +$1000
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Your Auction App ©2023 Created by You</Footer>
        </Layout>
    );
};

export default AuctionPage;
