Max capacity of milk available for any day is 1000(in litres).
The orders are also placed in litres.

*/adds - Adds a new order with 'placed' status.
1)The date, month, and year of the order can be provided as separate fields of 'Number' datatype., in the request json.
2)In case date, month, and year are not provided, current date, the order is dated to current date.
3)Doesn't add the order, if the quantity of order is more than the quantity left for that day.


*/update/:id - updates all the fields given in the json body of the request.
1)Doesn't update the quantity of the order, if it is more than the current quantity plus left capacity for the date of the order.


*/updateStatus/:id - updates the status of the order.


*/delete/:id - deletes the order with the id given in the route.
1) If the deleted order hasn't been delivered at time of deletion, its quantity is added back to the capacity for the date of the order.


*/checkCapacity/:date  - Checks for the available capacity for the given date.
1) The 'date' in route, is in 'ddmmyyyy' format.

