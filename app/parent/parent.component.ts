import { Component, OnInit, Input, Output } from '@angular/core';
import { Contact } from '../contact';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  isShown: boolean = false;
  firstName = new FormControl('');
  lastName = new FormControl('');
  number = new FormControl('');
  n = new FormControl('');
  editForm: any;
  contactItem: Contact = new Contact('', '', '');

  @Input() contacts: any;
  @Input() contactsArray: any;
  @Output() change = new EventEmitter<Contact[]>();

  ngOnInit(): void {
    this.editForm = this.fb.group({ firstName: this.firstName, lastName: this.lastName, number: this.number });
  }

  Display(contact: Contact) {
    alert(this.editForm.value);
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  AddData() {
    this.contactItem = this.editForm.value;
    if (this.contactItem.firstName == "") {
      this.contactItem.firstName = this.contacts.firstName;
    }

    if (this.contactItem.lastName == "") {
      this.contactItem.lastName = this.contacts.lastName;
    }

    if (this.contactItem.number == "") {
      this.contactItem.number = this.contacts.number;
    }
    this.contactsArray.push(this.contactItem);
    this.sortFunction();
    alert("Contact Successfully edited.");
    this.deleteContact(this.contacts);
    this.change.emit(this.contactsArray);
    this.editForm.reset();

  }

  sortFunction() {
    for (let i = 0; i < this.contactsArray.length; i++) {
      for (let j = 0; j < this.contactsArray.length - 1; j++) {
        if (this.contactsArray[j].firstName > this.contactsArray[j + 1].firstName) {
          let swap = this.contactsArray[j];
          this.contactsArray[j] = this.contactsArray[j + 1];
          this.contactsArray[j + 1] = swap;
        }
      }
    }
  }

  deleteContact(contact: Contact) {
    this.contactsArray = this.contactsArray.filter((items: any) => items !== contact);
  }
}
