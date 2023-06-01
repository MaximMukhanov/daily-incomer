import { Button, Col, Input, Row, Select, Typography } from 'antd';
export const CreateTransfer = () => {
  return (
    <div style={{ display: 'block' }}>
      <Typography.Title level={3} style={{ padding: '1%' }}>
        Create an Transfer
      </Typography.Title>
      <Input
        style={{ marginLeft: '10px', width: '60%' }}
        placeholder="Summ"
      ></Input>
      <Select
        defaultValue="dollars"
        onChange={() => {}}
        options={[
          { value: 'dollars', label: 'dollars' },
          { value: 'гривна', label: 'гривна' },
          { value: 'злоты', label: 'злоты' },
        ]}
      ></Select>
      <Row style={{ marginTop: '1%' }}>
        <Col span={6} style={{ marginLeft: '1%' }}>
          <div style={{ justifyContent: 'space-between' }}>
            <Typography.Title
              level={5}
              style={{ display: 'inline-flex', padding: '1%' }}
            >
              From:
            </Typography.Title>
            <Select
              defaultValue="account1"
              onChange={() => {}}
              options={[
                { value: 'account1', label: 'account1' },
                { value: 'account2', label: 'account2' },
                { value: 'account3', label: 'account3' },
              ]}
            ></Select>
          </div>
        </Col>
        <Col span={6} offset={7}>
          <div style={{ justifyContent: 'space-between' }}>
            <Typography.Title
              level={5}
              style={{ display: 'inline-flex', padding: '1%' }}
            >
              To:
            </Typography.Title>
            <Select
              defaultValue="account1"
              onChange={() => {}}
              options={[
                { value: 'account1', label: 'account1' },
                { value: 'account2', label: 'account2' },
                { value: 'account3', label: 'account3' },
              ]}
            ></Select>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={22} style={{ marginLeft: '2%' }}>
          <Input.TextArea
            rows={4}
            style={{ resize: 'none' }}
            placeholder="comment (optional)"
          ></Input.TextArea>
        </Col>
      </Row>
      <Row style={{ margin: '1%', alignItems: 'center' }}>
        <Col span={20} offset={1}>
          <div>Datetime</div>
        </Col>
        <Col span={2} style={{ margin: '1%' }}>
          <Button>Create</Button>
        </Col>
      </Row>
    </div>
  );
};
