import 'package:flutter/material.dart';

import '../widgets/product_carousel.dart';

class ProductPage extends StatelessWidget {
  const ProductPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
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
      body: ProductCarousel(),
    );
  }
}
