import { Button, Card, Select, Space, Typography } from 'antd';
export const PersonalCabinet = () => {
  return (
    <Card title="Personal Cabinet" style={{ width: 600 }}>
      <div style={{ display: 'inline-flex' }}>
        <p>User Uid: </p>
        <p style={{ marginLeft: '20px' }}>XXXXXX</p>
      </div>
      <div></div>
      <div style={{ display: 'inline-flex' }}>
        <p>User Name: </p>
        <Typography.Paragraph
          editable={{
            tooltip: 'click to edit text',
          }}
          style={{ marginLeft: '15px' }}
        >
          XXXXX
        </Typography.Paragraph>
      </div>
      <p>Email: user email</p>
      <p>Password: *******</p>
      <p>Change password: *******</p>
      <div style={{ display: 'inline-flex' }}>
        <Space align="center">
          <p style={{ marginTop: '10px' }}>Timezone:</p>
          <Select
            defaultValue="GMT+2"
            style={{ width: 120 }}
            onChange={() => {}}
            options={[
              { value: 'GMT+2', label: 'GMT+2' },
              { value: 'GMT+3', label: 'GMT+3' },
              { value: 'GMT+4', label: 'GMT+4' },
              { value: 'GMT+5', label: 'GMT+5' },
            ]}
          ></Select>
        </Space>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button>Reset</Button>
        <Button>Save</Button>
      </div>
    </Card>
  );
};
