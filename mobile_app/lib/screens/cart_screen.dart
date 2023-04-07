import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth.dart';
import '../providers/orders.dart';
import './web_screen.dart';
import '../widgets/cart_item.dart';

class CartScreen extends StatefulWidget {
  static const routeName = '/cart-screen';
  final Function completeOrder;

  CartScreen({required this.completeOrder, super.key});

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

  Future<void> _launchWebView() async {
    String userId = Provider.of<Auth>(context, listen: false).userId as String;
    final url = await Provider.of<Orders>(context, listen: false).postOrder(userId);
    final String result = await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => MyWebView(url: url),
      ),
    ) as String;
    if (result == 'Success') {
      await Provider.of<Orders>(context, listen: false).successfulOrder(userId);
      widget.completeOrder();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<Auth>(builder: (context, user, child) {
      return Scaffold(
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
                    child: user.isCartEmpty
                        ? CustomScrollView(
                            slivers: [
                              SliverFillRemaining(
                                hasScrollBody: false,
                                child: Center(
                                  child: Text(
                                    'Your Cart is Empty',
                                    style: Theme.of(context).textTheme.headlineLarge,
                                  ),
                                ),
                              ),
                            ],
                          )
                        : CustomScrollView(
                            slivers: [
                              SliverFillRemaining(
                                hasScrollBody: false,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.stretch,
                                  children: [
                                    ...(user.cartItems.map((ci) {
                                      return Column(
                                        children: [
                                          CartItem(
                                            item: ci,
                                            key: ValueKey(ci.id),
                                          ),
                                          const Divider(
                                            thickness: 1,
                                          ),
                                        ],
                                      );
                                    }).toList()),
                                    Padding(
                                      padding: const EdgeInsets.fromLTRB(6, 8, 6, 10),
                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            'Total Items: ${(user.totalQuantity)}',
                                            style: Theme.of(context).textTheme.titleLarge,
                                          ),
                                          Text(
                                            'Total Amount: \$${(user.totalAmount).toStringAsFixed(2)}',
                                            style: Theme.of(context).textTheme.titleLarge,
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
        floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
        floatingActionButton: user.isCartEmpty
            ? null
            : FloatingActionButton.extended(
                onPressed: _launchWebView,
                label: const Text('Checkout'),
                icon: const Icon(Icons.shopping_cart_checkout),
              ),
      );
    });
  }
}
