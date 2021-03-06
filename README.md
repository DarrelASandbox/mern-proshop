## About The Project

- MERN eCommerce From Scratch
- Build an eCommerce platform from the ground up with React, Redux, Express & MongoDB
- Tutorial for ProShop ([Heroku Demo](https://proshop-15apr-2022.herokuapp.com/))
- <b style="color:red;">NOT MEANT FOR PRODUCTION (Refer to Notes section below)</b>
- [GitHub - Brad Traversy](https://github.com/bradtraversy)
- [YouTube - Coding with Basir](https://www.youtube.com/CodingwithBasir)

&nbsp;

## Notes

- [Bootswatch - bootstrap.min.css](https://bootswatch.com/)
- [stackoverflow - Why isn't React considered MVC?](https://stackoverflow.com/questions/53729411/why-isnt-react-considered-mvc)

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

> <b>Roy: </b>Possible security issue with /api/orders/:id
>
> While the order IDs are generated by Mongo and hard to guess, doesn't this endpoint pose a potential security/privacy issue? The only check is that the user is a valid, logged in user and not that the user is the one who placed the order. If I happen to know or guess someone's Order ID I could return all of their personal data from the order (name, email, address)

> <b>Bassir: </b>You can not guess the mongodb id because it is unique id. about have a check if user is admin or use is owner of the order I am with you. it's been noted.

> <b>Fraser: </b>I modified my getOrderById function to check if the request was from an admin or if the order user ID was equal to the request user ID:

```js
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
```

> One would expect to be able to compare order.user.\_id === req.user.\_id but this didn't work. After some investigation I came across [this answer](https://stackoverflow.com/questions/11060213/mongoose-objectid-comparisons-fail-inconsistently) which solved the problem.

> <b>Tamunoemi Benson: </b> Hi @roy you can check if users are the owner of the order by the below

```js
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order && order.user._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Unauthorized Action');
  } else if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('No order found');
  }
});
```

&nbsp;

---

&nbsp;

> <b>Valdis: </b>Security issue - you can update order to isPaid, without going through payment!
> Please have fun trying it yourself! Place order, but don't pay for it, then follow instructions below. I'm on lesson 61. All I tried is - sent PUT request via Postman to API route, include your token in headers, and in "body" put JSON data like this:

```js
{
    "id": "Somestring",
    "status": "sortOfSuccess",
    "update_time": "Tomorrow",
    "payer": {"email_address": "badguy@example.com"}
}
```

> Send PUT request to your <code>/api/orders/:id/pay</code>, obviously include your order id,

> Or send it to Brads original website:
> <code> http://proshopapp.herokuapp.com/api/orders/<put-your-order-id-here>/pay</code>
>
> Dear Brad, if you are reading this, please check paymentResult in your database for this order: <code>http://proshopapp.herokuapp.com/order/60298a48b01e61000418c5a2</code>
>
> And here comes the question - how do we protect this route??

> <b>Valdis: </b>And here comes reply to myself :))
>
> I think fixing this is not a big deal. We can make API route unguessable, like this
> <code>/api/orders/&lt;some-unguesssable-string&gt;/:id/pay</code>
>
> In addition, as I just found from lesson 63 - we have a complicated object coming from PayPal as a response, so we have plenty of options to mess with that - not necessary the way shown in this lesson. So what I did in my previous post is not that clever, but I will keep both comments, so people know there's a potential risk if we all stick to the same standard.

> <b>Begzod: </b>you are right, but it is still risky to try to protect it using that 'unguessable' route. The better way is I think somehow get the payment confirmed in the backend by sending a confirmation request to Paypal API.

> <b>Allan: </b>Indeed, this seems to be a security loophole that requires URGENT rectification. Unfortunately, relying on PayPal API for "confirmation" may not be useful on orders using other payment options such as Cash-on-Delivery (COD), Cash-on-Pickup (COP), etc. COD and COP, requires that an Admin (or external Courier API) mark the order as Paid.

> In this regard, I am interested in adopting Valdis' idea, but to utilize a secret key (include in <code>.env</code>), hash it with another variable such as the Order ID, then require it when calling the <code>/pay</code> route.

&nbsp;

---

&nbsp;

> <b>Rafal: </b>Is it safe?
>
> Is it safe to update the payment without any confirmation? When I make an order I could sent the PUT request to the API and it would update without actual payment. If the seller wouldn't check if the payment was actually received he could sent me the item. Is there a way to check if the payment was received with react-paypal-button-v2 via backend?

> <b>Bassir: </b>use this [api](https://developer.paypal.com/docs/api/payments/v2/) to confirm paypal payment

&nbsp;

---

&nbsp;

> <b>Roy: </b>Why are we actually removing products from the DB versus giving them a isDeleted field of true? Deleted products will break past oders
> If users were to order products, and then 3 months later the site owner wanted to remove the product from the site simply deleting the product will result in errors in viewing past orders.
>
> Should we not be adding a isDeleted (or whatever) field to products, and simply toggling products to isDeleted versus removing them? Then past orders can load the data, but we can filter store lists by that field.
>
> (This even to a lesser extent should carry over to users. While a user might 'delete' their own account and staff could even delete an account, it shouldn't really be removed from the DB. If admin are reviewing orders and looking for past orders due to a complaint or what not they couldn't find user information as it was simply removed.)

> <b>Bassir: </b>yes. you are right. setting isDeleted to true is a better way in real scenario.

> <b>Tomasz: </b>Good point, but I can see some problems with isDeleted approach when it comes to user.
>
> It is not completely unrealistic that user deletes an account and some time later wants to register again. Using the same email adress will give an error from db since we keep storing users profile. Duplicate email error will clearly inform user that his/her data is still stored in our db. Aren't we legaly obligated to remove that data on user's request? I know facebook e.g. keeps all the data forever but not sure it is the way to go.
>
> We could test isDeleted prop when duplicate email and run update instead of create, but then user logs into new account and sees all the previous orders... is that a good experience? Personally I would expect having a clear history with new account, but I am not sure about it.
>
> Shoudn't we populate order with user data when order is created and store information in order object rather then read it by reference every time we retrive order from db? That gives us user data we may need in regards to an order and allows user to delete his/her profile without breaking the orders. An order can only be created by one user so that shouldn't bring that much additional load on db especialy we don't need all the user data in the order just some of them.
>
> isDeleted approach could work with products only and orders should never be deleted...
>
> I am very curious what are your thoughts about it.

> <b>Roy: </b>The idea of duplicating some of the product info relevant to the order into the order row can work, but also wasn't covered here. That's a design choice - either have enough info saved to display orders as needed or keep the products long(er) term so you can view orders and even the full product listing.
>
> In terms of the user, again design choice. When you query to see if the user exists you can exclude any returns with the isDeleted flag. If the results are 0 (either never registered, or registered and deleted) then create a new user. You could even go a step further with that query. If it returns an isDeleted user account you can offer a recovery option that requires more information than just the email -- maybe past order numbers or something private -- and if the user provides it then restore the account.
>
> But with the idea of a new account, then it has a new, unique ID. All your 'is there an order' or whatever queries should use that and never return results from a different user ID (from the old user account).
>
> In general though you need to do something to keep some records at least for the short term just for accounting, delivers, etc.

&nbsp;

---

&nbsp;

> <b>Jay: </b> Photo upload update
>
> The issue with the photo uploading to Heroku is only bad because when they run dynos on your server their "cycle" cleans the uploaded files. The solution I am proposing will allow you to upload your photos to Cloudinary and then use that url for your photos return path.
>
> You actually don't have to change anything in your files, you actually want to follow the tutorial until you are successfully uploading images.
>
> Once you can upload imagees you will want to open a developer Cloudinary account (free) [Cloudinay Dev account register.](https://cloudinary.com/users/register/free)
>
> In your env file you want to add these properties

```js
CLOUD_NAME =
  sample_name_make_sure_you_use_your_bucket_name_here_when_creating_bucket;
CLOUD_API_KEY = api_key_from_cloudinary;
CLOUD_API_SECRET = api_secret_from_cloudinary;
```

> Then run <code>npm i cloudinary</code> in your root project folder just as we did for anything else added to the backend server.
>
> 1. In server.js we need to import Cloudinary but, Cloudinary does not support es6 modules at this time so, when doing <code>import cloudinary from 'cloudinary'</code> we can not use cloudinary as we normally are in this project. To get around this you will want to
>
> <code>import pkg from 'cloudinary'</code>
>
> (side note you can call pkg anything else as well)
>
> then we can take cloudinary our of pkg by adding right below the import <code>const cloudinary = pkg</code>
>
> 2. In server.js add the following (I put mine right before my routes)

```js
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use('/api/products', productRoutes);
```

> 3. In uploadRoute.js
>
> - You will need to bring in cloudinary the exact way as you did in the sever file
> - In the router.post we actually also want to leave it mostly the same as the way I am fixing it still uses multer to process and check the image type and to upload it to the server. When uploading to Cloudinary we are going to then use that path as the path to the image (Cloudinary requires the image uploaded be a string and also I didn't want to change too much of the project also wanted to keep issues down in other folks projects and create even more issues for them)

```js
router.post(
  '/',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const uploadPhoto = await cloud.uploader.upload(`${req.file.path}`);
    console.log(uploadPhoto); // This will give you all the information back from the uploaded photo result
    console.log(uploadPhoto.url); // This is what we want to send back now in the  res.send
    res.send(uploadPhoto.url);
  })
);
```

> (I recommend copying and pasting this below your route so you can better see what's going on and the comments properly)
>
> I added the asyncHandler to this as well so I can catch any errors if any when uploading the photo to cloudinary. You do not have to do this but I do suggest adding async (req, res) as you will have to use .then() if not for the response on cloudinary upload.
>
> So, what's going on here? Well as you can see the route is exactly the same but I added <code>const uploadPhoto = await cloud.uploader.upload(`${req.file.path}`)</code> which is the path on the heroku server that multer uploaded to. Same as if we left it as <code>res.send(`/${req.file.path}`)</code>. The console logs are for your info after we save the file we then we can send that url in our <code>res.send(uploadPhoto.url)</code>.

> <b>Nelson: </b>Thanks for the contribution. I prefer S3 however. Cloudinary is very expensive after you use up the bandwith in the free tier. I'll try setting up Multer with S3 and post my results. Thanks again!
>
> <b>Viktoras: </b>My setup for S3 and multer: I create new uploadControler.js with code bellow

```js
import asyncHandler from 'express-async-handler';
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';

const uploadProductImage = asyncHandler((req, res) => {
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.AWS_S3_ACCESSKEYID,
    secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
    region: process.env.AWS_S3_REGION,
  });

  const s3 = new aws.S3();

  const imageName = `${path.basename(
    req.file.originalname,
    path.extname(req.file.originalname)
  )}-${Date.now()}${path.extname(req.file.originalname)}`;

  var params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: fs.createReadStream(req.file.path),
    Key: `products/${imageName}`,
  };

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(error.statusCode).send(error.message);
    }

    if (data) {
      fs.unlinkSync(req.file.path); // Empty temp folder
      const locationUrl = data.Location;
      res.send(locationUrl);
    }
  });
});

export { uploadProductImage };
```

> Also I moved all Multer configs to my middleware folder, because I prefer to keep routes as clean as possible. So my uploadMiddleware.js looks like this:

```js
import path from 'path';
import multer from 'multer';

const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

const uploadImages = multer({
  dest: 'temp/',
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export { uploadImages };
```

> I setup my upload route as protected and for admin access only, so I end up with my uploadRoutes.js like this:

```js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { uploadImages } from '../middleware/uploadMiddleware.js';
import { uploadProductImage } from '../controllers/uploadControler.js';

const router = express.Router();

router
  .route('/')
  .post(protect, isAdmin, uploadImages.single('image'), uploadProductImage);

export default router;
```

> FYI. Don't forget to add your token then send post request from frontend or postman.

> <b>Carlos Emmanuel: </b>Hi, recently found an error in the @jay code in the uploadRoutes.js you have to replace:

```js
const uploadPhoto = await cloud.uploader.upload(`${req.file.path}`);
// with
const uploadPhoto = await cloudinary.v2.uploader.upload(`${req.file.path}`);
```

> <b>Jonathan: </b>@Jay this solution is great - thank you. Also, @Carlos is correct, in Jay's uploadRoutes.js, he imports the cloudinary package with the variable name cloud. This will cause an error if you have imported the package with the name of cloudinary. Full uploadRoutes.js:

```js
import path from 'path';
import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';

import pkg from 'cloudinary';
const cloudinary = pkg;

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  '/',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`);
    console.log(uploadPhoto);
    console.log(uploadPhoto.url);
    res.send(uploadPhoto.url);
  })
);

export default router;
```

&nbsp;

---

&nbsp;

> <b>Ramzi: </b>Amazon S3
> Hi, I know it's been mentioned that Brad would add Amazon S3 (or any kind of persistent online storage) functionality to the course. I need a step-by-step guide to incorporate it into the existing code.
>
> Unfortunately, it's not working for me with any of the solutions listed here--not even lu yi's guide, which seems to be the closest to the multer-s3 instructions.
>
> Keeping images on Heroku is not useful in the app. I need backend and frontend code to make this work in the app. It would help to get a postman example that lets me see how add a photo to the Amazon S3 bucket, either using multer s3 or any other way.

> <b>Bassir: </b>hello there, I have implemented it with s3 and it works:

```js
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});
const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: 'your-bucket',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadS3 = multer({ storage: storageS3 });
router.post('/s3', uploadS3.single('image'), (req, res) => {
  res.send(req.file.location);
});
export default router;
```

&nbsp;

---

&nbsp;

> <b>Jai: </b>Why are we not deducting the product count if an order is placed? Also if i want to do it how should i change my orders controllers to deduct product count for each product placed in order?

> <b>J??r??me: </b>There are several approachs we could take.
>
> We could simply do it when the order is created, or when the order is paid. So in <code>addOrderItems</code> or in <code>updateOrderToPay</code>, we could loop through <code>orderItems</code> and decrement countInStock accordingly. The code would look like this:

```js
const addOrderItems = handler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems?.length < 1) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();

    for (let item of createdOrder.orderItems) {
      const product = await Product.findById(item.product);
      product.countInStock -= item.qty;
      await product.save();
    }

    res.status(201).json(createdOrder);
  }
});
```

> There are several problems with this approach though. Now if you return to the store the stock has changed even if you never pay the cart. So maybe it is better to put this loop in the <code>updateOrderToPaid</code> controller.
>
> But then it doesn't solve all the problems. Because on your site you can expect a few customers trying to purchase the same product and it can become messy.
>
> Say customer1 put a product in their cart, the last one in stock. Right now <code>countInStock</code> didn't change and customer2 can put the same product in their cart too. Then customer1 goes through all the steps, the order is created, but not paid yet, he needs some time to go find his credit card. With the second approach <code>countInStock</code> still didn't change. So if custumer2 gets to the final step and pay before customer1, then when customer1 finnaly pay, the product is not in stock anymore...
>
> The basic idea to solve this problem is to track if a customer has "reserved" a product, and also check the actual stock at each step of the order process.
> when customer1's order is created in base, the product should be "virtually" out of stock, and customer2 should be warned at any step during the process that one of their cart items has been sold.
>
> Then if customer1 doesn't pay after some delay, the product is put back in stock and customer1 gets an alert that he should confirm the order before checkout.

&nbsp;

---

&nbsp;

> <b>Anirudh: </b>Product review allowance scope
>
> Are we not supposed to allow only the users who have purchased the product to review? If not, every other user can add reviews about any product listed

> <b>Bassir: </b>it is restricted on this project but it prevents duplicate review. all users should share the experience with products.

> <b>Bernardo: </b>I restricted it to users that have ordered the product since I couldn't figure out how to both check if the user has ordered the product and if the order in which the product is present has been delivered/paid.
>
> Still better than any one can review it:

```js productController.js
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  // Bring in user orders to check if they ordered the product
  const orders = await Order.find({ user: req.user._id });

  // Array of product ids that the user ordered
  const ordersItems = [].concat.apply(
    [],
    orders.map((order) =>
      order.orderItems.map((item) => item.product.toString())
    )
  );

  if (product) {
    // Check if the id of the product matches any of the users ordered products
    const hasBought = ordersItems.includes(product._id.toString());

    if (!hasBought) {
      res.status(400);
      throw new Error('You can only review products you bought');
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You can only review each product once');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
```

> <b>Eric: </b>I implemented this via the front-end only, no changes to the back end. This will show the review form to users that are:
>
> 1. Logged in
> 2. Have purchased the item being shown
> 3. The customer order in which the item was purchased has been marked as delivered
>
> Note: I have modified a few things in my project, but the solution should be similar for you if you followed the course 100%
>
> I created a <code>ProductReviewForm</code> component which takes in the product <code>id</code> and then gets called from the <code>ProductScreen</code>: &lt;ProductReviewForm id={id} /&gt;
>
> The <code>ProductReviewForm</code> component contains the <code>checkProductPurchase</code> function:

```js
// Check if the current product has been purchased by the user
// Return the order object that contains the current product
const checkProductPurchase = (userOrders, singleProduct) => {
  const checkResult = userOrders.find((order) =>
    order.orderItems.some((item) => item._id === singleProduct._id)
  );
  return checkResult;
};
```

> The <code>checkProductPurchase</code> function takes in <code>userOrders</code> and <code>singleProduct</code> which are an array of objects from the <code>payment_context</code> and the current product object from the <code>payment_context</code> respectively.
>
> It creates and returns the <code>checkResult</code> constant which can be in one of two states:
>
> 1. <code>Order</code> object (If the current product was found inside one of the user's orders
> 2. <code>undefined</code> (If the current product was not found inside one of the user's orders)
>
> The result from the <code>checkProductPurchase</code> function is then set to state via <code>useState</code> and <code>useEffect</code>:

```js
// Define useState local state
const [localCheckResult, setCheckResult] = useState(false);

// Define useEffect actions
useEffect(() => {
  userOrders && setCheckResult(checkProductPurchase(userOrders, singleProduct));
}, []);
```

> Once in state we render conditionally like so:
> <b>Note:</b> Due to the asynchronous nature of <code>setState</code>, we can only access the .<code>isDelivered</code> property value from <code>localCheckResult</code> once <code>localCheckResult</code> has been successfully updated by <code>setCheckResult</code> i.e. <code>localCheckResult</code> && <code>localCheckResult.isDelivered</code>

```js
  return (
    <Wrapper>
        <div className="reviews-form">
          {isUserLoggedIn(userInfo) &&
            userOrders &&
            localCheckResult &&
            localCheckResult.isDelivered && (
              <form className ....
                .....
              </form>
            )}
        </div>
```

> I feel like this is the behavior that we've come to expect from E-commerce apps so I'm happy that I was able to get it implemented. I hope it helps others, keep coding!

&nbsp;

---

&nbsp;

> <b>Alexei: </b>Cart reset & other bugs
>
> Thanks for the great course, as usual :P Some bugs I found...
>
> 1. You forgot to implement cart reset after order is submited, the cart stays with the items even if the order submited and payed,
> 2. The search box, when you press the "back" button, it goes back, but the search input stays with the search value.
> 3. The loaders.. when you used {successUpdate && ...} and {success && ...} sometimes you can see two loaders on one action (for example in the product managment page, try to delete a couple of products one after other).
> 4. product details page reset.. when you enter a couple of different products, you can see the previous product details for a second, untill it updates with the new product details.
> 5. Usualy only clients that bought some product should be able to rate it, not everybody.
> 6. When you delete user, you should delete his orders also... its not makes sense to leave it.. besides you cant enter/view any of the deleted user orders...
> 7. When you keep the product details in the order tabe (details like image), if the product get updated, its not appears in the orders.. you can still see the old product details.. I think it should be populated with the product table and get the updated details from that table.
> 8. Maybe you can add stripe in addition to paypal.
>
> Anyway that what I found in my learning experience, and I think its should be fix to get "more stable" system in the end :)

> <b>J??r??me: </b>Thanks for reporting those bugs, this gives us some cool things to work on once finished.
>
> Good catch for point 1, where I work there are sometimes bugs where the cart doesn't reset after the order is placed, and customers are worried that the order didn't got saved. sometimes they place another order...
>
> On point 3, I think the overall management of loading status is lacking. It's never defined in initial state and even the state returned by the reducers is not always accurate.
> Same thing with point 4, I had the same flickering problems at the beginning of the implementation of the front end, and I solved it with a better management of the loading state.
>
> On point 5, a good alternative is to keep track of the reviews by actual buyers on the site, like it's done on Amazon. We implemented such a system where I work, before that any connected user could post a review but now those which comes from actual buyers of the product are tagged "verified".
> Neat idea: implement a reward for verified reviews ;)
>
> Point 6: no, no, no! You should keep track of any order!
> Delete user info (name, email, address), but keep track of the order, as an "anonymous" order.
> Also keep track of canceled orders.
>
> I'm not so sure about point 7.
> To me the product should stay in the order as it was when ordered (images, price, maybe even description...). We still have the id to get the current state of the product.
> I'd even argue that we should store customer name and email in the order, that's what we do where I work. We have the current info of the customer with the id, but we also keep customer's info as they were at the moment of the order.
>
> For context, I work for an eCommerce shop that sell any photography related stuff. The site has been online for almost 20 years, but rely mostly on "old" technologies (php/MySQL, no framework, jQuery, yeah, I know...).

> <b>Alexei: </b>Thanks for the reply!
>
> 1.  I agree, the orders should stay even if the user got deleted, but you need to keep the user details inside the order table, for now after the user deleted, you cant enter the order at all.
> 2.  I agree, the product should be kept with the original info in the order table (I didn't thought about it well before) but the problem is the Image, in the end if you update the image, you should remove the old one (else you will get a lot of trash in the server), and after you remove the old one. its broken in the orders...
>
> Hey for me PHP & MySQL is still win win even in our days :P

&nbsp;

---

&nbsp;
