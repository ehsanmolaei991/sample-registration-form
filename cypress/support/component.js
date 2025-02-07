// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import global styles
import "@/assets/main.css";

import { createPinia, setActivePinia } from "pinia";
import { mount } from "cypress/vue";

Cypress.Commands.add("mountWithPinia", (component, options = {}) => {
  const pinia = createPinia();
  setActivePinia(pinia); 

  return mount(component, {
    global: {
      plugins: [pinia],
    },
    ...options,
  });
});

Cypress.Commands.add('mount', mount)


// Example use:
// cy.mount(MyComponent)
