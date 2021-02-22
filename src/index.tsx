import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import render from './App';

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = (loading: boolean) => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: 'react16',
      entry: '//localhost:7100',
      container: '#subapp-viewport',
      loader,
      activeRule: '/react16',
    },
    {
      name: 'vue3',
      entry: '//localhost:7105',
      container: '#subapp-viewport',
      loader,
      activeRule: '/vue3',
    },
  ],
//   {
//     beforeLoad: [
//       app => {
//         console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
//       },
//     ],
//     beforeMount: [
//       app => {
//         console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
//       },
//     ],
//     afterUnmount: [
//       app => {
//         console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
//       },
//     ],
//   },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/react16');

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
