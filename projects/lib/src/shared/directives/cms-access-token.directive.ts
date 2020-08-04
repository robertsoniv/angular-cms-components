import {
  Directive,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { HeadStartSDK } from '@ordercloud/headstart-sdk';
import * as HeadStartSDKInstance from '@ordercloud/headstart-sdk';

export const DEFAULT_BASE_API_URL =
  'https://marketplace-middleware-test.azurewebsites.net';

@Directive({
  selector: '[cmsAccessToken]',
})
export class AccessTokenDirective implements OnInit, OnChanges {
  @Input('cmsAccessToken') accessToken?: string;
  constructor() {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    if (this.accessToken) {
      HeadStartSDK.Tokens.SetAccessToken(this.accessToken);
    } else {
      HeadStartSDK.Tokens.RemoveAccessToken();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (changes && changes.accessToken && !changes.accessToken.firstChange) {
      this.ngOnInit();
    }
  }

  checkAccessToken(accessToken?: string): void {
    if (accessToken) {
      HeadStartSDK.Tokens.SetAccessToken(accessToken);
    } else {
      throw {
        message:
          'Access token is required for CMS components to work properly.',
      };
    }
  }

  checkBaseApiUrl(baseApiUrl?: string): void {
    if (!baseApiUrl) {
      baseApiUrl = DEFAULT_BASE_API_URL;
    }
    HeadStartSDKInstance.Configuration.Set({
      baseApiUrl,
    });
  }
}
