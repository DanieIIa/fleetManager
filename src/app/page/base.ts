import { OnInit, OnDestroy, Directive } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';
import { ConfigService } from 'src/app/service/config.service';
import { Subscription } from 'rxjs';

@Directive()
export class Base implements OnInit, OnDestroy {
    list: any = [];
    cols: any[] = [];
    listSubscription: Subscription;

    constructor(
        protected baseService: BaseService,
        protected config: ConfigService,
        public dataType: string
    ) {

    }

    ngOnInit(): void {
        this.cols = this.config.cols[this.dataType];
        this.listSubscription = this.baseService.getAll(this.dataType)
            .subscribe({
                next: (list) => this.list = list,
                error: (err) => console.error(err),
                complete: () => console.log('unsubscribed')
            });
    };

    ngOnDestroy() {
        this.listSubscription.unsubscribe();
    }

    onCreate(row: any): void {
        this.baseService.create(this.dataType, row);
    }

    onUpdate(row: any): void {
        this.baseService.update(this.dataType, row);
    }

    onDelete(row: any): void {
        this.baseService.delete(this.dataType, row);
    }
}
