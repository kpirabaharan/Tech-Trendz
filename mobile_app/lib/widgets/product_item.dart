import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import '../models/product.dart';
import '../screens/product_detail_screen.dart';

class ProductItem extends StatelessWidget {
  final Product product;

  const ProductItem({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context).size;
    return Container(
      child: Card(
        elevation: 16,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    product.brand,
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                  Text(
                    '\$${product.cost}',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
              Text(product.name),
              const Spacer(),
              Center(
                child: GestureDetector(
                  onTap: () {
                    Navigator.of(context).pushNamed(
                      ProductDetailScreen.routeName,
                      arguments: product.id,
                    );
                  },
                  child: Hero(
                    tag: product.id,
                    child: Container(
                      height: 120,
                      child: Platform.isAndroid
                          ? Image.network(
                              '${dotenv.env['ANDROID_API_URL']}assets/${product.picturePath}',
                              errorBuilder: (context, error, stackTrace) =>
                                  const Center(child: Text('Could not load Image')),
                              fit: BoxFit.contain,
                            )
                          : Image.network(
                              '${dotenv.env['API_URL']}assets/${product.picturePath}',
                              errorBuilder: (context, error, stackTrace) =>
                                  const Center(child: Text('Could not load Image')),
                              fit: BoxFit.contain,
                            ),
                    ),
                  ),
                ),
              ),
              const Spacer(),
            ],
          ),
        ),
      ),
    );
  }
}
