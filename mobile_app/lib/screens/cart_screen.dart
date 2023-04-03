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
                  child: Consumer<Auth>(
                    builder: (context, user, child) => CustomScrollView(
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
                              Align(
                                alignment: Alignment.centerRight,
                                child: Padding(
                                  padding: const EdgeInsets.only(top: 20, right: 15),
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
              ),
      ),
    );
  }
}
