import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

import '../providers/products.dart';
import '../providers/auth.dart';

class ProductDetailScreen extends StatelessWidget {
  static const routeName = '/product-detail-screen';
  const ProductDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final productId = ModalRoute.of(context)!.settings.arguments as String;
    final loadedProduct = Provider.of<Products>(context, listen: false).findById(productId);
    final mediaQuery = MediaQuery.of(context);

    Future<void> handleAddToCart(String productId) async {
      try {
        await Provider.of<Auth>(context, listen: false).addToCart(productId);
      } catch (err) {
        print(err);
      }
    }

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: mediaQuery.size.height * 0.4,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              // titlePadding: EdgeInsetsDirectional.only(bottom: 5),
              // title: Text(loadedProduct.name),
              background: Hero(
                tag: productId,
                child: Container(
                  padding: EdgeInsets.fromLTRB(25, mediaQuery.viewPadding.top, 25, 0),
                  child: Image.network(
                    Platform.isAndroid
                        ? '${dotenv.env['ANDROID_API_URL']}assets/${loadedProduct.picturePath}'
                        : '${dotenv.env['API_URL']}assets/${loadedProduct.picturePath}',
                    fit: BoxFit.contain,
                  ),
                ),
              ),
            ),
          ),
          SliverList(
              delegate: SliverChildListDelegate([
            const SizedBox(
              height: 10,
              width: null,
            ),
            Text(
              loadedProduct.name,
              style: Theme.of(context).textTheme.headlineLarge,
              textAlign: TextAlign.center,
            ),
            Text(
              loadedProduct.description,
              textAlign: TextAlign.center,
              softWrap: true,
              style: Theme.of(context).textTheme.labelLarge,
            ),
            Text(
              '\$${(loadedProduct.cost).toStringAsFixed(2)}',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.headlineSmall,
            )
          ]))
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => handleAddToCart(productId),
        icon: Icon(Icons.add_shopping_cart),
        label: const Text('Add to Cart'),
      ),
    );
  }
}
