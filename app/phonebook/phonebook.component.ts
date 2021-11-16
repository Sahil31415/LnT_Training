import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhoneBookComponent implements OnInit {
  contact: Contact = new Contact('', '', '');
  contactForm: any;
  editForm: any;
  searchForm: any;
  searchName: string = '';
  search = new FormControl('');
  firstName = new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]);
  lastName = new FormControl('');
  number = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(8), Validators.pattern('^[0-9]+$')]);
  editFirstName = new FormControl('');
  editLastName = new FormControl('');
  editNumber = new FormControl('');
  contacts: Contact[] = [new Contact('Micheal', 'Scott', '123456789'),
  new Contact('Dwight', 'Shrute', '9876548321'),
  new Contact('Jim', 'Halpert', '9872143743')];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.SortContacts();
    this.editForm = this.fb.group({ editFirstname: this.editFirstName, editLastName: this.editLastName, editNumber: this.editNumber });
    this.contactForm = this.fb.group({ firstName: this.firstName, lastName: this.lastName, number: this.number });
    this.searchForm = this.fb.group({ search: this.search });
  }

  AddContact(contactInfo: Contact) {
    this.contacts.push(contactInfo);
    alert("Added successfully");
  }

  EditContact(contact: Contact) {
    this.router.navigate(['Parent']);
  }

  DeleteContact(contact: Contact) {
    this.contacts = this.contacts.filter(item => item !== contact);
  }

  SortContacts() {
    for (let i = 0; i < this.contacts.length; i++) {
      for (let j = 0; j < this.contacts.length - 1; j++) {
        if (this.contacts[j].firstName > this.contacts[j + 1].firstName) {
          let swap = this.contacts[j];
          this.contacts[j] = this.contacts[j + 1];
          this.contacts[j + 1] = swap;
        }
      }
    }
  }

  Search() {
    this.searchName = JSON.stringify(this.searchForm.value);
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].firstName === this.searchName) {
        alert(this.contacts[i].number);
      }
    }
  }

  AddData() {
    this.contact = this.contactForm.value;
    this.AddContact(this.contact);
    this.contactForm.reset();
    this.SortContacts();
  }
}
