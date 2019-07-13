import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatModule } from './mat/mat.module';
import { TCustomerComponent } from './components/t-customer/t-customer.component';
import { TAdminComponent } from './components/t-admin/t-admin.component';
import { MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatTableModule,
   MatDatepickerModule,MatNativeDateModule,MatSnackBarModule,
  MatPaginatorModule, MatSortModule,MatFormFieldModule ,MatInputModule,MatCardModule,MatProgressSpinnerModule} from '@angular/material';
import { AppnavComponent } from './appnav/appnav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageDialogComponent } from './shared/image-dialog/image-dialog.component';
import { MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from '../app/components/login/login.component';
import { AppealComponent } from '../app/components/appeal/appeal.component';
import { DialogComponent } from '../app/components/dialog/dialog.component';
import { SnackbarComponent } from '../app/components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TCustomerComponent,
    TAdminComponent,
    AppnavComponent,
    AdminTableComponent,
    CustomerTableComponent,
    ImageDialogComponent,
    LoginComponent,
    AppealComponent,
    DialogComponent,
    SnackbarComponent
    
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,
    AppRoutingModule,BrowserAnimationsModule,MatModule,MatDialogModule,MatCardModule,MatProgressSpinnerModule,MatSnackBarModule,FlexLayoutModule,
    MatSidenavModule, LayoutModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule
  ],
  entryComponents:[DialogComponent,ImageDialogComponent,AppealComponent],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
