import 'package:flutter/material.dart';

import '../widgets/Carousel/product_carousel.dart';
import '../widgets/products_grid.dart';
import '../widgets/mode_query.dart';

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
              'Featured Products',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ),
          Expanded(
            flex: 1,
            child: Stack(
              children: [
                ProductCarousel(),
                Container(
                  color: Theme.of(context).canvasColor,
                  width: 50,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
                    child: Expanded(child: ModeQuery()),
                  ),
                ),
              ],
            ),
          ),
          Expanded(flex: 2, child: ProductsGrid()),
        ],
      ),
    );
  }
}
