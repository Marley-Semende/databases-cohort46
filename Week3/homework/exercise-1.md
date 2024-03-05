## Exercise 1
## Answers
1. The column `food_code` and `food_description` violate 1NF because they ontain multiple values separated by commas.

2. The following entities can be extracted `Members`, `Dinners`, `Venues`, and `Foods`.

3. The following are the tables and columns that would make a 3NF compliant solution:

+-----------------------+---------------------------------------------------------+
|       Table Name      |                      Columns                                |
+-----------------------+---------------------------------------------------------+
|       members         | member_id (Primary Key), member_name, member_address      |
|       dinners         | dinner_id (Primary Key), dinner_date, venue_code         |
|       venues          | venue_code (Primary Key), venue_description              |
|       foods           | food_code (Primary Key), food_description                |
|   dinners_foods       | dinner_id (Foreign Key to Dinners table),                |
|                       | food_code (Foreign Key to Foods table)                   |
+-----------------------+---------------------------------------------------------+

