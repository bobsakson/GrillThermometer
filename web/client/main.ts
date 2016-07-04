import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideForms } from '@angular/forms';
import { AppComponent } from './components/app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, provideForms()]);