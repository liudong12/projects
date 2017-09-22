var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');
var Size = require('../models/size');
var Order = require('../models/order');

var Hbs = require('hbs');


/* GET home page. */
router.get('/', function (req, res, next) {  
       
    //var scripts = ['/js/shop.shopping-cart.js'];
    var css = ['/css/company.index.css'];   
    res.render('company/index', {title: 'Momoteks', css: css});   
});

//验证码
var captchapng = require('captchapng');
router.get('/checkcode', function (req, res, next) {  //router.get('/captcha.png', function (req, res, next)
    //方法1：  
    // if(req.url == '/captcha.png') { 
    //     var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // 宽,高,数字验证码
    //     p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
    //     p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

    //     var img = p.getBase64();
    //     var imgbase64 = new Buffer(img,'base64');
    //     res.writeHead(200, {
    //         'Content-Type': 'image/png'
    //     });
    //     res.end(imgbase64);
    //   } 
    //   else 
    //     res.end('');  
    
    //方法2：
    var width=!isNaN(parseInt(req.query.width))?parseInt(req.query.width):100;
    var height=!isNaN(parseInt(req.query.height))?parseInt(req.query.height):30;

    var code = parseInt(Math.random()*9000+1000);
    req.session.checkcode = code;

    var p = new captchapng(width,height, code);
    p.color(0, 0, 0, 0); 
    p.color(80, 80, 80, 255);

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
});

router.get('/portfolio', function (req, res, next) {  
       
    var scripts = ['/js/company.portfolio.js', '/js/cta.min.js'];
    var css = ['/css/company.portfolio.css'];   
    res.render('company/portfolio', {title: 'Portfolio', css: css, scripts: scripts});   
});

router.get('/about', function (req, res, next) {  
       
    //var scripts = ['/js/company.about.js'];
    var css = ['/css/company.about.css'];   
    res.render('company/about', {title: 'About', css: css});   
});

router.get('/contact', function (req, res, next) {  
       
    var scripts = ['/js/jquery.min.js', '/js/contact-form.js', '/js/company.contact.js'];
    var css = ['/css/company.contact.css'];   
    res.render('company/contact', {title: 'About', css: css, scripts: scripts});   
});

router.get('/process', function (req, res, next) {  
       
    //var scripts = ['/js/contact-form.js', '/js/company.contact.js'];
    var css = ['/css/company.process.css'];   
    res.render('company/process', {title: 'Process', css: css});   
});

router.get('/faq', function (req, res, next) {  
       
    var scripts = ['/js/jquery.min.js', '/js/folding.js']; //jquery.min.js 不能省
    var css = ['/css/company.faq.css'];   
    res.render('company/faq', {title: 'FAQ', css: css, scripts: scripts});   
});

router.post('/check_availability', function(req, res, next) { console.log("zzz");

    var scripts = ['/js/shop.product-detail.js', '/js/folding.js', '/js/jquery.form.js', '/js/shop.edit-cart-item.js'];
    var css = ['/css/shop.product-detail.css', '/css/shop.edit-cart-item.css'];
    
    if(req.xhr){
        if (!req.session){//否定，如果没有的话
            var response = {};
            response.msg = 'Illegal Access';

            res.json(response);      
        }
        console.log("aaa");
        setTimeout(
          function() 
          {
            //使用express来验证
            // req.assert('name', 'Invalid Name').notEmpty();
            // req.assert('email', 'Invalid Email').notEmpty().len(16, 16);
            // req.assert('tel', 'Invalid Telphone').notEmpty();
            // req.assert('message', 'Invalid Message').notEmpty();
            // req.assert('code', 'Invalid Code').notEmpty();

            // var errors = req.validationErrors();
            // if (errors) {
                 
            //     //     var messages = [];//声明一个空数组，用于保存所有的验证是产生的错误 //an aray of message which i want to pass back to the view
            //     //     errors.forEach(function(error) {//遍历所有的错误
            //     //        messages.push(error.msg);//将每个单独的错误(error对象的msg属性) 放到数组里面//we are not push the complete error object, but the msg field
            //     //     });
            //     //     req.flash('errorMessages', messages); //在这里写入 //在post方法里面写入，在get方法里面读取
                
            //     // console.log("assert" + JSON.stringify(errors));
            // }
            // else{
            //     // var name    = req.body.name;
            //     // var email   = req.body.email;
            //     // var tel = req.body.tel;
            //     // var message = req.body.message;
            //     // var code = req.body.code;
            // }

            //do something special
            Object.prototype.isEmpty = function() {
                for(var key in this) {
                    if(this.hasOwnProperty(key))
                        return false;
                }
                return true;
            }
            var errors = {}; // array to hold validation errors
            var data   = {}; // array to pass back data

            var name    = req.body.name;
            var email   = req.body.email;
            var tel = req.body.tel;
            var message = req.body.message;
            var code = req.body.code;
            console.log("name" + name);
            console.log("email" + email);

            if (name == "") {
                   
                errors["name"] = 'Name Required';
            }
            if (email == "") {
                errors["email"] = 'Email Required';
            }
            if (!validateEmail(email)) {
                errors["email"] = 'Email Not Valid';
            }
            // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            //     $errors['email'] = 'Email is invalid.';
            // }
            if (tel == "") {
                errors["tel"] = 'Telphone Required';
            }
            if (message == "") {
                errors["message"] = 'Message Required';
            }
            // if((req.session.checkcode == "") || (!req.session.checkcode == code)) { console.log(req.session.checkcode);
            //     errors["code"] = 'Code Not Match';
            // }
            console.log("req.session.checkcode: "+ req.session.checkcode);
            console.log("code: "+ code);
            if(code == "") { console.log("a"+ req.session.checkcode);
                errors["code"] = 'Code Required';
            }
            if(code != req.session.checkcode) { console.log("b"+ req.session.checkcode);
                errors["code"] = 'Code Not Match';
            }
            if (errors.isEmpty) {
                data.success = false;
                data.errors  = errors;
            } else {
                data.success = true;
                data.message = 'Looks Good';
            } 
            //console.log("errors.length" + errors.length);//errors.length不能检测关联数组，所以在这里没用
            console.log("errors" + JSON.stringify(errors));
            console.log("data" + JSON.stringify(data));
            res.json(data);
            
          }, 1000);
          
        
    }
    else{//如果不是ajax请求
            // var response = [];
            // response['msg'] = 'Illegal Access';
            var response = {};
            response.msg = 'Illegal Access';

            res.json(response);
            //return response()->json($response);
            //echo json_encode($response);  //或者这样写
        }
});

router.get('/shopping-Cart', function (req, res, next) {  

    var scripts = ['/js/company.shopping-cart.js'];
    var css = ['/css/user.shopping-cart.css'];

    //查看Session数组里面是否有下标叫cart的这个元素
    //也就是，查看Session里面是否有购物车对象
    if (!req.session.cart){//否定，如果没有的话
        return res.render('company/shopping-cart',
                            {
                                title: "Shopping Cart",
                                scripts: scripts,
                                css: css,
                                helpers: {
                                          
                                }
                            }
                          );  //显示模板，并且注入一些变量       
    }

        //如果有的话
        var oldCart = req.session.cart;//从Session里面获取到购物车对象，然后保存在变量$oldCart

        //然后创建一个新的购物车对象，传入$oldCart
        ////其实这里可以直接用$oldCart，但是我们最好不要直接在$oldCart上操作，因为$oldCart主要是用来添加的，我们尽量不要去改变它
        var cart = new Cart(oldCart);
        //dd($cart->items);
        // console.log(cart);
        return res.render(
                           'shop/shopping-cart', 
                           {
                                products: cart.items, 
                                totalPrice: cart.totalPrice,
                                title: "Shopping Cart",
                                scripts: scripts,
                                css: css,
                                helpers: {
                                            
                                }
                            }
                        ); 
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id; //获取id
    var cart = new Cart(req.session.cart ? req.session.cart : {});//a new cart will be created each time i add a new item. pass in the old cart, if i do have a old cart.
    //req.session.cart 表示 check if the cart property exists.
    //if it does exists, then i will pass my req.session.cart (old cart)
    //otherwise, pass in an empty js object


    Product.findById(productId, function(err, product) {//要是没找到返回err，要是找到就返回product
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);//传入找到以后返回的product，和product的id字段
        req.session.cart = cart; //store the cart in the session. the session will be saved as soon as the response was sent back.
        //console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/edit-cart-item/:sku', function(req, res, next) {

    var scripts = ['/js/shop.product-detail.js', '/js/folding.js', '/js/jquery.form.js', '/js/shop.edit-cart-item.js'];
    var css = ['/css/shop.product-detail.css', '/css/shop.edit-cart-item.css'];
    
    if(req.xhr){
        var sku = req.params.sku; //获取 sku
        var oldCart = req.session.cart ? req.session.cart : {};
        var cart = new Cart(oldCart); 
        var product =  cart.items[sku]['item'];  //用这个，因为这个 $product 里面有sizeName 字段 (在postAddToCartAjax里面添加的字段)  
        var productId = product._id;
        var qty =  cart.items[sku]['qty'];//商品数量

        
        
        var promise = Product.findById(productId, function(err, product) {//要是没找到返回err，要是找到就返回product
            if (err) {
               return res.redirect('/');
            }
        });
        
        promise.then(function (product) {
            Product.
            findOne({ _id: product._id }).
            populate('sizes'). // only works if we pushed refs to children
            exec(function (err, product) {
                if (err) return err;                              
                
                //将所有的尺码都变成大写 
                var sizes = product.sizes;
                for(var m = 0; m < sizes.length; m++) {
                    var sizeName1 = sizes[m].product_size;
                     sizes[m].product_size = sizeName1.toUpperCase();
                }
                

                //为product对象添加一些字段
                product.largeImageUrl =         product.imageUrl + '/'  + product.product_sn + 'view1' + product.large        + product.imageType;
                product.largeRetinaImageUrl =   product.imageUrl + '/'  + product.product_sn + 'view1' + product.largeRetina  + product.imageType;
                product.mediumImageUrl =        product.imageUrl + '/'  + product.product_sn + 'view1' + product.medium       + product.imageType;
                product.mediumRetinaImageUrl =  product.imageUrl + '/'  + product.product_sn + 'view1' + product.mediumRetina + product.imageType;
                product.smallImageUrl =         product.imageUrl + '/'  + product.product_sn + 'view1' + product.small        + product.imageType;
                product.smallRetinaImageUrl =   product.imageUrl + '/'  + product.product_sn + 'view1' + product.smallRetina  + product.imageType;
                product.standardImageUrl =      product.imageUrl + '/'  + product.product_sn + 'view1' + product.standard     + product.imageType;
                                                              
                //生成 viewImageUrl 字段 （数组类型）
                var i;
                var viewImageUrl = [];
                for (i = 1; i < product.view_number+1; i++) {
                    //product.eval('view' + i + 'ImageUrl') =  product.imageUrl + '/'  + product.product_sn + 'view' + i + product.thumbnail + product.imageType;
                    product['view' + i + 'ImageUrl'] =  product.imageUrl + '/'  + product.product_sn + 'view' + i + product.thumbnail + product.imageType;        
                    viewImageUrl[i] = product['view' + i + 'ImageUrl'];//生成数组
                    product.viewImageUrl = viewImageUrl;//将数组保存到 $product->viewImageUrl
                }

                //生成 viewImageId 字段 （数组类型）
                var j;
                var viewImageId = [];
                for(j = 1; j < product.view_number+1; j++){
                    product['view' + j + 'ImageId'] =  product.product_sn + 'view' + j;
                    viewImageId[j] = product['view' + j + 'ImageId'];
                    product.viewImageId = viewImageId;       
                }

                Product.
                find({ product_style: product.product_style }).
                exec(function (err, brothers) {
                    if (err) return err;
                    for (var i in brothers) {
                      brothers[i].colorImageUrl = brothers[i].imageUrl + '/' + brothers[i].product_sn + brothers[i].colorImage + brothers[i].imageType;
                    }
                   

                    //记住正在修改的这个商品
                    req.session['editing-item'] = sku;
                            // console.log('product: ' + product);
                            // console.log('brothers: ' + brothers);
                            // console.log('sizes: ' + sizes);
                            // console.log('qty: ' + qty);
                    res.render(
                                   'shop/edit-cart-item', 
                                   {      
                                        layout: 'master-for-edit-item', 
                                        //layout: false,                         
                                        product: product,                                
                                        brothers:  brothers,
                                        sizes: sizes, 
                                        qty: qty,
                                        title: "edit",
                                        scripts: scripts,
                                        css: css,
                                        helpers: {
                                            table: function(data) {
                                                var str = '<table>';
                                                for (var i = 0; i < data.length; i++ ) {
                                                    str += '<tr>';
                                                    for (var key in data[i]) {
                                                        str += '<td>' + data[i][key] + '</td>';
                                                    };
                                                    str += '</tr>';
                                                };
                                                str += '</table>';

                                                return new Hbs.SafeString (str);
                                            },
                                            imglist: function(product) {//product=data
                                                var str = '';
                                                for (var i = 2; i < product.view_number + 1; i++ ) {
                                                    str += '<li class="imglist' + ' ' + 'imglist' + i + '" ' + 'data-id="' + product.viewImageId[i] + '">';
                                                    
                                                    str += '<img class="simg' + ' ' + 'simg' + i + '" ' + 'alt="加载中..."' + ' ' + 'src="' + product.viewImageUrl[i] + '"' + ' ' + 'data-src="' + product.viewImageId[i] + '">';
                                                
                                                    str += '</li>';
                                                };
                                                
                                                return new Hbs.SafeString (str);
                                            }                                                            
                                        }
                                    }, 
                                    function(err, html){
                                        var data = {};
                                        data.view = html;
                                        //console.log('body: ' + data.view);
                                        res.json(data);
                                    }
                    );
                    // res.render('shop/product-detail-part', 
                    //            {
                    //                 layout: false,//不要加载头部和脚部
                    //                 //errors: req.session.errors,
                    //                 product: product, 
                    //                 brothers: brothers, 
                    //                 sizes: sizes,
                    //                 helpers: {
                    //                             // foo: function () { return 'FOO!'; },
                    //                             // bar: function () { return 'BAR!'; },
                    //                             table: function(data) {
                    //                                 var str = '<table>';
                    //                                 for (var i = 0; i < data.length; i++ ) {
                    //                                     str += '<tr>';
                    //                                     for (var key in data[i]) {
                    //                                         str += '<td>' + data[i][key] + '</td>';
                    //                                     };
                    //                                     str += '</tr>';
                    //                                 };
                    //                                 str += '</table>';

                    //                                 return new Hbs.SafeString (str);
                    //                             },
                    //                             imglist: function(product) {//product=data
                    //                                 var str = '';
                    //                                 for (var i = 2; i < product.view_number + 1; i++ ) {
                    //                                     str += '<li class="imglist' + ' ' + 'imglist' + i + '" ' + 'data-id="' + product.viewImageId[i] + '">';
                                                        
                    //                                     str += '<img class="simg' + ' ' + 'simg' + i + '" ' + 'alt="加载中..."' + ' ' + 'src="' + product.viewImageUrl[i] + '"' + ' ' + 'data-src="' + product.viewImageId[i] + '">';
                                                    
                    //                                     str += '</li>';
                    //                                 };
                                                    
                    //                                 return new Hbs.SafeString (str);
                    //                             }                                    
                    //                             // concat: function() {
                    //                             //     var outStr = '';
                    //                             //     for(var arg in arguments){
                    //                             //         if(typeof arguments[arg]!='object'){
                    //                             //             outStr += arguments[arg];
                    //                             //         }
                    //                             //     }
                    //                             //     return outStr;
                    //                             // }
                    //                 }
                    //            }, function(err, html){
                    //                 var data = {};
                    //                 data.view = html;
                    //                 console.log('body: ' + data.view);
                    //                 res.json(data);
                    //             }
                    // );
                });
            }); 
        }); 
    }else{
                    

    }
});

router.get('/remove-one-item/:sku', function(req, res, next) {
    if(req.xhr){
        
        var product_sku = req.params.sku; //获取 sku
        //var cart = req.session.cart ? req.session.cart : {};  //错
        var cart = new Cart(req.session.cart ? req.session.cart : {});  //必须要重新生成
        //console.log(cart);
        var hasItem = cart.removeOneItem(product_sku);//根据sku来删除

        if(!hasItem){//判断购物车里面是否还有东西
            delete req.session.cart; //要是没东西的话，就把购物车也删了
        }else{//要是还有东西的话
            //也可以用Session facade 如：  Session::
            req.session.cart =  cart; //将购物车对象保存在session里面，下标是 'cart'  //dong: 覆盖本来的
        }

        // $response = array(
                
        //         'msg'  => 'Deleted Successfully',
        //         'result'      => true
                
        //         );
        //     //dd($cart);

        // echo json_encode($response);

        var response = {};
        response.msg = 'Deleted Successfully';
        response.result = true;

        res.json(response);
    }
    else{
        // $response1 = array(
            
        //     'msg'  => 'Deleted Failed',
        //     'result'      => false
           
        //     );

        // echo json_encode($response);

        var response = {};
        response.msg = 'Deleted Failed';
        response.result = false;

        res.json(response);
    }
});

router.post('/add-to-cart', function(req, res, next) {  //console.log("aaaaaaa");

    //设计理念：将添加和修改合并，因为在修改的页面我们也要用到产品细节的页面来切换
    //在这个项目里，修改其实只比添加多了删除本来的那个商品这一步

    if(req.xhr){ //判断是否 ajax 提交
        // $id = $_POST['id'];
        // $color = $_POST['color-radio'];
        // $size = $_POST['size-radio'];
        

        //生成订单
        // var order = new Order({//create a new order //创建一个订单//类似于创建一张表
        //     user: req.user,//fetching the user from the request. //为啥req里面有user？答：passport does this for us. since i am using passport in this application, whenever i sign in with passport, passport will place this "user" object here on the "req". therefore, throughout my whole application, i can always use this "user" object
        //     cart: cart,
        //     address: req.body.address,//retrive address field
        //     name: req.body.name,//retrive name field //"req.body" is where express store the values sent with post request 
        //     paymentId: charge.id //fininally i want to store the payment id, i can retrive the paymentId from my charge object which gets passed here to the callback above
        // });
        // order.save(function(err, result) {//save the order to the database//传入一个回调函数，如果保存失败就传入err，如果保存成功就传入result
        //     req.flash('success', 'Successfully bought product!');
        //     req.session.cart = null;
        //     res.redirect('/');
        // });


        /*
        //后端验证 记的打开
        req.assert('color-radio', 'color required').notEmpty();
        req.assert('size-radio', 'size required').notEmpty();
        // req.checkBody('email', 'Invalid email').notEmpty().isEmail().isUnique();
        // req.checkBody('password', 'Invalid possword').notEmpty().len(8, 30);
        // req.checkBody('first_name', 'Invalid first_name').notEmpty().isAlpha();
        // req.checkBody('last_name', 'Invalid last_name').notEmpty().isAlpha();
        // req.checkBody('dateofbirth', 'Invalid dateofbirth').notEmpty.isDate();
        
        var errors = req.validationErrors();
          if (errors) {
            // var productId = req.body.id;
            // req.session.errors = errors; 
            // return res.redirect('http://localhost:3000/product-detail/' + productId);
                      
            // res.send(errors);            
            //return;
          } else {
            // normal processing here
          }
          */

        var productId = req.body.id; //获取id
        var product_sn = req.body.product_sn;//将传过来的(form里)product_sn字段的值保存在变量 product_sn
        var colorName = req.body['color-radio'];//将传过来的(form里)color-radio字段的值保存在变量$color
        var sizeName = req.body['size-radio'];//将传过来的(form里)size-radio字段的值保存在变量$size 
        var qty = req.body['product-qty'];


        var promise = Product.findById(productId, function(err, product) {//要是没找到返回err，要是找到就返回product
            if (err) {
               return res.redirect('/');
            }
        });

        
        promise.then(function (product) {
            Product.
            findOne({ _id: product._id }).
            populate('sizes'). // only works if we pushed refs to children
            exec(function (err, product) {
                if (err) return err; 

                //console.log(product);
                
                //生成imagePath字段并赋值
                product.imagePath = product.imageUrl + '/' + product.product_sn + 'view1' + product.extraSmall + product.imageType;

                //生成sizeName字段并赋值 //为了再购物车里面显示尺码这一项
                product.sizeName = sizeName;

                //得到product_sku
                var sizes = product.sizes;

                for(var i = 0; i < sizes.length; i++) {
                     var sizeName1 = sizes[i].product_size;
                     var sizeName2 = sizeName;
                     if(sizeName1.toUpperCase() == sizeName2.toUpperCase())
                     {
                        var product_sku = sizes[i].product_sku;
                        
                     }
                }
                
                //生成product_sku字段并赋值
                product.product_sku = product_sku;

                var cart = new Cart(req.session.cart ? req.session.cart : {});//a new cart will be created each time i add a new item. pass in the old cart, if i do have a old cart.
                //req.session.cart 表示 check if the cart property exists.
                //if it does exists, then i will pass my req.session.cart (old cart)
                //otherwise, pass in an empty js object

                 //不需要
                 // cart.add(product, product.id);//传入找到以后返回的product，和product的id字段
                 // req.session.cart = cart; //store the cart in the session. the session will be saved as soon as the response was sent back.
                 // console.log(req.session.cart);
                 //res.redirect('/');


                 if(req.session['editing-item']){ 
                     var editingItemSku = req.session['editing-item'];

                     //必须要先删除，再添加，要不然当颜色和尺寸一样的时候，sku的值是一样的，这样就会把刚刚添加的东西给删了
                     cart.removeItem(editingItemSku);//删除本来的
                     delete req.session['editing-item'];

                     // var response = [];
                     // response['isUpdate'] = true;
                     var response = {};
                     response.isUpdate = true;
                 }
                 else{
                     // var response = [];
                     // response['isUpdate'] = false;
                     var response = {}; //这里要对象类型才行，数组类型不行
                     response.isUpdate = false;
                 }

                //测试用
                // console.log("product--sizeName---" + product.sizeName);
                // console.log("product--imagePath---" + product.imagePath);

                 //将商品加入购物车，传入$product对象和id
                 //我们也可以在Cart里面找到其所对应的id，但是这样写更灵活，这样写，就算$product模型里面没有绑定id这个属性，我们也可以将其加入购物车
                 //$cart->add($product, $product->id);//通过id来创建购物车
                 for(var k = 0; k < qty; k++){//根据用户选择的商品数量来添加，要是买一个就添加一次，要是买2个就添加2次，产品和产品的编号都是一样的
                 cart.add(product, product_sku);//在cart模型里面。设计的原则是：只有商品相同，并且尺码相同，才能归在一起//所以这里要通过sku来创建购物车//因为：如果是同一商品的话，只有用sku才能区分不同的尺码，因为同一商品不同的尺码的sku是不一样的
                 }

                
                 req.session.cart = cart;  //将购物车对象保存在session里面，下标是 'cart'

                //测试用
                // console.log(req.session.cart.items); 
                // var aaa= req.session.cart.items;
                // console.log("sizeName---" + aaa['16700010102'].item.sizeName);
                // console.log("imagePath---" + aaa['16700010102'].item.imagePath);


                 // response['msg'] = 'Has Been Added Into Cart';
                 // response['itemsInCart'] = req.session.cart ? req.session.cart.totalQty: '';
                 
                 response.itemsInCart = req.session.cart ? req.session.cart.totalQty: '';

                 //console.log(response);  //查看response数组

                 res.json(response);
                 //return response()->json($response);
                 //echo json_encode($response);  //或者这样写                                            
            });
        });        
    }else{//如果不是ajax请求
        // var response = [];
        // response['msg'] = 'Illegal Access';
        var response = {};
        response.msg = 'Illegal Access';

        res.json(response);
        //return response()->json($response);
        //echo json_encode($response);  //或者这样写
    }
});

router.get('/product-detail/:id', function(req, res, next) { 
    var productId = req.params.id; //获取id
    
    var promise = Product.findById(productId, function(err, product) {//要是没找到返回err，要是找到就返回product
        if (err) {
           return res.redirect('/');
        }
    });

    
    promise.then(function (product) {
        Product.
        findOne({ _id: product._id }).
        populate('sizes'). // only works if we pushed refs to children
        exec(function (err, product) {
            if (err) return err;                              
             
            var sizes = product.sizes;

            product = product.toObject(); //Mongoose Models inherit from Documents, which have a toObject() method. 将 Document 类型转换成对象类型
            product.largeImageUrl =         product.imageUrl + '/'  + product.product_sn + 'view1' + product.large        + product.imageType;
            product.largeRetinaImageUrl =   product.imageUrl + '/'  + product.product_sn + 'view1' + product.largeRetina  + product.imageType;
            product.mediumImageUrl =        product.imageUrl + '/'  + product.product_sn + 'view1' + product.medium       + product.imageType;
            product.mediumRetinaImageUrl =  product.imageUrl + '/'  + product.product_sn + 'view1' + product.mediumRetina + product.imageType;
            product.smallImageUrl =         product.imageUrl + '/'  + product.product_sn + 'view1' + product.small        + product.imageType;
            product.smallRetinaImageUrl =   product.imageUrl + '/'  + product.product_sn + 'view1' + product.smallRetina  + product.imageType;
            product.standardImageUrl =      product.imageUrl + '/'  + product.product_sn + 'view1' + product.standard     + product.imageType;
                                                           
            
            //生成 viewImageUrl 字段 （数组类型）
            var i;
            var viewImageUrl = [];
            for (i = 1; i < product.view_number+1; i++) {
                //product.eval('view' + i + 'ImageUrl') =  product.imageUrl + '/'  + product.product_sn + 'view' + i + product.thumbnail + product.imageType;
                product['view' + i + 'ImageUrl'] =  product.imageUrl + '/'  + product.product_sn + 'view' + i + product.thumbnail + product.imageType;        
                viewImageUrl[i] = product['view' + i + 'ImageUrl'];//生成数组
                product.viewImageUrl = viewImageUrl;//将数组保存到 $product->viewImageUrl
            }

            //生成 viewImageId 字段 （数组类型）
            var j;
            var viewImageId = [];
            for(j = 1; j < product.view_number+1; j++){
                product['view' + j + 'ImageId'] =  product.product_sn + 'view' + j;
                viewImageId[j] = product['view' + j + 'ImageId'];
                product.viewImageId = viewImageId;       
            }

            Product.
            find({ product_style: product.product_style }).
            exec(function (err, brothers) {
                if (err) return err;
                for (var i in brothers) {
                  brothers[i].colorImageUrl = brothers[i].imageUrl + '/' + brothers[i].product_sn + brothers[i].colorImage + brothers[i].imageType;
                }  
                //console.log('product obj: ', product);
                // console.log('brothers obj: ', brothers);
                
                var node = [
                        {name: 'express', url: 'http://expressjs.com/'},
                        {name: 'hapi', url: 'http://spumko.github.io/'},
                        {name: 'compound', url: 'http://compoundjs.com/'},
                        {name: 'derby', url: 'http://derbyjs.com/'}
                ]

                var scripts = ['/js/shop.product-detail.js', '/js/folding.js', '/js/jquery.form.js'];
                var css = ['/css/shop.product-detail.css'];
                if(req.xhr){ //一个简便属性，如果请求由 Ajax 发起将会返回 true 。 //https://findwisdom.github.io/2016/10/23/Node-Express-request-response/
                    //return response()->json(['view' => view('shop.product-detail-part',['product' => $product, 'brothers' => $brothers, 'sizes' => $sizes])->render()]);              
                    //res.setHeader('Content-Type', 'application/json');
                    //var data = {};
                    //res.render('shop/product-detail-part', {product: product, brothers: brothers, sizes: sizes});
                    // console.log('body: ' + JSON.stringify(data));
                    // res.send(JSON.stringify(data, null, 3));
                    
                    
                    res.render('shop/product-detail-part', 
                               {
                                    //layout: false,//不要加载头部和脚部
                                    layout: 'master-for-edit-item',
                                    errors: req.session.errors,
                                    product: product, 
                                    brothers: brothers, 
                                    sizes: sizes,
                                    scripts: scripts,
                                    css: css,
                                    helpers: {
                                                // foo: function () { return 'FOO!'; },
                                                // bar: function () { return 'BAR!'; },
                                                table: function(data) {
                                                    var str = '<table>';
                                                    for (var i = 0; i < data.length; i++ ) {
                                                        str += '<tr>';
                                                        for (var key in data[i]) {
                                                            str += '<td>' + data[i][key] + '</td>';
                                                        };
                                                        str += '</tr>';
                                                    };
                                                    str += '</table>';

                                                    return new Hbs.SafeString (str);
                                                },
                                                imglist: function(product) {//product=data
                                                    var str = '';
                                                    for (var i = 2; i < product.view_number + 1; i++ ) {
                                                        str += '<li class="imglist' + ' ' + 'imglist' + i + '" ' + 'data-id="' + product.viewImageId[i] + '">';
                                                        
                                                        str += '<img class="simg' + ' ' + 'simg' + i + '" ' + 'alt="加载中..."' + ' ' + 'src="' + product.viewImageUrl[i] + '"' + ' ' + 'data-src="' + product.viewImageId[i] + '">';
                                                    
                                                        str += '</li>';
                                                    };
                                                    
                                                    return new Hbs.SafeString (str);
                                                }                                    
                                                // concat: function() {
                                                //     var outStr = '';
                                                //     for(var arg in arguments){
                                                //         if(typeof arguments[arg]!='object'){
                                                //             outStr += arguments[arg];
                                                //         }
                                                //     }
                                                //     return outStr;
                                                // }
                                    }
                               }, function(err, html){
                                    var data = {};
                                    data.view = html;
                                    //console.log('body: ' + data.view);
                                    res.json(data);
                                });
                }else{  //如果不是ajax请求             
                    res.render(
                               'shop/product-detail', 
                               {
                                    errors: req.session.errors,
                                    product: product, 
                                    totalPrice: productId,
                                    brothers:  brothers,
                                    sizes: sizes, 
                                    node: node,
                                    title: "Shopping Cart",
                                    scripts: scripts,
                                    css: css,
                                    helpers: {
                                                // foo: function () { return 'FOO!'; },
                                                // bar: function () { return 'BAR!'; },
                                                table: function(data) {
                                                    var str = '<table>';
                                                    for (var i = 0; i < data.length; i++ ) {
                                                        str += '<tr>';
                                                        for (var key in data[i]) {
                                                            str += '<td>' + data[i][key] + '</td>';
                                                        };
                                                        str += '</tr>';
                                                    };
                                                    str += '</table>';

                                                    return new Hbs.SafeString (str);
                                                },
                                                imglist: function(product) {//product=data
                                                    var str = '';
                                                    for (var i = 2; i < product.view_number + 1; i++ ) {
                                                        str += '<li class="imglist' + ' ' + 'imglist' + i + '" ' + 'data-id="' + product.viewImageId[i] + '">';
                                                        
                                                        str += '<img class="simg' + ' ' + 'simg' + i + '" ' + 'alt="加载中..."' + ' ' + 'src="' + product.viewImageUrl[i] + '"' + ' ' + 'data-src="' + product.viewImageId[i] + '">';
                                                    
                                                        str += '</li>';
                                                    };
                                                    
                                                    return new Hbs.SafeString (str);
                                                }
                                    }
                                }); 
                    //console.log("2" + req.session.errors); delete req.session.errors; console.log("3" + req.session.errors);
                }
                
                // res.render('shop/product-detail', {product: product, totalPrice: productId, sizes: sizes});
            });
        });
    });
});


router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id; 
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) { //如果session里面没有购物车 //if the cart is not set in the session
       return res.render('shop/shopping-cart', {products: null});
   } 
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});//cart.generateArray() 返回a list of array of my products (group) in my cart
});

//本来的 get checkout
// router.get('/checkout', isLoggedIn, function(req, res, next) {
//     if (!req.session.cart) {
//         return res.redirect('/shopping-cart');
//     }
//     var cart = new Cart(req.session.cart);//create a new cart of the cart stored in my session
//     var errMsg = req.flash('error')[0];
//     res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
// });

//新的 get checkout
router.get('/checkout', function(req, res, next) {
    var scripts = ['https://js.stripe.com/v2/', '/js/checkout.js', '/js/shop.checkout.js', '/js/folding.js'];
    var css = ['/css/shop.checkout.css'];

    //查看Session数组里面是否有下标叫cart的这个元素
    //也就是，查看Session里面是否有购物车对象
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }

    var cart = new Cart(req.session.cart);//create a new cart of the cart stored in my session
    var errorMessages = req.flash('errorMessages');//在这里读取错误提示信息
    //res.render('shop/checkout', {scripts: scripts, css: css, total: cart.totalPrice, errorMessages: errorMessages, noError: !errorMessages});
      res.render('shop/checkout', {scripts: scripts, css: css, total: cart.totalPrice, productsInCart: cart.items, errorMessages: errorMessages, hasErrors: errorMessages.length > 0});

});

router.post('/checkout', function(req, res, next) {
    
    //查看Session数组里面是否有下标叫cart的这个元素
    //也就是，查看Session里面是否有购物车对象
    if (!req.session.cart){//否定，如果没有的话
        return res.redirect('/shopping-cart');  //如果没有东西的话要去的页面  //显示模板
    }
    
    var cart = new Cart(req.session.cart);//create a new cart of the cart stored in my session

    //后端验证
    req.assert('payment-type', 'Invalid Payment Type').notEmpty();
    req.assert('card-number', 'Invalid Car Nnumber').notEmpty().len(16, 16);
    req.assert('card-expiry-month', 'Invalid Card Expiry Month').notEmpty();
    req.assert('card-expiry-year', 'Invalid Card Expiry Year').notEmpty();
    req.assert('card-cvc', 'Invalid Card CVC').notEmpty();
    req.assert('billing-first-name', 'Invalid First Name').notEmpty().len(2, 20);
    req.assert('billing-last-name', 'Invalid Last Name').notEmpty().len(2, 20);
    req.assert('billing-address', 'Invalid Billing Address').notEmpty();
    req.assert('billing-city', 'Invalid Billing City').notEmpty().len(2, 10);
    req.assert('billing-state', 'Invalid Billing State').notEmpty().len(2, 2);
    req.assert('billing-zip', 'Invalid Billing Zip').notEmpty().len(5, 15);
    req.assert('billing-tel', 'Invalid Billing Tel').notEmpty().len(9, 15);
    req.assert('email', 'Invalid Email').notEmpty();

    
    var errors = req.validationErrors();
    if (errors) {
         //req.session.errors = errors; //使用session来显示错误提示信息

        // req.flash('errors','未登录');  //测试
        // req.flash('errors','未登录2'); //测试
        //req.flash('errors', errors); //测试
        // for(var i = 0; i < errors.length; i++) { //测试
        //     req.flash('errors', errors[i].msg);
        // }
        
        //使用connect flash 的方式来显示错误，成功的方法
        var messages = [];//声明一个空数组，用于保存所有的验证是产生的错误 //an aray of message which i want to pass back to the view
        errors.forEach(function(error) {//遍历所有的错误
           messages.push(error.msg);//将每个单独的错误(error对象的msg属性) 放到数组里面//we are not push the complete error object, but the msg field
        });
        req.flash('errorMessages', messages); //在这里写入 //在post方法里面写入，在get方法里面读取
    }
    else{
        //赋给对应的变量
        var paymentType = req.body['payment-type'];
        var cardNumber = req.body['card-number'];
        var cardExpiryMonth = req.body['card-expiry-month'];
        var cardExpiryYear = req.body['card-expiry-year'];
        var cardCVC = req.body['card-cvc'];       
        var billingFirstName = req.body['billing-first-name'];//将通过post方法传过来的表单中first-name字段的值赋给变量$firstName
        var billingLastName = req.body['billing-last-name'];  //和上面同理
        var billingAddress = req.body['billing-address'];  //和上面同理  
        var billingAddressLineTwo = req.body['billing-address-line-two'];
        var billingCity = req.body['billing-city'];  //和上面同理
        var billingState = req.body['billing-state'];  //和上面同理
        var billingZip = req.body['billing-zip'];  //和上面同理        
        var billingTel = req.body['billing-tel'];
        var email = req.body['email'];

        if (!req.session.order){//否定，如果没有的话
            return res.redirect('/shopping-cart');  //如果没有东西的话要去的页面  
        }else{

            var stripe = require("stripe")(
                "sk_test_0eUQO1CcIS5QNxdTJl4vlIdt"
            );

            stripe.charges.create({
                amount: cart.totalPrice * 100,
                currency: "usd",
                source: req.body.stripeToken, // obtained with Stripe.js
                description: "Test Charge"
            }, function(err, charge) { 
                if (err) {
                    req.flash('errorMessages', err.message);
                    return res.redirect('/checkout');
                }
                
                var order = req.session.order;//获取order对象

                //将订单的信息保存到 order 对象
                // $order->products_in_order = $cart->items;//用于在finish页面显示
                order.payment_type = paymentType;
                order.card_number = cardNumber;
                order.card_expiry_month = cardExpiryMonth;
                order.card_expiry_year = cardExpiryYear;
                order.card_cvc = cardCVC;
                order.billing_first_name = billingFirstName;//将得到的firstName字段的值赋给$order对象的firstName属性
                order.billing_last_name = billingLastName;//和上面同理
                order.billing_address = billingAddress;//和上面同理
                order.billing_address_line_two = billingAddressLineTwo;//和上面同理
                order.billing_city = billingCity;//和上面同理
                order.billing_state = billingState;//和上面同理
                order.billing_zip = billingZip;//和上面同理
                order.billing_tel = billingTel;
                order.email = email;
                order.merchandise_total = cart.totalPrice;
                order.order_total = order.merchandise_total + 10;
                order.order_status = 'Processing';
                order.user_id = req.user;
                var today = new Date();
                //return console.log(Object.prototype.toString.call(today));  //[object Date]
                //var serialized = JSON.stringify(new Date());
                //order.created_at = serialized;
                order.created_at = today;

                //将 更新以后的 order 对象 重新保存到 session
                req.session.order = order;

                
                var order = new Order({//create a new order //创建一个订单//类似于创建一张表
                    user: req.user,//fetching the user from the request. //为啥req里面有user？答：passport does this for us. since i am using passport in this application, whenever i sign in with passport, passport will place this "user" object here on the "req". therefore, throughout my whole application, i can always use this "user" object
                    cart: cart,
                    //address: req.body.address,//retrive address field
                    //name: req.body.name,//retrive name field //"req.body" is where express store the values sent with post request 
                    paymentId: charge.id, //fininally i want to store the payment id, i can retrive the paymentId from my charge object which gets passed here to the callback above
                
                    order_sn: req.session.order.order_sn,
                    created_at: req.session.order.created_at,
                    order_status: req.session.order.order_status,
                    //shipping_status: req.session.order.shipping_status,
                    //pay_status: req.session.order.pay_status,
                    //confirm_time: req.session.order.confirm_time,
                    //pay_time: req.session.order.pay_time,
                    shipping_first_name: req.session.order.shipping_first_name,
                    shipping_last_name: req.session.order.shipping_last_name,
                    shipping_address: req.session.order.shipping_address,
                    shipping_address_line_two: req.session.order.shipping_address_line_two,
                    shipping_city: req.session.order.shipping_city,
                    shipping_state: req.session.order.shipping_state,
                    shipping_zip: req.session.order.shipping_zip,
                    shipping_tel: req.session.order.shipping_tel,
                    billing_first_name: req.session.order.billing_first_name,
                    billing_last_name: req.session.order.billing_last_name,
                    billing_address: req.session.order.billing_address,
                    billing_address_line_two: req.session.order.billing_address_line_two,
                    billing_city: req.session.order.billing_city,
                    billing_address_line_two: req.session.order.billing_address_line_two,
                    billing_state: req.session.order.billing_state,
                    billing_zip: req.session.order.billing_zip,
                    billing_tel: req.session.order.billing_tel,
                    email: req.session.order.email,
                    credit_card_name: req.session.order.credit_card_name,
                    payment_type: req.session.order.payment_type,
                    card_number: req.session.order.card_number,
                    card_expiry_month: req.session.order.card_expiry_month,
                    card_expiry_year: req.session.order.card_expiry_year,
                    card_cvc: req.session.order.card_cvc,
                    merchandise_total: req.session.order.merchandise_total,
                    //shipping_fee: req.session.order.shipping_fee,
                    order_total: req.session.order.order_total
                });
                console.log(order);
                order.save(function(err, result) {//save the order to the database//传入一个回调函数，如果保存失败就传入err，如果保存成功就传入result
                    if (err) {
                        // return res.write('Error!');
                        console.log(err);
                    }
                    req.flash('successMessages', 'Successfully bought product!');
                    // var productsInOrder = cart.items;
                    // req.session.cart = null;
                    //return res.render('shop/checkout-finish', {scripts: scripts, css: css, orderSummary: req.session.order, productsInCart: productsInOrder, errorMessages: errorMessages, hasErrors: errorMessages.length > 0});
                    return res.redirect('/checkout-finish');
                });
            });
        }
    }
});

router.get('/checkout-finish', function(req, res, next) {
    var scripts = ['/js/shop.checkout-finish.js', '/js/folding.js'];
    var css = ['/css/shop.checkout-finish.css'];
    
    
    var productsInOrder = req.session.cart.items;
    req.session.cart = null;
    return res.render('shop/checkout-finish', {scripts: scripts, css: css, orderSummary: req.session.order, productsInOrder: productsInOrder});
});

//////////////////////////////////////////////////////////////////////////

router.get('/checkout-step-one', function(req, res, next) {
    var scripts = ['https://js.stripe.com/v2/', '/js/shop.checkout-step-one.js', '/js/folding.js'];
    var css = ['/css/shop.checkout-step-one.css'];
    //查看Session数组里面是否有下标叫cart的这个元素
    //也就是，查看Session里面是否有购物车对象
    if (!req.session.cart){//否定，如果没有的话
        return res.redirect('/shopping-cart');  //如果没有东西的话要去的页面  //显示模板
    }

    var oldCart = req.session.cart;

    var cart = new Cart(oldCart);

    var total = cart.totalPrice;  //得到总价
    
    var errorMessages = req.flash('errorMessages');//获取错误messages //在post方法里面写入，在get方法里面读取

    //also pass the total price to the view 模板 
    //(在模板里面使用$total，对应的是键名total，$是模板自动添加的)
    res.render('shop/checkout-step-one', {scripts: scripts, css: css, total: total, productsInCart: cart.items, errorMessages: errorMessages, hasErrors: errorMessages.length > 0});
});

router.post('/checkout-step-one', function(req, res, next) {
    //查看Session数组里面是否有下标叫cart的这个元素
    //也就是，查看Session里面是否有购物车对象
    //console.log("session.cart");
    if (!req.session.cart){//否定，如果没有的话
        return res.redirect('/shopping-cart');  //如果没有东西的话要去的页面  //显示模板
    }

    /////////////////////
    
    //后端验证
    req.assert('shipping-first-name', 'Invalid First Name').notEmpty().len(2, 20);
    req.assert('shipping-last-name', 'Invalid Last Name').notEmpty().len(2, 20);
    req.assert('shipping-address', 'Invalid Shipping Address').notEmpty();
    req.assert('shipping-city', 'Invalid Shipping City').notEmpty().len(2, 10);
    req.assert('shipping-state', 'Invalid Shipping State').notEmpty().len(2, 2);
    req.assert('shipping-zip', 'Invalid Shipping Zip').notEmpty().len(5, 15);
    // req.checkBody('email', 'Invalid email').notEmpty().isEmail().isUnique();
    // req.checkBody('password', 'Invalid possword').notEmpty().len(8, 30);
    // req.checkBody('first_name', 'Invalid first_name').notEmpty().isAlpha();
    // req.checkBody('last_name', 'Invalid last_name').notEmpty().isAlpha();
    // req.checkBody('dateofbirth', 'Invalid dateofbirth').notEmpty.isDate();
    
    var errors = req.validationErrors();
    if (errors) {
         //req.session.errors = errors; //使用session来显示错误提示信息

        // req.flash('errors','未登录');  //测试
        // req.flash('errors','未登录2'); //测试
        //req.flash('errors', errors); //测试
        // for(var i = 0; i < errors.length; i++) { //测试
        //     req.flash('errors', errors[i].msg);
        // }
        
        //使用connect flash 的方式来显示错误，成功的方法
        var messages = [];//声明一个空数组，用于保存所有的验证是产生的错误 //an aray of message which i want to pass back to the view
        errors.forEach(function(error) {//遍历所有的错误
           messages.push(error.msg);//将每个单独的错误(error对象的msg属性) 放到数组里面//we are not push the complete error object, but the msg field
        });
        req.flash('errorMessages', messages); //在这里写入 //在post方法里面写入，在get方法里面读取

        return res.redirect('/checkout-step-one'); //通过session来传递 errors
                  
        // res.send(errors);            
        //return;
    } else {
        // normal processing here
        var orderSN = js_yyyy_mm_dd_hh_mm_ss_rand();

         
        // $yCode = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T');
        // 2016是A
        // $orderSN = $yCode[intval(date('Y')) - 2016] . strtoupper(dechex(date('m'))) . date('d') . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
        
        

        var shippingFirstName = req.body['shipping-first-name']; //将通过post方法传过来的表单中first-name字段的值赋给变量firstName
        var shippingLastName = req.body['shipping-last-name']; //和上面同理
        var shippingAddress = req.body['shipping-address']; //和上面同理
        var shippingAddressLineTwo = req.body['shipping-address-line-two']; //和上面同理
        var shippingCity = req.body['shipping-city']; //和上面同理
        var shippingState = req.body['shipping-state']; //和上面同理
        var shippingZip = req.body['shipping-zip']; //和上面同理

        

        var order = {};//创建Order model的实例  （头部记的加：use App\Order;）
        order.order_sn = orderSN;
        order.shipping_first_name = shippingFirstName;//将得到的firstName字段的值赋给$order对象的firstName属性
        order.shipping_last_name = shippingLastName;//和上面同理
        order.shipping_address = shippingAddress;//和上面同理
        order.shipping_address_line_two = shippingAddressLineTwo;//和上面同理
        order.shipping_city = shippingCity;//和上面同理
        order.shipping_state = shippingState;//和上面同理
        order.shipping_zip = shippingZip;//和上面同理

        //也可以用Session facade 如：  Session::
        req.session.order = order;  //将购物车对象保存在session里面，下标是 'cart'

        //dd($request->session()->get('order'));

         return res.redirect('/checkout');//添加好以后要去的地方



        // $user->save();//保存到数据库里面
    }
});

////////////////////////////////////////////////////////////////////////////

module.exports = router;

function isLoggedIn(req, res, next) {//用于在用户结账前强制用户先登录
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url; //保留登录前的url，用于登录以后跳转回去
    res.redirect('/user/signin');
}


// function js_yyyy_mm_dd_hh_mm_ss () {
//     now = new Date();
//     year = "" + now.getFullYear();
//     month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
//     day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
//     hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
//     minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
//     second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
//     return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
// }
function js_yyyy_mm_dd_hh_mm_ss_rand () {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    // var min = 100;
    // var max = 999;
    // var num = Math.floor(Math.random() * (max - min + 1)) + min;
    // Or simplified:

    var rand = Math.floor(Math.random() * 999) + 100;
    //return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return year + month + day + hour + minute + second + rand;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function validateEmail(elementValue){      //用于验证邮箱
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return emailPattern.test(elementValue); 
} 