
import { withNavigationWatcher } from './contexts/navigation';
import { HomePage } from './pages';

// route 설정
const routes = [
    {
        path: '/home',
        component: HomePage,
    },
    
];

export default routes.map((route) => {
    return {
        ...route,
        component: withNavigationWatcher(route.component),
    };
});
