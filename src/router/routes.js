import Login from 'modules/login/login';
import Home from 'components/home/home';
import MonitorModule from 'modules/monitorModule/monitorModule';

const routes = [{
    path: '/login',
    component: Login,
    // 通过hidden控制导航栏的显示与隐藏
    hidden: true
}, {
    path: '/',
    component: Home,
    name: '监控警报',
    id: 1,
    children: [
        { path: '/monitorModule', component: MonitorModule, name: '监控总览' },
        { path: '/alarmModule', component: MonitorModule, name: '警报' }
    ]
}, {
    path: '/',
    component: Home,
    name: '集群模块',
    children: [
        { path: '/clusterModule', component: MonitorModule, name: '集群管理' },
        { path: '/nodeModule', component: MonitorModule, name: '节点管理' }
    ]
}, {
    path: '*',
    redirect: '/login'
}];

export default routes;
