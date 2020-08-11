import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { kebab } from 'case';
import * as OrderCloudSDK from 'ordercloud-javascript-sdk';
import { PageContentDoc } from '../../models/page-content-doc.interface';
import { JDocument, HeadStartSDK } from '@ordercloud/headstart-sdk';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PAGE_SCHEMA } from '../../constants/page-schema.constants';
import { RequiredDeep } from '@ordercloud/headstart-sdk/dist/models/RequiredDeep';

export const EMPTY_PAGE_CONTENT_DOC: Partial<PageContentDoc> = {
  Title: '',
  Url: '',
  Description: '',
  HeaderEmbeds: '',
  Content: ``,
  FooterEmbeds: '',
  Active: false,
  NavigationTitle: '',
};

export interface CmsPageValidation {
  error: boolean;
  message?: string;
}

@Component({
  selector: 'cms-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
})
export class PageEditorComponent implements OnInit, OnChanges {
  @Input() renderSiteUrl: string;
  @Input() editorOptions: any;
  @Input() validation?: CmsPageValidation;
  @Input() resourceType?:
    | 'Products'
    | 'Categories'
    | 'Catalogs'
    | 'Promotions'
    | 'Suppliers'
    | 'Buyers'
    | 'ProductFacets' = null; // optional
  @Input() resourceID?: string = null; // optional
  @Input() parentResourceID?: string = null;
  @Input() document?: JDocument;
  @Output() pageChanged = new EventEmitter<any>();
  @Output() backClicked = new EventEmitter<MouseEvent>();
  @Output() pageSaved = new EventEmitter<JDocument>();
  @Output() pageDeleted = new EventEmitter<string>();

  page: Partial<PageContentDoc>;
  automaticUrl: boolean;
  pageNavigation: boolean;
  confirmModal: NgbModalRef;
  isLoadingSave: boolean;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.page = Object.assign(
      {},
      this.document ? this.document.Doc : EMPTY_PAGE_CONTENT_DOC
    );
    this.automaticUrl = this.page
      ? this.page.Url === kebab(this.page.Title)
      : true;
    this.pageNavigation = Boolean(this.page ? this.page.NavigationTitle : true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (changes.document && !changes.document.firstChange) {
      this.ngOnInit();
    }
  }

  onPageChange(): void {
    this.pageChanged.emit(this.page);
  }

  onPageContentChange(html: string): void {
    this.page = { ...this.page, Content: html };
    this.onPageChange();
  }

  onPageTitleKeyUp(value: string): void {
    if (this.automaticUrl) {
      this.page.Url = kebab(value);
    }
    this.onPageChange();
  }

  onAutomaticUrlChange(): void {
    if (this.automaticUrl && this.page.Title) {
      this.page.Url = kebab(this.page.Title);
    }
    this.onPageChange();
  }

  onPageNavigationChange(): void {
    if (this.pageNavigation && !this.page.NavigationTitle) {
      this.page.NavigationTitle = this.page.Title;
    } else {
      this.page.NavigationTitle = '';
    }
    this.onPageChange();
  }

  onPageStatusChange(): void {
    this.page.Active = !this.page.Active;
    this.onPageChange();
  }

  async onSubmit(): Promise<void> {
    this.isLoadingSave = true;
    const updated = await this.saveChanges().finally(
      () => (this.isLoadingSave = false)
    );
    this.pageSaved.emit(updated);
  }

  async saveChanges(): Promise<RequiredDeep<JDocument>> {
    const me = await OrderCloudSDK.Me.Get();
    const nowDate = new Date().toISOString();
    const fullName = `${me.FirstName} ${me.LastName}`;
    let updated: RequiredDeep<JDocument>;

    if (this.document && this.document.ID) {
      updated = await HeadStartSDK.Documents.Update(
        PAGE_SCHEMA.ID,
        this.document.ID,
        {
          ID: this.document.ID,
          Doc: {
            ...this.page,
            DateLastUpdated: nowDate,
            LastUpdatedBy: fullName,
          },
        }
      );
    } else {
      updated = await HeadStartSDK.Documents.Create(PAGE_SCHEMA.ID, {
        Doc: {
          ...this.page,
          Author: fullName,
          DateCreated: nowDate,
          DateLastUpdated: nowDate,
          LastUpdatedBy: fullName,
        },
      });
    }

    if (this.resourceType && this.resourceID) {
      await HeadStartSDK.Documents.SaveAssignment(PAGE_SCHEMA.ID, {
        ResourceID: this.resourceID,
        ResourceType: this.resourceType,
        ParentResourceID: this.parentResourceID,
        DocumentID: updated.ID,
      });
    }

    return updated;
  }

  async onDelete(): Promise<void> {
    if (this.resourceType && this.resourceID) {
      await HeadStartSDK.Documents.DeleteAssignment(
        PAGE_SCHEMA.ID,
        this.resourceID,
        this.resourceType,
        this.parentResourceID,
        this.document.ID
      );
    }
    await HeadStartSDK.Documents.Delete(PAGE_SCHEMA.ID, this.document.ID);
    this.pageDeleted.emit(this.document.ID);
    this.confirmModal.close();
  }

  confirmDeletePage(confirmModalTemplate): void {
    this.confirmModal = this.modalService.open(confirmModalTemplate);
  }

  get hasChanges(): boolean {
    return JSON.stringify(this.document.Doc) !== JSON.stringify(this.page);
  }

  get defaultIsValid(): boolean {
    return Boolean(this.page.Title && this.page.Url);
  }

  get defaultErrorMessage(): string | undefined {
    if (!this.defaultIsValid) {
      return 'Missing required fields.';
    }
  }
}
