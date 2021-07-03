# Python Project

Part 1 - Create a Python Rest API endpoint
Create a CRUD Rest API endpoint for Healthcare Provider directory. Use Python - FastAPI for building the Rest APIs.
Store the data as an in-memory Dictionary. Here is the data that is needed to be stored for the provider.
 

Field Name	Cardinality	Type	Description and Constraints
providerID	1-1	UUID	Identifier of the Healthcare Provider.
active	0-1	boolean	Whether this provider's record is in active use (default - active)
name	1-1	String	Name of the Provider.
qualification	1-*	String	Comma separated qualification of the provider
speciality	1-*	String	Comma separated specialities for which the Healthcare provider provides his/her service
phone	1-*	String	Mobile/Telephone number of the Provider. Multiple Providers can have the same address.
department	0-1	String	Department, if applicable for a Provider
organization	1-1	String	Name of the Hospital/Clinic of the Provider.
location	0-1	String	Location, if the Organization has multiple locations.
address	1-1	String	Address of the Hospital/Clinic.
 

Part 2 - Persist the data in a file
For the above use case, now serialise the objects and persist them in a file.
Part 3 - Add Front end
Build a Frontend for the application in simple HTML and CSS
Part 4 - Persist to a PostgreSQL Database
Use PostgreSQL database as the persistence layer. Ensure that the data is normalised.
Modify the CRUD APIs to now use PostgreSQL DB.
Add Rest API endpoints for search on single or multiple parameters like name, qualification, speciality, organization, etc.
Add the additional search pages in the frontend as well.
Part 5 - Write Unit test cases and Containerize
Write Unit testcases for both the APIs and the Frontend.
Containerize the APIs.
