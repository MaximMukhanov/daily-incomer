import { Button, Card } from 'antd';
const users = ['Max', 'Boom', 'Kira'];
export const GroupSettings = () => {
  return (
    <Card title="Group settings" style={{ width: '40%' }}>
      <div>Group name: My Group</div>
      <div>Change name: *******</div>
      <div>User list:</div>
      {users.map((element) => {
        return (
          <div
            style={{ display: 'block', justifyContent: 'space-between' }}
            key={element}
          >
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: '100%',
              }}
            >
              <div style={{ marginLeft: '3%' }}>{element}</div>
              <Button size="small" style={{ marginRight: '50%' }}>
                Delete
              </Button>
            </div>
          </div>
        );
      })}
      <Button>Invite new user</Button>
      <div>
        <Button style={{ marginTop: '1%' }}>
          <div>DeleteGroup</div>
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '5%',
        }}
      >
        <Button>Reset</Button>
        <Button>Save</Button>
      </div>
    </Card>
  );
};
