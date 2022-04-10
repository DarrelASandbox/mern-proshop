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
