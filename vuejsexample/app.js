// app.js

new Vue({

  // We want to target the div with an id of 'contacts'
  el: '#contacts',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    contact: { name: '', address: '', email: '', phone: '', dob: '' },
    contacts: []
  },

  // Anything within the ready function will run when the application loads
  mounted: function () {
    // When the application loads, we want to call the method that initializes
    // some data
    this.fetchContacts();
  },

  // Methods we want to use in our application are registered here
  methods: {

    // We dedicate a method to retrieving and setting some data
    fetchContacts: function () {
      var contacts = [
        {
          id: 1,
          name: 'Venu',
          address: 'Prakasam Andhra pradesh India 523263',
          email: 'vabb@gmail.com',
          phone: '508-816-2346',
          dob: '2015-09-10'
        },
        {
          id: 2,
          name: 'Divya',
          address: 'The Martian comes to theatres.',
          email: '',
          phone: 789878978,
          dob: '2015-10-02'
        },
        {
          id: 3,
          name: 'Siva',
          address: 'Music, film and interactive festival in Austin, TX.',
          email: '',
          phone: 326597457,
          dob: '2016-03-11'
        }
      ];
      // $set is a convenience method provided by Vue that is similar to pushing
      // data onto an array
      this.contacts = contacts;
    },
    // Adds an contact to the existing contacts array
    resetForm: function () {
      this.contact = { name: '', address: '', email: '', phone: '', dob: '' };
    },
    // Adds an contact to the existing contacts array
    addContact: function () {
      if (this.contact.name) {
        this.contacts.push(this.contact);
        this.contact = { name: '', address: '', email: '', phone: '', dob: '' };
      }
    },

    // Update an contact to the existing contacts array
    updateContact: function () {
      if (this.contact.id && this.contact.name) {
        this.contacts[this.contact.id] = this.contact;
        this.contact = { name: '', address: '', email: '', phone: '', dob: '' };
      }
    },
    editContact: function (index) {
      //assign selected contact vlaues to form feilds clone the values to supprot revert
      this.contact = JSON.parse(JSON.stringify(this.contacts[index]));
      //to make id reference to update the contact info
      this.contact.id = index;
    },

    deleteContact: function (index) {
      if (confirm("Are you sure you want to delete this contact?")) {
        // $remove is a Vue convenience method similar to splice
        this.contacts.splice(index, 1);
      }
    }
  }

});