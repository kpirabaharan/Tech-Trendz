import 'package:flutter/material.dart';

import '../widgets/Carousel/product_carousel.dart';

class ProductPage extends StatelessWidget {
  const ProductPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Products'),
        actions: [
          IconButton(
            onPressed: () => {},
            icon: Icon(Icons.person),
          ),
          IconButton(
            onPressed: () => {},
            icon: Icon(Icons.shopping_cart),
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 12, 0, 0),
            child: Text(
              'New Products',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ),
          ProductCarousel(),
        ],
      ),
    );
  }
}
