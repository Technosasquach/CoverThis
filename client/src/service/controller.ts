
export class FrontEndController {

    public bookSelected(bookObj: any) {
        console.log("book:" + JSON.stringify(bookObj));
        this.setBookPassthroughFunction(bookObj);
        this.showLoading();
    }

    public showData() {
        console.log("[Controller] Show Data");
        this.showResultsPage(false);
        this.showLoadingPage(false);
    }

    public showLoading() {
        console.log("[Controller] Show Loading");
        this.showResultsPage(false);
        this.showLoadingPage(true);
        setTimeout(() => {
            this.showResults();
        },2000);
    }

    public showResults() {
        console.log("[Controller] Show Results");
        this.showResultsPage(true);
        this.showLoadingPage(false);
    }

    showLoadingPage: Function;
    showResultsPage: Function;

    public mountInputState(loading: Function) {
        this.showLoadingPage = loading;
    }
    
    public mountResultState(result: Function) {
        this.showResultsPage = result;
    }

    setBookPassthroughFunction: Function;

    public mountBookSelectionPassThrough(func: Function) {
        this.setBookPassthroughFunction = func;
    }
}