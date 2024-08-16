import {Component, EventEmitter, inject, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() navigateTo = new EventEmitter<string>();
  private dataService = inject(DataStorageService);

  onClick(navigator: string){
    this.navigateTo.emit(navigator);
  }

  onSave(){
    this.dataService.storeRecipes().subscribe(
      response => console.log(response),
    )
  }

  onFetch(){
    this.dataService.fetchRecipes().subscribe();
  }

}
