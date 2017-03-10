# Instructions

### Hell Triangle

The entry method is called 'calc' in the HellTriangle module. e.g HellTriangle.calc([[1], [2,3], [4,5,6]])

Run automated tests with 'mix test'

Elixir was used since it's functional capabilities allowed a beautiful and simple solution. 

### Resize Photos

'npm run test' will execute automated tests

'npm run express' will start an express server at 8080 port. http://localhost:8080

Everytime you access this endpoint:
* 'Image' collection will be erased from the mongo database
* Images from the payload (json url) will be fetched
* The requested resizing tasks will be executed
* Resulting images are saved to a folder in disk
* A bulk insert with images urls will be executed (Mongo)

This was done in Node, with Express, Mongoose and gm as libraries for main tasks.

Since I only needed one endpoint, serving static images from a single folder, resizing images, and a Mongo database,
Node seemed like a great choice. Express and Mongoose are really fast and easy to bootstrap,
maybe faster in development terms than Ruby/Rails in this scenario.
