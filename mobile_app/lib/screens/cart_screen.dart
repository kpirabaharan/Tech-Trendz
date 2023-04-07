import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:provider/provider.dart';

import '../providers/auth.dart';
import '../providers/orders.dart';
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

  void _startCheckout(BuildContext ctx) {
    showModalBottomSheet(
      backgroundColor: Colors.white,
      context: ctx,
      isScrollControlled: true,
      builder: (bCtx) {
        return Padding(
          padding: EdgeInsets.only(bottom: MediaQuery.of(bCtx).viewInsets.bottom),
          child: Container(
            padding: const EdgeInsets.all(15),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text(
                  'Checkout',
                  style: TextStyle(fontSize: 20, color: Colors.black),
                ),
                const SizedBox(height: 10),
                CardFormField(),
                ElevatedButton(
                  onPressed: () => Navigator.of(bCtx).pop(),
                  child: Text("Pay"),
                ),
                const SizedBox(height: 50),
              ],
            ),
          ),
        );
      },
    );
  }

  Future<void> _launchURL() async {
    String userId = Provider.of<Auth>(context, listen: false).userId as String;
    final url = await Provider.of<Orders>(context, listen: false).postOrder(userId);
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    } else {
      throw 'Could not launch $url';
    }
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
                                      padding: const EdgeInsets.fromLTRB(6, 8, 6, 50),
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
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _launchURL,
        label: Text('Checkout'),
        icon: Icon(Icons.shopping_cart_checkout),
      ),
    );
  }
}
