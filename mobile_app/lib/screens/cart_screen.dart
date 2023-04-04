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
    return Provider.of<Auth>(context, listen: false).fetchCart();
  }

  @override
  void initState() {
    _cartFuture = _obtainCartFuture();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    print('Cart Screen');
    return Scaffold(
      appBar: AppBar(title: Text('Cart')),
      body: FutureBuilder(
        future: _cartFuture,
        builder: (context, snapshot) => snapshot.connectionState == ConnectionState.waiting
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : RefreshIndicator(
                onRefresh: () => _obtainCartFuture(),
                child: Container(
                  padding: const EdgeInsets.all(8),
                  child: Consumer<Auth>(
                    builder: (context, user, child) => user.isCartEmpty
                        ? Center(
                            child: Text(
                              'Your Cart is Empty',
                              style: Theme.of(context).textTheme.headlineLarge,
                            ),
                          )
                        : CustomScrollView(
                            slivers: [
                              SliverFillRemaining(
                                hasScrollBody: false,
                                child: Column(
                                  children: [
                                    ...(user.cartItems.map((ci) {
                                      return Column(
                                        children: [
                                          CartItem(item: ci),
                                          const Divider(),
                                        ],
                                      );
                                    }).toList()),
                                    Padding(
                                      padding: const EdgeInsets.only(top: 8.0),
                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            'Total Items: ${(user.totalQuantity)}',
                                            style: Theme.of(context).textTheme.titleMedium,
                                          ),
                                          Text(
                                            'Total Amount: \$${(user.totalAmount).toStringAsFixed(2)}',
                                            style: Theme.of(context).textTheme.titleMedium,
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                  ),
                ),
              ),
      ),
    );
  }
}
