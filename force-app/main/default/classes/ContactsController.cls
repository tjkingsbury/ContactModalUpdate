public with sharing class ContactsController {
    
    
    @AuraEnabled(cacheable = true)
    public static List<Contact> getContacts(id accountId){
        return [SELECT Id, FirstName, LastName, Phone, Email FROM Contact WHERE accountId =:accountId];
    }
}
