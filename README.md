## About The Project

- MERN eCommerce From Scratch
- Build an eCommerce platform from the ground up with React, Redux, Express & MongoDB
- Tutorial for ProShop
- [GitHub - Brad Traversy](https://github.com/bradtraversy)
- [YouTube - Coding with Basir](https://www.youtube.com/CodingwithBasir)

&nbsp;

## Notes

- [Bootswatch - bootstrap.min.css](https://bootswatch.com/)

&nbsp;

---

&nbsp;

> <b>Mehdi: </b>Why duplicate data in orderModel?
>
> at 09:52 in "Modeling Our Data". Why the orderModel has a field called orderItems with (name, price...) while we already have that data in the productModel. Why not just have an array ids of products in orderModel?

> <b>Leonidas: </b>I guess you could go that way as well. The you would have smaller documents in the db, but whenever you needed that data you would need to populate from the productModel with the related id and this would require extra logic implemented and more roundtrips to fetch the data.

> <b>Niko: </b>The order items and shop products are two different entities and it's important to differentiate between them. The order item usually contains a reference to the product, but also copies of the important product properties at the time it was sold (name, price, tax class, etc). Otherwise when product data is changed (which is pretty common), you would also change all existing orders. Besides that - order items usually hold a lot of additional information that is specific to it's order (discounts, extras like gift wrapping, tax rates)

&nbsp;

---

&nbsp;

> <b>Dhruv: </b>Why we can't use arrow function with userSchema methods?
>
> ```js
> userSchema.methods.matchPassword = async (enteredPassword) => {};
> ```
>
> while using arrow function here, i am getting an error that password is not defined.
>
> "message": "Cannot read property 'password' of undefined", "stack": "TypeError: Cannot read property 'password' of undefined\n at model.userSchema.methods.matchPassword (file:///proshop/backend/models/userModel.js:31:53)\n at file:////proshop/backend/controllers/userController.js:11:27\n at processTicksAndRejections (internal/process/task_queues.js:97:5)" }

> <b>Bassir: </b>because "this" in the arrow function point to the parent object and there is no parent object or function there. so you need to use regular functions.

> <b>Dhruv: </b>Thanks, for the reply. Could u please explain how we have parent object in regular function but not in arrow function. By the way, The course is really helpful.

> <b>Zhing Jieh Jack: </b>In general, <code>this</code> is a special variable that points to either the globalObject (e.g window), caller (instance), or Class.
> For an instance's function, <code>this</code> points to the instance. Hence we can do <code>this.password</code> as <code>this</code> points to user instance.
> For a static function (Class's function), <code>this</code> points to the Class. Hence we can do <code>this.find({})</code> as <code>this</code> points to User model.
> For an arrow function, <code>this</code> does not point to the caller (instance) or its Class, it points to the context where the arrow function is called.
>
> [This MDN document](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) should clarify more

> <b>David: </b>Arrow functions do not get hoisted and "this" is set to window object. Its just how they work. You have to bind "this" manually. It would be easier to just write it as a normal function in this case

&nbsp;

---

&nbsp;
