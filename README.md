**Yesterday**
- Data relations
- Populating related data

**TODAY**
- Pagination
- Sorting and filtering
- Full stack experiment

## Filtering and Sorting

- Imagine the 9001 users
    - We need to list only admins
    - Show only users with age > 17
    - Sort oldest to newest

    ```js
    const query = User.find();              // Prepare query
    query.where('role').equals('admin');    // Only show admins
    query.where('age').gt(17);              // Only show age > 17 (gt: greater than)
    query.sort({ createdAt: 'asc' })

    const users = await query.exec()        // Execute query
    console.log(users)
    ```

- Queries are very flexible
- There are even different syntaxes, for example chaining and callback:

```js
User.find()                          // Prepare query
    .where('role').equals('admin')     // Only show admins
    .where('age').gt(17)               // Only show age > 17
    .sort({ createdAt: "asc" })        // Sort by creation time, ascending
    .exec((err, users) => {            // Execute query
        if (err) {
            return console.error(err)
        }
        console.log(users)
    });
```

## Pagination

- Who knows what we are talking about here?
    - Database has 9001 users
    - Listing _all_ of them on a page is too much
    - Better just list maybe 10 at a time
    - And have pages to browse the rest

- The way pagination is most commonly done is with `limit` and `skip`

    ```js
    const query = User.find()   // prepare query
    query.skip(0)               // how many results to skip
    query.limit(10)             // limit to max 10 results from the database

    // If we are skipping the first 0 results, we are displaying 1 - 10
    // If we are skipping the first 10 results, we are displaying 11 - 20
    // If we are skipping the first 20 results, we are displaying 21 - 30
    // If we are skipping the first 30 results, we are displaying 31 - 40                                       
    // If we are skipping the first 40 results, we are displaying 41 - 50

    // Limit = how many per page
    // Skip = current page number - 1 * limit
    ```

- As you can imagine, queries can get very complex
    - Let's take 10 minutes for a mini exercise right now
    - Don't even run your code, just imagine the Model and Query
    - Look at this URL and imagine how you would implement it:
    - http://vinted.de/catalog?search_text=pferd&price_from=1&price_to=10&page=2

    ```js
    const query = Catalog.find();
    query.where('product').eqaul('pferd');
    query.where('price').gte(1);
    query.where('price').lt(10);
    query.skip(10);
    query.limit(10);
    ```