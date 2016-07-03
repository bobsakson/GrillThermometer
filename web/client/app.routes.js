"use strict";
var router_1 = require('@angular/router');
var probe_component_1 = require('./components/probe.component');
var profile_component_1 = require('./components/profile.component');
var profileDetail_component_1 = require('./components/profileDetail.component');
var routes = [
    {
        path: '',
        redirectTo: '/probe',
        pathMatch: 'full'
    },
    {
        path: 'probe',
        component: probe_component_1.ProbeComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent
    },
    {
        path: 'profile/:id',
        component: profileDetail_component_1.ProfileDetailComponent
    }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map