import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/products.dart';
import 'Carousel/carousel_item.dart';

class ProductsGrid extends StatelessWidget {
  const ProductsGrid({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: Provider.of<Products>(context, listen: false).fetchProducts('all'),
        builder: (context, snapshot) => snapshot.connectionState == ConnectionState.waiting
            ? const Center(child: CircularProgressIndicator())
            : Consumer<Products>(
                builder: (ctx, products, ch) => products.products.isEmpty
                    ? ch as Widget
                    : Card(
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        child: GridView.builder(
                          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            childAspectRatio: 1 / 1,
                            crossAxisSpacing: 10,
                            mainAxisSpacing: 10,
                          ),
                          itemBuilder: (context, index) =>
                              CarouselItem(product: products.products[index]),
                          itemCount: products.products.length,
                        ),
                      ),
                child: const Center(
                  child: Text('Cannot Retrieve Products!'),
                ),
              ));
  }
}
