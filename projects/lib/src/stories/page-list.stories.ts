import './storybook-base-configuration';
import { moduleMetadata } from '@storybook/angular';
import { CmsAdminModule, PageListComponent } from '../public-api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Admin/Page List',
  component: PageListComponent,
  parameters: {
    component: PageListComponent,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, CmsAdminModule],
    }),
  ],
};

export const FullExample = () => ({
  component: PageListComponent,
  template: `<div style="height:100vh"><cms-page-list (pageChanged)="handlePageChanged($event)" [renderSiteUrl]="renderSiteUrl" [resourceType]="resourceType" [resourceID]="resourceID" [editorOptions]="editorOptions"></cms-page-list></div>`,
  props: {
    renderSiteUrl: 'https://www.my-awesome-website.com',
    resourceType: 'Suppliers',
    resourceID: '41106',
    handlePageChanged(page: any) {
      // TODO: how should this work?! Is it even possible to update props from a prop that is a callback?
      // Right now it seems as though validation is always undefined - even after this callback is hit.
      const hasError = !page.Url && page.Title !== 'Home';
      if (hasError) {
        this.validation = {
          error: hasError,
          message: hasError
            ? 'Pages other than "home" must have a location.'
            : undefined,
        };
      } else {
        this.validation = undefined;
      }
      console.log(JSON.stringify(this.validation, null, 2));
    },
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
