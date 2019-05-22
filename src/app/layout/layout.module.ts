import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchFormModule } from './search-form/search-form.module';
import { PulsarMaterialModule } from 'src/material-module';
import { PopupModule } from './common/popup/popup.module';
import { LocationViewComponent } from './location-view/location-view.component';
import { LocationViewModule } from './location-view/location-view.module';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        TranslateModule,
        PopupModule
    ],
    declarations: [LayoutComponent, NavComponent, TopnavComponent, SidebarComponent],
    exports : [
        PulsarMaterialModule,
        SearchFormModule,
        LocationViewModule
    ]
})
export class LayoutModule {}
