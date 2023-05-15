import { ConfigProvider } from 'antd';

const withTheme = (element: JSX.Element) => (
  <ConfigProvider>{element}</ConfigProvider>
);

export default withTheme;
