import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit{
  @Input() list: any[];
  @Input() cols: any[];

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  phraseString: any;
  phraseKey: string = 'notset';
  newRow: any = {};
  columns: any[];

  onUpdate(row):void{
    this.update.emit(row);
  }

  onDelete(row):void{
    this.delete.emit(row);
  }

  onCreate(row):void{
    this.create.emit(row);
  }

  deleteIconClass: string = 'fa fa-trash-o';

  constructor(    
    private baseService: BaseService
    ) {}
    // setInterval ( () => {
    //   this.deleteIconClass == 'fa fa-trash-o' ? this.deleteIconClass = 'fa fa-trash' : this.deleteIconClass = 'fa fa-trash-o';
    // }, 1000);

    ngOnInit(){
    }
}
