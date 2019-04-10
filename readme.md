
This is a project developed by Michael Ramassamy.
  .
##### Documentation help
- to create graphql schema : [https://www.apollographql.com/docs/apollo-server/essentials/schema]
- to create your model (check also the methods avaiable to use in your resolvers):
[https://mongoosejs.com/docs/schematypes.html]
- note on NoSQL schema implementation : in SQL if you have a many to many relationship between 2 tables or models, you use a many to many table, in NoSQL, you can just add array of foreignkeys in one collection (ie model or table) and add an index on it : read the [basics ](http://learnmongodbthehardway.com/schema/schemabasics/) and [this](https://stackoverflow.com/questions/25101386/many-to-many-relationship-with-nosql-mongodb-and-mongoose) and you have to think of [indexes](https://docs.mongodb.com/manual/applications/indexes/) too

Note : you do no need the mutations RegisterWithEmail, Signup and Login if you use AuthLdap
Learn to do graphql queries and mutations : https://graphql.org/learn/queries/
Be careful to query depht as you can nest in queries : this could take too much time or put the server down :read this : https://www.howtographql.com/advanced/4-security/
If needed implement
- https://www.npmjs.com/package/graphql-cost-analysis
- https://www.npmjs.com/package/graphql-query-complexity
- https://www.npmjs.com/package/graphql-validation-complexity
- https://www.npmjs.com/package/graphql-depth-limit
.
