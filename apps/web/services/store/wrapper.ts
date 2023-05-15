import { createWrapper } from 'next-redux-wrapper';
import makeStore from './store';
import { AppStore } from './types';

/**
 * **wrapper** - функция обертка для Redux Querry, позволяет оборачивать *getServerSideProps* и *getStaticProps* из Next.js
 *
 * Документация по принципам работы с `next-redux-wrapper`
 * @link https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering
 */
const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

export default wrapper;
