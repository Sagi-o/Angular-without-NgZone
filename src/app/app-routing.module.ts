import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutsideZoneExampleComponent } from './components/outside-zone-example/outside-zone-example.component';
import { WatchExampleComponent } from './components/watch-example/watch-example.component';

const routes: Routes = [
  {
    path: 'watch-example',
    component: WatchExampleComponent
  },
  {
    path: 'outside-zone-example',
    component: OutsideZoneExampleComponent
  },
  {
    path: '**',
    redirectTo: 'outside-zone-example'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
