import { LightningElement, wire, track, api } from 'lwc';
import getContacts from '@salesforce/apex/ContactsController.getContacts';

const columns = [
    { label: 'FirstName', fieldName: 'FirstName'},
    { label: 'LastName', fieldName: 'LastName'},
    { label: 'Phone', fieldName : 'Phone', type: 'phone'},
    { label: 'Email', fieldName: 'Email', type: 'email'},
    { label: 'Edit', type: 'button-icon', initialWidth: 75,
        typeAttributes: {
            iconName: 'action:edit',
            title: 'Edit',
            variant: 'border-filled',
            alternativeText: 'Edit'
        }
    }
];

export default class ContactDataTable extends LightningElement {
    //reactive
    @api recordId;
    @track columns = columns;

    @wire(getContacts,{ accountId: '$recordId'})
    contacts;
    
}