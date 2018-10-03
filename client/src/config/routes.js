import Loadable from 'react-loadable';
import DelayLoading from '../components/DelayLoading';

const Dashboard  = Loadable({loader: () => import('../views/Admin/Dashboard'), loading: DelayLoading, delay: 3000});
const UserList   = Loadable({loader: () => import('../views/Admin/UserManage/UserList'), loading: DelayLoading, delay: 3000});
const UserEdit   = Loadable({loader: () => import('../views/Admin/UserManage/UserEdit'), loading: DelayLoading, delay: 3000});
const postManage = Loadable({loader: () => import('../views/Admin/postManage'), loading: DelayLoading, delay: 3000});
const tagManage  = Loadable({loader: () => import('../views/Admin/tagManage'), loading: DelayLoading, delay: 3000});

export default [{
    'path': '/dashboard',
    'component': Dashboard
}, {
    'path': '/userManage/userList',
    'component': UserList
}, {
    'path': '/userManage/userEdit',
    'component': UserEdit
}, {
    'path': '/postManage',
    'component': postManage
}, {
    'path': '/tagManage',
    'component': tagManage
}]