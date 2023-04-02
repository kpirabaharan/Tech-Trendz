import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth.dart';
import '../widgets/cart_item.dart';

class CartScreen extends StatefulWidget {
  static const routeName = '/cart-screen';
  const CartScreen({super.key});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  late Future _cartFuture;

  Future _obtainCartFuture() async {
    try {
      await Provider.of<Auth>(context, listen: false).fetchCart();
    } catch (err) {
      print(err);
    }
  }

  @override
  void initState() {
    _cartFuture = _obtainCartFuture();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: _cartFuture,
        builder: (context, snapshot) => Scaffold(
              appBar: AppBar(
                title: const Text('Your Cart'),
                flexibleSpace: Container(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                        colors: [
                          Color(0xFF3366FF),
                          Color(0xFF00CCFF),
                        ],
                        begin: FractionalOffset(0.0, 0.0),
                        end: FractionalOffset(1.0, 0.0),
                        stops: [0.0, 1.0],
                        tileMode: TileMode.clamp),
                  ),
                ),
              ),
              body: Container(
                padding: const EdgeInsets.all(8),
                child: Consumer<Auth>(
                  builder: (context, user, child) => CustomScrollView(
                    slivers: [
                      SliverFillRemaining(
                        hasScrollBody: false,
                        child: Column(
                          children: [
                            ...(user.cartItems.map((ci) => CartItem(item: ci)).toList()),
                            Align(
                              alignment: Alignment.centerRight,
                              child: Padding(
                                padding: const EdgeInsets.only(right: 15),
                                child: Text(
                                  'Total Amount: \$${user.totalAmount}',
                                  style: Theme.of(context).textTheme.titleMedium,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ));
  }
}

// Consumer<Auth>(
//                 builder: (context, user, child) => CartList(
//                     items: user.cart,
//                     totalQuantity: user.totalQuantity,
//                     totalAmount: user.totalAmount),