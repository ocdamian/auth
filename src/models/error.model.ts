import { ErrorType } from '../enums/errorType.enum';

export interface ErrorModel {
    error: boolean,
    sent?: boolean; 
    type?: ErrorType, 
    messages?: string []
}
