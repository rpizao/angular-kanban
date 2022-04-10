import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { CardService } from './services/card.service';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardComponent, MarkdownTipsDialog } from './components/card/card.component';
import { CardReadonlyComponent } from './components/card-readonly/card-readonly.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenService } from './services/token.service';
import { TokenIntercept } from './intercepts/token-intercept';
import { MessageService } from './services/message/message.service';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent, MarkdownTipsDialog, CardComponent, CardReadonlyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule, MatIconModule, MatInputModule, MatDialogModule, MatToolbarModule, // Material Modules
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }), // Markup Modules
    ReactiveFormsModule
  ],
  providers: [
    TokenService,
    CardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercept,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
