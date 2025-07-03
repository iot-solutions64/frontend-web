export enum ResponseState {
    NOT_EXECUTED, //Function hasn't executed
    SUCCESSFUL, //Function returned a wanted response
    FAILURE, //Function returned an unwanted, but handled, response
    LOADING, //Function is executing
    ERROR //Function returned an unwanted response
}