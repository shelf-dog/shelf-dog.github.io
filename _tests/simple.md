---
module: Simple
title: Simple Client API Tests
for: [test]
requires: [client]
script: modules/test/tests/simple
tests:
  - name: Metadata
    desc: Test API Metadata Calls
    function: metadata
  - name: Invalid
    desc: Test API Rejects Invalid Calls
    function: invalid
  - name: Settings
    desc: Test API Settings Calls
    function: settings
  - name: Management
    desc: Test API Management Calls
    function: management
  - name: Loans
    desc: Test API Loan Calls
    function: loans
---
To verify the basic functionality of the __client API__ module, which includes authentication, authorisation, settings and metadata