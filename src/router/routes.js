import Login from 'modules/login/login';
import Home from 'components/home/home';
import MonitorModule from 'modules/monitorModule/monitorModule';
import ClusterModule from 'modules/clusterModule/clusterModule';

const routes = [{
    path: '/login',
    component: Login
}, {
    path: '/',
    component: Home,
    id: 1,
    children: [
        { path: '/monitorModule', component: MonitorModule, name: '监控总览' },
        { path: '/alarmModule', component: MonitorModule, name: '警报' }
    ]
}, {
    path: '/',
    component: Home,
    children: [
        { path: '/clusterModule', component: ClusterModule, name: '集群管理' },
        { path: '/nodeModule', component: MonitorModule, name: '节点管理' }
    ]
}, {
    path: '*',
    redirect: '/login'
}];

export default routes;
