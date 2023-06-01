import { Button, Card, Col, Row, Typography } from 'antd';
import { useState } from 'react';
import { CreateExpances } from './CreateExpances';
import { CreateIncome } from './CreateIncome';
import { CreateTransfer } from './CreateTransfer';

export const GroupCabinet = () => {
  const [section, SetSection] = useState('Expances');
  return (
    <Card style={{ width: '90%' }} title="My Group">
      <Row>
        <Col span={10} offset={1}>
          <Row>
            <Col span={24}>
              <Card
                style={{ minHeight: '300px' }}
                bodyStyle={{ padding: '0px' }}
              >
                <Row>
                  <Col span={8}>
                    <Button
                      style={{ minWidth: '100%' }}
                      onClick={() => {
                        SetSection('Expances');
                      }}
                    >
                      Expances
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button
                      style={{ minWidth: '100%' }}
                      onClick={() => {
                        SetSection('Income');
                      }}
                    >
                      Income
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button
                      style={{ minWidth: '100%' }}
                      onClick={() => {
                        SetSection('Transfer');
                      }}
                    >
                      Transfer
                    </Button>
                  </Col>
                </Row>
                {section == 'Expances' ? (
                  <CreateExpances></CreateExpances>
                ) : null}
                {section == 'Income' ? <CreateIncome></CreateIncome> : null}
                {section == 'Transfer' ? (
                  <CreateTransfer></CreateTransfer>
                ) : null}
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: '3%' }}>
            <Col span={24}>
              <Card style={{ minHeight: '300px' }}>
                <Typography.Title level={3}>
                  List of {section} (for a month)
                </Typography.Title>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={7} offset={3}>
          <Card style={{ minHeight: '600px' }}>
            <Typography.Title level={3}>Remains</Typography.Title>
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div>account name</div>
              <div style={{ display: 'block' }}>
                <div>summ cur</div>
                <div>summ cur</div>
                <div>summ cur</div>
              </div>
            </div>
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '5%',
              }}
            >
              <div>account name</div>
              <div style={{ display: 'block' }}>
                <div>summ cur</div>
                <div>summ cur</div>
                <div>summ cur</div>
              </div>
            </div>
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '5%',
              }}
            >
              <div>account name</div>
              <div style={{ display: 'block' }}>
                <div>summ cur</div>
                <div>summ cur</div>
                <div>summ cur</div>
              </div>
            </div>
            <Button style={{ marginTop: '3%' }}>Create new account</Button>
            <Typography.Title level={3} style={{ marginTop: '10%' }}>
              Total
            </Typography.Title>
            <div style={{ float: 'right' }}>summ cur</div>
            <br></br>
            <div style={{ float: 'right' }}>summ cur</div>
            <br></br>
            <div style={{ float: 'right' }}>summ cur</div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
