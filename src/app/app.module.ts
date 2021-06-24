import { NgModule } from '@angular/core';
import { BrowserModule, EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree/tree.component';
import { NodeComponent } from './tree/node/node.component';
import { WatchExampleComponent } from './watch-example/watch-example.component';
import { OutsideZoneExampleComponent } from './outside-zone-example/outside-zone-example.component';
import { ZonelessEventPluginService } from './services/zoneless-event-plugin.service';
import { WatchPipe } from './pipes/watch.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    NodeComponent,
    WatchExampleComponent,
    OutsideZoneExampleComponent,
    WatchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: ZonelessEventPluginService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
