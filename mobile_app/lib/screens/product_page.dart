import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/products.dart';
import '../widgets/Carousel/product_carousel.dart';
import '../widgets/products_grid.dart';
import '../widgets/mode_query.dart';

class ProductPage extends StatelessWidget {
  const ProductPage({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: Provider.of<Products>(context).fetchProducts('all'),
      builder: (context, snapshot) => Scaffold(
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
            Expanded(
              flex: 2,
              child: Stack(
                children: [
                  ProductCarousel(),
                  Container(
                    color: Theme.of(context).canvasColor,
                    width: 75,
                  ),
                ],
              ),
            ),
            ModeQuery(),
            Expanded(flex: 5, child: ProductsGrid()),
          ],
        ),
      ),
    );
  }
}
