import { Routes } from '@angular/router';
import { UserComponent } from './components/users/user.component';

export const APP_ROUTE: Routes = [
    {
        path: '',
        component: UserComponent,
        loadChildren: () =>
        import('../app/components/users/user.routes')
    },
];

