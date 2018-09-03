
// import axios, { AxiosResponse } from "axios";

interface APIResponse {
    d1: number,
    d2: number,
    d3: number,
    image: string
}

interface BookObj {
    Title: string,
    Images: string,
    Summary: string,
    Aurthor: string,
    Category: string,
    ID: string,
    d1: number,
    d2: number,
    d3: number
}

export class FrontEndController {

    public result: APIResponse = { d1: 0, d2: 0, d3: 0, image: "" };
    public book: BookObj = {  Title: "a",
        Images: "string",
        Summary: "string",
        Aurthor: "string",
        Category: "string",
        ID: "string",
        d1: 0,
        d2: 0,
        d3: 0
    };
    
    public bookSelected(bookObj: any) {
        console.log("book:" + JSON.stringify(bookObj));
        this.book = bookObj;
        this.setBookPassthroughFunction(bookObj);
        this.showLoading();
        console.log("Sent Request");
        const obj = {
            summary: bookObj.Summary.toString()
        }
        fetch("http://localhost:5000/generateCover", {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body : JSON.stringify(obj)
        }).then((res: any) => res.json())
        .then((data: any) => {
            this.result = data;
            this.showResults();
        });
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
        // setTimeout(() => {
        //     this.showResults();
        // },2000);
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