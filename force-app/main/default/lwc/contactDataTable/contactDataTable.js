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
    @track currentRecordId;
    @track contacts;
    @track error;


    wiredContactsResult;

    @wire(getContacts,{ accountId: '$recordId'})
    wiredContacts(result){
        this.wiredContactsResult = result;
        if(result.data){
            this.contacts = result.data;
            this.error = undefined;
        } else if(result.error){
            this.error = result.error;
            this.contacts = undefined;
        }
    }


    handleRowAction(event){
        const row = event.detail.row;
        this.record = row;
        this.bShowModal = true;
        this.editCurrentRecord(row);
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
            message: event.detail.fields.FirstName +' Contact updated Successfully!!',
            variant: 'success'
        }),);
    }

    handleSuccess() {
        return refreshApex(this.wiredContactsResult);
    }

    editCurrentRecord(currentRow){
        this.currentRecordId = currentRow.Id;
    }
    
}