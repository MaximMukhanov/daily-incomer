import { Layout } from 'antd';
import { GroupCabinet } from 'ui';

const Web = () => {
  return (
    <Layout>
      <Layout.Header>KEK</Layout.Header>
      <Layout.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <GroupCabinet></GroupCabinet>
      </Layout.Content>
    </Layout>
  );
};

export default Web;
