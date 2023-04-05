import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

import '../models/product.dart';
import '../arguments/product_arguments.dart';
import '../providers/auth.dart';

class ProductDetailScreen extends StatelessWidget {
  static const routeName = '/product-detail-screen';
  ProductDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final productArgs = ModalRoute.of(context)!.settings.arguments as ProductArguments;
    final product = productArgs.product;
    final isCarousel = productArgs.isCarousel;

    Future<void> handleAddToCart(String productId) async {
      bool isErr = false;
      try {
        await Provider.of<Auth>(context, listen: false).addToCart(productId);
      } catch (err) {
        print(err);
        isErr = true;
      } finally {
        ScaffoldMessenger.of(context).hideCurrentSnackBar();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            duration: Duration(seconds: 2),
            content: Text(
              !isErr ? 'Added to Cart' : 'An Error Occurred!',
              textAlign: TextAlign.start,
            ),
            action: SnackBarAction(
              label: 'UNDO',
              onPressed: () {
                Provider.of<Auth>(context, listen: false).removeFromCart(productId);
              },
            ),
          ),
        );
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
              background: isCarousel
                  ? Container(
                      padding: EdgeInsets.fromLTRB(25, mediaQuery.viewPadding.top, 25, 0),
                      child: Image.network(
                        Platform.isAndroid
                            ? '${dotenv.env['ANDROID_API_URL']}assets/${product.picturePath}'
                            : '${dotenv.env['API_URL']}assets/${product.picturePath}',
                        fit: BoxFit.contain,
                      ),
                    )
                  : Hero(
                      tag: product.id,
                      child: Container(
                        padding: EdgeInsets.fromLTRB(25, mediaQuery.viewPadding.top, 25, 0),
                        child: Image.network(
                          Platform.isAndroid
                              ? '${dotenv.env['ANDROID_API_URL']}assets/${product.picturePath}'
                              : '${dotenv.env['API_URL']}assets/${product.picturePath}',
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
              product.name,
              style: Theme.of(context).textTheme.headlineLarge,
              textAlign: TextAlign.center,
            ),
            Text(
              product.description,
              textAlign: TextAlign.center,
              softWrap: true,
              style: Theme.of(context).textTheme.labelLarge,
            ),
            Text(
              '\$${(product.cost).toStringAsFixed(2)}',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.headlineSmall,
            )
          ]))
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => handleAddToCart(product.id),
        icon: Icon(Icons.add_shopping_cart),
        label: const Text('Add to Cart'),
      ),
    );
  }
}
