import { AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { EndMenuType, IStockData, MenuType, Titles } from './../data-services/stock-data-interface';
import { DataFetchingService } from '../data-services/data-fetching.service';

@Component({
  selector: 'app-chat-menu',
  // standalone: true,
  templateUrl: './chat-menu.component.html',
  styleUrl: './chat-menu.component.less'
})
export class ChatMenuComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {
  public menuValues: any = [];
  public historyMenus: any = [];
  private isPromptUpdated = true;
  public isLoading = true;

  public endMenu: any = [];

  constructor(private dataFetchingService: DataFetchingService) { }

  ngOnInit(): void {
    this.endMenu = this.dataFetchingService.getEndMenu();
    this.menuValues = this.dataFetchingService.getStockData();
    // Do a deep cloning
    this.historyMenus[0] = JSON.parse(JSON.stringify(this.menuValues));
    this.historyMenus[0].title = this.getAppropriateTitle(this.menuValues);
    this.isPromptUpdated = false;
    this.isLoading = false
  }

  ngAfterViewInit(): void {
    // console.log("ngAfterViewInit")
  }

  ngOnChanges(): void {
    // console.log("ngOnChanges");
  }

  ngDoCheck(): void {
    // console.log("ngDoCheck");
    let self = this;
    // Auto scroll to bottom to make the new prompt visible.
    if (this.isPromptUpdated) {
      setTimeout(function () {
        self.scrollView();
      }, 10);

      // Reset the below boolean - this is to enable the user to scroll up.
      // Otherwise, it will be auto scroll to bottom.
      this.isPromptUpdated = false;
    }

    if(this.isLoading) {
      setTimeout(function () {
        self.scrollView();
      }, 10);
    }
  }

  onSelectChange(event: any) {
    this.isLoading = true;

    let menuValue = event?.target?.value;
    let self = this;
    setTimeout(function () {
      self.setNewMenu(menuValue);
      self.isLoading = false;
    }, 500);   // Delayed to show loading icon.
  }

  private setNewMenu(menuValue: string) {
    this.isPromptUpdated = true
    // Assume the previous menu is for Exchanges 
    let menuType: MenuType = MenuType.Exchange;
    let selectedValue = this.menuValues.find((item: any) => item?.stockExchange == menuValue)

    // If the previous menu is Not for Exchanges, let's assume it is for Stocks
    if (!selectedValue) {
      selectedValue = this.menuValues.find((item: any) => item.stockName == menuValue);
      menuType = MenuType.Stock;
    }

    // If the previous menu is Not for Stocks, it is endMenu - 'Main menu' and 'Go back' were displayed. 
    if (!selectedValue) {
      selectedValue = this.endMenu.find((item: any) => item.code == menuValue);
      menuType = MenuType.End;
    }

    let i = this.historyMenus.length;
    // console.log("i", i);
    // console.log("selectedValue", selectedValue);

    if (i > 0 && selectedValue) {

      switch (menuType) {
        case MenuType.End:
          if (selectedValue.code == EndMenuType.Main) {
            this.menuValues = this.dataFetchingService.getStockData();
          }
          else if (selectedValue.code == EndMenuType.GoBack) {
            // Here i-1 will have End Menu
            // i-2 will have the previous topStocks
            try {
              this.menuValues = this.historyMenus[i - 2]
            }
            catch (ex) {
              console.error(`index ${i - 2} does not exit in this.historyMenus`, ex)
              // let's assign main menu as a work around.
              this.menuValues = this.dataFetchingService.getStockData();
            }
          }
          // Do a deep cloning
          this.historyMenus[i] = JSON.parse(JSON.stringify(this.menuValues));
          this.historyMenus[i].title = this.getAppropriateTitle(this.menuValues);
          break;

        case MenuType.Stock:
          this.menuValues = this.dataFetchingService.getEndMenu();
          // Do a deep cloning
          this.historyMenus[i] = JSON.parse(JSON.stringify(this.menuValues));
          this.historyMenus[i].title = this.getAppropriateTitle(selectedValue);
          break;

        case MenuType.Exchange:
          this.menuValues = selectedValue?.topStocks;
          // Do a deep cloning
          this.historyMenus[i] = JSON.parse(JSON.stringify(this.menuValues));
          this.historyMenus[i].title = this.getAppropriateTitle(selectedValue?.topStocks);
          break;

        default:
          console.error("menuType is incorrect", menuType)
          this.menuValues = this.dataFetchingService.getStockData();
          this.historyMenus[i] = JSON.parse(JSON.stringify(this.menuValues));
          this.historyMenus[i].title = this.getAppropriateTitle(this.menuValues);
      }

      this.historyMenus[i].userResponse = menuValue;
      // Disable the previously user select menu, to avoid re-selection.
      this.historyMenus[i - 1].disabled = true;
    }
    // console.log(this.historyMenus)    
  }

  // This function will move the scroll to the bottom of the prompt window.
  private scrollView() {
    var elem = document.getElementById("chat-container");
    if (elem) {
      elem.scrollTo(0, elem.scrollHeight);
    }
  }

  private getAppropriateTitle(stockData: any): string {
    try {
      if (stockData?.length > 0) {
        // in case we are listing exchanges
        if (stockData[0]?.stockExchange) {
          return Titles.Exchange;
        }
        // in case we are listing exchanges top stocks from an exchange
        else if (stockData[0]?.stockName) {
          return Titles.Stock;
        }
      }
      else {
        // in case user selected a stock, let's return the stock's price details.
        return `Stock price of "${stockData?.stockName} (${stockData?.code})" is "${stockData?.price} ${stockData?.currency}". Please select an option.`
      }
    }
    catch (ex) {
      console.error("getAppropriateTitle()", ex)
    }
    return "";
  }
}
