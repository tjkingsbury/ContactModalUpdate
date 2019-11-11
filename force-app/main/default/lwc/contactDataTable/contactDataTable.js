import { LightningElement, wire, track, api } from 'lwc';
import getContacts from '@salesforce/apex/ContactsController.getContacts';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import {refreshApex} from '@salesforce/apex';

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
    @track bShowModal = false;

    @wire(getContacts,{ accountId: '$recordId'})
    contacts;


    handleRowAction(event){
        const row = event.detail.row;
        this.record = row;
        this.bShowModal = true;
    }

    // closing modal box
    closeModal() {
        this.bShowModal = false;
    }

    handleSubmit(event){
        event.preventDefault();

        this.template.querySelector('lightning-record-edit-form').submit(event.detail.fields);


        this.bShowModal = false;

        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: event.detail.fields.FirstName + ' '+ event.detail.fields.LastName +' Contact updated Successfully!!.',
            variant: 'success'
        }),);
    }

    handleSuccess() {
        return refreshApex(this.refreshTable);
    }
    
}