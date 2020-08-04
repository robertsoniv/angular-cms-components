import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { CmsAdminModule, PageListComponent } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { text, withKnobs, object, button } from '@storybook/addon-knobs';
import { addons } from '@storybook/addons';

export default {
  title: 'Admin/Page List',
  component: PageListComponent,
  parameters: {
    component: PageListComponent,
  },
  decorators: [
    withKnobs,
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const FullExample = () => ({
  component: PageListComponent,
  template: `<div style="height:100vh" [cmsAccessToken]="accessToken" *ngIf="accessToken"><cms-page-list [renderSiteUrl]="renderSiteUrl" [editorOptions]="editorOptions"></cms-page-list></div>`,
  props: {
    accessToken: text('OrderCloud Access Token', ''),
    renderSiteUrl: 'https://www.my-awesome-website.com',
    editorOptions: {
      content_css: [
        // 'https://piasstorageprod.azureedge.net/buyerweb/styles.07d24b25eb6a60350a70.css',
        'https://mgrstoragetest.azureedge.net/buyerweb/styles.e94215343d3493186ae1.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
      ],
    },
  },
});
