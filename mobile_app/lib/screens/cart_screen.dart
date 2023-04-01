import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth.dart';

class CartScreen extends StatelessWidget {
  static const routeName = '/cart-screen';
  const CartScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: Provider.of<Auth>(context).fetchCart(),
      builder: (context, snapshot) => Scaffold(
        appBar: AppBar(
          title: const Text('Your Cart'),
        ),
      ),
    );
  }
}
